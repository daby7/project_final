import os
from dotenv import load_dotenv

load_dotenv()

os.environ.setdefault("CREWAI_DISABLE_TELEMETRY", "true")
os.environ.setdefault("OTEL_SDK_DISABLED", "true")
os.environ.setdefault("CREWAI_TRACING_ENABLED", "false")

from crewai_workflow.flow import run_full_workflow


def main():
    result = run_full_workflow()
    print(result)


if __name__ == "__main__":
    main()
