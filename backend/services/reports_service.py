from pathlib import Path


REPORT_FILES = {
    "insights": Path("artifacts/insights.md"),
    "evaluation_report": Path("artifacts/evaluation_report.md"),
    "model_card": Path("artifacts/model_card.md"),
    "eda_report": Path("artifacts/eda_report.html"),
}


def get_reports() -> dict:
    """
    Check which report files exist and return their content (text files)
    or their relative path (HTML file, served separately).
    """
    reports = {}

    for key, path in REPORT_FILES.items():
        if not path.exists():
            reports[key] = {"available": False, "content": None}
            continue

        if path.suffix == ".html":
            # Return path only; the frontend can fetch or iframe the file directly
            reports[key] = {
                "available": True,
                "path": str(path),
                "content": None,
            }
        else:
            reports[key] = {
                "available": True,
                "path": str(path),
                "content": path.read_text(encoding="utf-8"),
            }

    return reports
