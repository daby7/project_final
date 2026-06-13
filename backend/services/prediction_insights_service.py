import json
from pathlib import Path

import pandas as pd


CLEAN_DATA_PATH = Path("data/processed/clean_data.csv")
MODEL_METRICS_PATH = Path("artifacts/model_metrics.json")


def get_prediction_insights() -> dict | None:
    """
    Read clean_data.csv and model_metrics.json to return dynamic chart data
    and insight cards for the Prediction page.
    Returns None if clean_data.csv does not exist yet.
    """
    if not CLEAN_DATA_PATH.exists():
        return None

    df = pd.read_csv(CLEAN_DATA_PATH)

    # Sales by region — for donut chart + progress bars
    sales_by_region: list[dict] = []
    if "region" in df.columns and "sales" in df.columns:
        region_s = df.groupby("region")["sales"].sum().sort_values(ascending=False)
        total = float(region_s.sum()) or 1.0
        sales_by_region = [
            {
                "region": str(r),
                "sales": round(float(v), 2),
                "pct": round(float(v) / total * 100, 1),
            }
            for r, v in region_s.items()
        ]

    # Price sensitivity — avg sales per price bucket (10 buckets)
    price_sensitivity: list[dict] = []
    if "price" in df.columns and "sales" in df.columns and len(df) > 1:
        mn, mx = float(df["price"].min()), float(df["price"].max())
        if mx > mn:
            n_bins = min(10, max(3, len(df) // 10))
            step = (mx - mn) / n_bins
            for i in range(n_bins):
                lo = mn + i * step
                hi = lo + step
                mask = (df["price"] >= lo) & (df["price"] < hi if i < n_bins - 1 else df["price"] <= hi)
                avg = df.loc[mask, "sales"].mean() if mask.sum() > 0 else 0.0
                price_sensitivity.append({
                    "label": f"{int(lo)}-{int(hi)}",
                    "avg_sales": round(float(avg) if pd.notna(avg) else 0.0, 2),
                })

    # Model metrics
    model_metrics: dict = {}
    if MODEL_METRICS_PATH.exists():
        with open(MODEL_METRICS_PATH, "r", encoding="utf-8") as fh:
            model_metrics = json.load(fh)

    # Price range for slider hints
    price_range: dict = {}
    if "price" in df.columns:
        price_range = {
            "min": round(float(df["price"].min()), 2),
            "max": round(float(df["price"].max()), 2),
            "avg": round(float(df["price"].mean()), 2),
        }

    return {
        "sales_by_region": sales_by_region,
        "price_sensitivity": price_sensitivity,
        "model_metrics": model_metrics,
        "insight_cards": _build_insight_cards(df),
        "price_range": price_range,
    }


def _build_insight_cards(df: pd.DataFrame) -> list[dict]:
    cards: list[dict] = []

    # Card 1 — top category by sales
    try:
        if "category" in df.columns and "sales" in df.columns:
            top_cat = str(df.groupby("category")["sales"].sum().idxmax())
            top_avg = round(float(df[df["category"] == top_cat]["sales"].mean()), 2)
            cards.append({"type": "price_impact", "top_category": top_cat, "avg_sales": top_avg})
        else:
            cards.append(None)
    except Exception:
        cards.append(None)

    # Card 2 — top segment + their most common payment method
    try:
        if "customer_segment" in df.columns and "payment_method" in df.columns:
            top_seg = str(df["customer_segment"].value_counts().idxmax())
            top_pay = str(df["payment_method"].value_counts().idxmax())
            seg_rows = df[df["customer_segment"] == top_seg]
            pct = round(
                len(seg_rows[seg_rows["payment_method"] == top_pay]) / max(len(seg_rows), 1) * 100,
                1,
            )
            cards.append({"type": "customer_behavior", "top_segment": top_seg, "top_payment": top_pay, "pct": pct})
        else:
            cards.append(None)
    except Exception:
        cards.append(None)

    # Card 3 — top region + its share %
    try:
        if "region" in df.columns and "sales" in df.columns:
            rs = df.groupby("region")["sales"].sum()
            top_region = str(rs.idxmax())
            pct = round(float(rs[top_region]) / float(rs.sum()) * 100, 1)
            cards.append({"type": "demand_forecast", "top_region": top_region, "pct": pct})
        else:
            cards.append(None)
    except Exception:
        cards.append(None)

    return cards
