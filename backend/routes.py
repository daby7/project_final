import json
import os
import threading
from pathlib import Path

# Serialises concurrent vector-store setup calls so the raw-CSV thread and the
# clean-CSV thread never race each other over state and OpenAI resource cleanup.
_openai_setup_lock = threading.Lock()

from flask import Flask, Response, jsonify, request, render_template, send_file, stream_with_context

from backend import state as _state
from backend.services.workflow_service import run_workflow
from backend.services.dashboard_service import get_dashboard_data
from backend.services.prediction_service import predict_sales
from backend.services.reports_service import get_reports
from backend.services.upload_service import save_uploaded_csv
from backend.services.prediction_options_service import get_prediction_options
from backend.services.prediction_insights_service import get_prediction_insights
from backend.services import data_agent_service

_ARTIFACTS   = Path(__file__).parent.parent / "artifacts"
_SAMPLE_CSV  = Path(__file__).parent.parent / "frontend" / "static" / "sample_data.csv"
_CLEAN_CSV   = Path("data/processed/clean_data.csv")
_RAW_CSV     = Path("data/raw/retail_sales.csv")

if not os.getenv("OPENAI_API_KEY"):
    print("[Agent] WARNING: OPENAI_API_KEY is not set. AI Data Agent will not work.")

_REPORT_FILES = {
    "insights":          (_ARTIFACTS / "insights.md",          False),
    "evaluation_report": (_ARTIFACTS / "evaluation_report.md", False),
    "model_card":        (_ARTIFACTS / "model_card.md",        False),
    "eda_report":        (_ARTIFACTS / "eda_report.html",      True),   # True = open in browser
}


def _setup_openai_async(csv_path: str, dataset_id: str) -> None:
    """Upload csv_path to OpenAI and update state. Runs in a daemon thread.

    The global lock ensures the raw-CSV thread and the clean-CSV thread run
    sequentially, so state reads and OpenAI resource cleanup never race.
    """
    with _openai_setup_lock:
        if dataset_id != _state.get_dataset_id():
            print(f"[Agent] Skipping OpenAI setup — dataset changed before thread ran", flush=True)
            return
        try:
            file_id, vs_id = data_agent_service.refresh_vector_store(csv_path, dataset_id)
            if dataset_id == _state.get_dataset_id():
                _state.set_openai_file_id(file_id)
                _state.set_vector_store_id(vs_id)
                print(f"[Agent] Vector store ready for dataset {dataset_id[:8]}: {vs_id}", flush=True)
            else:
                data_agent_service.delete_openai_resources(file_id, vs_id)
                print(f"[Agent] Discarded stale vector store — dataset changed during upload", flush=True)
        except Exception as e:
            print(f"[Agent] OpenAI setup failed: {e}", flush=True)


def _build_metadata_note() -> str:
    """Build a rich statistics note for the AI so it can answer aggregate questions
    (totals, top products, etc.) correctly regardless of which file chunks
    file_search happens to retrieve."""
    try:
        import pandas as pd
        csv_path = _CLEAN_CSV if _CLEAN_CSV.exists() else _RAW_CSV
        if not csv_path.exists():
            return ""
        df = pd.read_csv(csv_path)
        cols = ", ".join(df.columns.tolist())

        lines = [
            "\n=== DATASET STATISTICS (use these for aggregate questions) ===",
            f"- File: {csv_path.name}",
            f"- Total rows (orders): {len(df)}",
            f"- Columns: {cols}",
        ]

        if "sales" in df.columns:
            lines.append(f"- Total sales: ${df['sales'].sum():,.2f}")
            lines.append(f"- Average order value: ${df['sales'].mean():,.2f}")
            lines.append(f"- Min order sales: ${df['sales'].min():,.2f}")
            lines.append(f"- Max order sales: ${df['sales'].max():,.2f}")

        if "product_name" in df.columns and "sales" in df.columns:
            top5 = df.groupby("product_name")["sales"].sum().sort_values(ascending=False).head(5)
            lines.append("- Top 5 products by total sales:")
            for name, val in top5.items():
                lines.append(f"    * {name}: ${val:,.2f}")

        if "category" in df.columns and "sales" in df.columns:
            cat = df.groupby("category")["sales"].sum().sort_values(ascending=False)
            lines.append("- Sales by category:")
            for name, val in cat.items():
                lines.append(f"    * {name}: ${val:,.2f}")

        if "region" in df.columns and "sales" in df.columns:
            reg = df.groupby("region")["sales"].sum().sort_values(ascending=False)
            lines.append("- Sales by region:")
            for name, val in reg.items():
                lines.append(f"    * {name}: ${val:,.2f}")

        if "customer_segment" in df.columns:
            segs = df["customer_segment"].value_counts()
            lines.append("- Customer segment breakdown:")
            for seg, cnt in segs.items():
                lines.append(f"    * {seg}: {cnt} orders")

        if "payment_method" in df.columns:
            pays = df["payment_method"].value_counts()
            lines.append("- Payment methods:")
            for pm, cnt in pays.items():
                lines.append(f"    * {pm}: {cnt} orders")

        lines.append("=== END DATASET STATISTICS ===\n")
        return "\n".join(lines)
    except Exception:
        return ""


