from pathlib import Path

from crewai.flow.flow import Flow, start, listen

from crewai_workflow.crews.analyst_crew import run_analyst_crew
from crewai_workflow.crews.scientist_crew import run_scientist_crew


class RetailAIProductFlow(Flow):
    """
    Full AI Product Workflow.

    Step 1: Run Data Analyst Crew
    Step 2: Validate handoff artifacts
    Step 3: Run Data Scientist Crew
    """

    @start()
    def run_data_analyst_crew(self):
        """
        Run Crew 1: Data Analyst Crew.
        """

        print("\nStarting Crew 1: Data Analyst Crew...\n")

        result = run_analyst_crew()

        return {
            "step": "analyst_crew_completed",
            "result": result,
        }

    @listen(run_data_analyst_crew)
    def validate_handoff_artifacts(self, analyst_result):
        """
        Validate that the Data Analyst Crew created the required files
        before the Data Scientist Crew starts.
        """

        print("\nValidating handoff from Analyst Crew to Scientist Crew...\n")

        required_files = [
            Path("data/processed/clean_data.csv"),
            Path("artifacts/dataset_contract.json"),
            Path("artifacts/eda_report.html"),
            Path("artifacts/insights.md"),
            Path("artifacts/value_translations.json"),
        ]

        missing_files = []

        for file_path in required_files:
            if not file_path.exists():
                missing_files.append(str(file_path))

        if missing_files:
            raise FileNotFoundError(
                "Handoff validation failed. Missing files: "
                + ", ".join(missing_files)
            )

        print("Handoff validation passed. Analyst artifacts are ready.\n")

        return {
            "step": "handoff_validated",
            "analyst_result": analyst_result,
            "validated_files": [str(file_path) for file_path in required_files],
        }

    @listen(validate_handoff_artifacts)
    def run_data_scientist_crew(self, handoff_result):
        """
        Run Crew 2: Data Scientist Crew.
        """

        print("\nStarting Crew 2: Data Scientist Crew...\n")

        result = run_scientist_crew()

        return {
            "step": "scientist_crew_completed",
            "handoff_result": handoff_result,
            "result": result,
        }

    @listen(run_data_scientist_crew)
    def final_validation(self, scientist_result):
        """
        Validate that the Data Scientist Crew created the required files.
        """

        print("\nValidating final Data Scientist artifacts...\n")

        required_files = [
            Path("data/processed/features.csv"),
            Path("artifacts/model.joblib"),
            Path("artifacts/evaluation_report.md"),
            Path("artifacts/model_card.md"),
        ]

        missing_files = []

        for file_path in required_files:
            if not file_path.exists():
                missing_files.append(str(file_path))

        if missing_files:
            raise FileNotFoundError(
                "Final validation failed. Missing files: "
                + ", ".join(missing_files)
            )

        print("Final validation passed. Full AI workflow completed.\n")

        return {
            "status": "success",
            "message": "Full AI Product Workflow completed successfully.",
            "scientist_result": scientist_result,
            "final_artifacts": [str(file_path) for file_path in required_files],
        }


def run_full_workflow():
    """
    Run the full CrewAI Flow.
    """

    flow = RetailAIProductFlow()
    result = flow.kickoff()
    return result
