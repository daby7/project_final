import io
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Force UTF-8 output on Windows so emoji/Unicode in CrewAI logs don't crash
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace", line_buffering=True)
if sys.stderr.encoding and sys.stderr.encoding.lower() not in ("utf-8", "utf8"):
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace", line_buffering=True)

# Load .env and disable CrewAI tracing before any crewai imports
load_dotenv()
os.environ.setdefault("CREWAI_DISABLE_TELEMETRY", "true")
os.environ.setdefault("OTEL_SDK_DISABLED", "true")
os.environ.setdefault("CREWAI_TRACING_ENABLED", "false")

from flask import Flask
from backend.routes import register_routes

_FRONTEND = Path(__file__).parent.parent / "frontend"


def create_app() -> Flask:
    app = Flask(
        __name__,
        template_folder=str(_FRONTEND / "templates"),
        static_folder=str(_FRONTEND / "static"),
        static_url_path="/static",
    )

    @app.after_request
    def add_cors_headers(response):
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
        response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
        return response

    register_routes(app)
    return app


if __name__ == "__main__":
    import socket
    from wsgiref.simple_server import WSGIServer, WSGIRequestHandler
    from socketserver import ThreadingMixIn

    # Multi-threaded server: handles browser's simultaneous connections
    # (main request + favicon.ico, etc.) without blocking.
    # allow_reuse_address lets the server restart immediately after Ctrl+C.
    class _Server(ThreadingMixIn, WSGIServer):
        daemon_threads = True
        allow_reuse_address = True

    HOST, PORT = "0.0.0.0", int(os.environ.get("PORT", 8000))
    app = create_app()

    # Detect port conflict before binding and print a clear fix command.
    probe = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    probe.settimeout(1)
    in_use = probe.connect_ex(("127.0.0.1", PORT)) == 0
    probe.close()

    if in_use:
        print(f"\nERROR: Port {PORT} is already in use.", flush=True)
        print("Run this in PowerShell to clear it, then try again:", flush=True)
        print("  taskkill /F /IM python.exe", flush=True)
        sys.exit(1)

    try:
        with _Server((HOST, PORT), WSGIRequestHandler) as httpd:
            httpd.set_app(app)
            print(f" * Backend running on http://127.0.0.1:{PORT}", flush=True)
            print(f" * Press CTRL+C to stop", flush=True)
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.", flush=True)
