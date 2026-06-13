def run_workflow() -> dict:
    """
    Run the full CrewAI workflow and return a structured result.
    Raises on failure so the caller can return a 500 error.

    Import is intentionally lazy so crewai is not loaded at Flask startup —
    only when the /api/run-analysis endpoint is actually called.
    """
    from crewai_workflow.flow import run_full_workflow  # noqa: PLC0415

    result = run_full_workflow()

    if isinstance(result, dict):
        return result

    return {"status": "success", "result": str(result)}