def register_routes(app: Flask) -> None:

    @app.route("/", methods=["GET"])
    def index():
        return render_template("index.html")

    @app.route("/api/health", methods=["GET"])
    def health():
        return jsonify({"status": "ok", "message": "Backend is healthy."})

    @app.route("/api/run-analysis", methods=["POST"])
    def run_analysis():
        try:
            result = run_workflow()
            dataset_id = _state.get_dataset_id()
            # After analysis, replace raw CSV with the cleaned version in the vector store
            if _CLEAN_CSV.exists() and os.getenv("OPENAI_API_KEY"):
                threading.Thread(
                    target=_setup_openai_async,
                    args=(str(_CLEAN_CSV), dataset_id),
                    daemon=True,
                ).start()
            return jsonify({"success": True, "result": result, "dataset_id": dataset_id})
        except Exception as e:
            return jsonify({"success": False, "error": str(e)}), 500

    @app.route("/api/dashboard-data", methods=["GET"])
    def dashboard_data():
        try:
            data = get_dashboard_data()
            return jsonify({"success": True, "data": data, "dataset_id": _state.get_dataset_id()})
        except FileNotFoundError as e:
            return jsonify({"success": False, "error": str(e)}), 404
        except Exception as e:
            return jsonify({"success": False, "error": str(e)}), 500

    @app.route("/api/predict", methods=["POST"])
    def predict():
        body = request.get_json(silent=True) or {}

        required = [
            "category", "region", "customer_segment",
            "payment_method", "price", "quantity", "discount",
        ]
        missing = [field for field in required if field not in body]
        if missing:
            return jsonify({
                "success": False,
                "error": f"Missing required fields: {missing}",
            }), 400

        try:
            predicted = predict_sales(
                category=body["category"],
                region=body["region"],
                customer_segment=body["customer_segment"],
                payment_method=body["payment_method"],
                price=float(body["price"]),
                quantity=float(body["quantity"]),
                discount=float(body["discount"]),
            )
            return jsonify({"success": True, "predicted_sales": predicted})
        except FileNotFoundError as e:
            return jsonify({"success": False, "error": str(e)}), 404
        except Exception as e:
            return jsonify({"success": False, "error": str(e)}), 500

    @app.route("/api/reports", methods=["GET"])
    def reports():
        try:
            data = get_reports()
            return jsonify({"success": True, "reports": data})
        except Exception as e:
            return jsonify({"success": False, "error": str(e)}), 500

    @app.route("/api/reports/<report_id>", methods=["GET"])
    def download_report(report_id: str):
        if report_id not in _REPORT_FILES:
            return jsonify({"success": False, "error": "Unknown report id"}), 404
        path, inline = _REPORT_FILES[report_id]
        if not path.exists():
            return jsonify({"success": False, "error": "Report not yet generated"}), 404
        return send_file(path, as_attachment=not inline)

    @app.route("/api/sample-csv", methods=["GET"])
    def download_sample_csv():
        if not _SAMPLE_CSV.exists():
            return jsonify({"success": False, "error": "Sample file not found. Run generate_and_train.py first."}), 404
        return send_file(_SAMPLE_CSV, as_attachment=True, download_name="sample_data.csv")

    @app.route("/api/prediction-insights", methods=["GET"])
    def prediction_insights():
        try:
            result = get_prediction_insights()
            if result is None:
                return jsonify({
                    "success": False,
                    "message": "Please upload a CSV file and run AI analysis before using prediction.",
                }), 200
            return jsonify({"success": True, "insights": result, "dataset_id": _state.get_dataset_id()})
        except Exception as e:
            return jsonify({"success": False, "error": str(e)}), 500

    @app.route("/api/prediction-options", methods=["GET"])
    def prediction_options():
        try:
            result = get_prediction_options()
            if result is None:
                return jsonify({
                    "success": False,
                    "message": "Please upload a CSV file and run AI analysis before using prediction.",
                }), 200
            return jsonify({"success": True, **result, "dataset_id": _state.get_dataset_id()})
        except Exception as e:
            return jsonify({"success": False, "error": str(e)}), 500

    @app.route("/api/upload-csv", methods=["POST"])
    def upload_csv():
        if "file" not in request.files:
            return jsonify({"success": False, "error": "No file provided. Send a 'file' field."}), 400

        uploaded = request.files["file"]
        if uploaded.filename == "":
            return jsonify({"success": False, "error": "No file selected."}), 400

        try:
            result = save_uploaded_csv(uploaded.stream, uploaded.filename)
            dataset_id = result["dataset_id"]
            # Upload raw CSV to OpenAI in background so chatbot is available immediately
            if os.getenv("OPENAI_API_KEY"):
                threading.Thread(
                    target=_setup_openai_async,
                    args=(str(_RAW_CSV), dataset_id),
                    daemon=True,
                ).start()
            return jsonify({"success": True, **result})
        except ValueError as e:
            return jsonify({"success": False, "error": str(e)}), 422
        except Exception as e:
            return jsonify({"success": False, "error": str(e)}), 500

    @app.route("/api/data-agent-chat", methods=["POST"])
    def data_agent_chat():
        if not os.getenv("OPENAI_API_KEY"):
            lang = (request.get_json(silent=True) or {}).get("language", "en")
            return jsonify({"success": False, "error": data_agent_service.get_no_key_msg(lang)}), 503

        body = request.get_json(silent=True) or {}
        message = str(body.get("message", "")).strip()[:1000]
        dataset_id = str(body.get("dataset_id", "")).strip()
        language = str(body.get("language", "en")).strip()
        conversation_history = body.get("conversation_history", [])

        if not isinstance(conversation_history, list):
            conversation_history = []

        if language not in ("ar", "en", "he"):
            language = "en"

        if not message:
            return jsonify({"success": False, "error": "Empty message."}), 400

        current_id = _state.get_dataset_id()
        if dataset_id != current_id:
            return jsonify({
                "success": False,
                "error": data_agent_service.get_dataset_changed_msg(language),
                "dataset_id": current_id,
            }), 409

        vs_id = _state.get_vector_store_id()
        if not vs_id:
            return jsonify({
                "success": False,
                "error": data_agent_service.get_no_vs_msg(language),
                "dataset_id": current_id,
            }), 503

        if data_agent_service.is_out_of_scope(message):
            return jsonify({
                "success": True,
                "answer": data_agent_service.get_refusal(language),
                "dataset_id": current_id,
            })

        metadata_note = _build_metadata_note()

        def generate():
            try:
                chunks = []
                for delta in data_agent_service.chat_stream(
                    message=message,
                    vs_id=vs_id,
                    conversation_history=conversation_history,
                    language=language,
                    metadata_note=metadata_note,
                ):
                    chunks.append(delta)
                    yield f"data: {json.dumps({'delta': delta})}\n\n"
                full_answer = "".join(chunks)
                yield f"data: {json.dumps({'done': True, 'answer': full_answer, 'dataset_id': current_id})}\n\n"
            except Exception as e:
                print(f"[Agent] OpenAI chat error: {e}")
                yield f"data: {json.dumps({'done': True, 'success': False, 'error': data_agent_service.get_error_msg(language), 'dataset_id': current_id})}\n\n"

        return Response(
            stream_with_context(generate()),
            content_type="text/event-stream",
            headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
        )
