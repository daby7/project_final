from dotenv import load_dotenv
from crewai import Agent, Task, Crew, Process
from crewai.tools import tool

from crewai_workflow.tools.scientist_tools import (
    validate_clean_data_and_contract,
    create_features,
    train_and_evaluate_models,
    create_model_card,
)


load_dotenv()


@tool("Validate Clean Data and Dataset Contract")
def validate_clean_data_contract_tool() -> str:
    """
    Validate that clean_data.csv and dataset_contract.json exist and match.
    """
    return validate_clean_data_and_contract()


@tool("Create Machine Learning Features")
def create_features_tool() -> str:
    """
    Create machine learning features and save features.csv.
    """
    return create_features()


@tool("Train and Evaluate Predictive Models")
def train_evaluate_models_tool() -> str:
    """
    Train and compare predictive models, save the best model, and create evaluation report.
    """
    return train_and_evaluate_models()


@tool("Create Model Card")
def create_model_card_tool() -> str:
    """
    Create model_card.md explaining the selected model, metrics, assumptions, and limitations.
    """
    return create_model_card()


def build_scientist_crew() -> Crew:
    """
    Build Crew 2: Data Scientist Crew.

    This crew has 4 agents:
    1. Data Contract Validation Agent
    2. Feature Engineering Agent
    3. Modeling and Evaluation Agent
    4. Model Documentation Agent

    Important:
    The model card task is separated from the model training task.
    This guarantees that model_card.md is created only after model.joblib
    and model_metrics.json already exist.
    """

    validation_agent = Agent(
        role="Data Contract Validation Agent",
        goal=(
            "Validate that the cleaned dataset and dataset contract from the "
            "Data Analyst Crew are ready for machine learning."
        ),
        backstory=(
            "You are a careful data scientist who checks handoff artifacts "
            "before modeling begins. You make sure the cleaned dataset matches "
            "the dataset contract."
        ),
        tools=[validate_clean_data_contract_tool],
        verbose=True,
    )

    feature_engineering_agent = Agent(
        role="Feature Engineering Agent",
        goal="Create machine learning features from the cleaned retail sales dataset.",
        backstory=(
            "You are a feature engineering specialist who converts business data "
            "into useful numeric features for predictive modeling."
        ),
        tools=[create_features_tool],
        verbose=True,
    )

    modeling_agent = Agent(
        role="Modeling and Evaluation Agent",
        goal=(
            "Train predictive models, compare at least two model variations, "
            "save the best model, and create an evaluation report."
        ),
        backstory=(
            "You are a machine learning engineer responsible for training and "
            "evaluating predictive models for a retail-tech company."
        ),
        tools=[train_evaluate_models_tool],
        verbose=True,
    )

    model_documentation_agent = Agent(
        role="Model Documentation Agent",
        goal=(
            "Create a clear model card after the model has been trained and evaluated."
        ),
        backstory=(
            "You are responsible for documenting machine learning models. "
            "You explain the selected model, metrics, assumptions, limitations, "
            "and saved artifacts in a clear model card."
        ),
        tools=[create_model_card_tool],
        verbose=True,
    )

    validation_task = Task(
        description=(
            "Validate the cleaned dataset and dataset contract produced by the "
            "Data Analyst Crew. You must use the validation tool. "
            "Confirm that clean_data.csv and dataset_contract.json exist and match."
        ),
        expected_output=(
            "A confirmation that the cleaned dataset and dataset contract are valid "
            "and ready for feature engineering."
        ),
        agent=validation_agent,
    )

    feature_engineering_task = Task(
        description=(
            "Create machine learning features from the cleaned retail sales dataset. "
            "You must use the feature engineering tool. "
            "Save the output as data/processed/features.csv."
        ),
        expected_output="A confirmation that features.csv was created successfully.",
        agent=feature_engineering_agent,
    )

    modeling_task = Task(
        description=(
            "Train and evaluate at least two predictive model variations. "
            "You must use only the model training and evaluation tool. "
            "Compare the models, save the best model as artifacts/model.joblib, "
            "save model metrics as artifacts/model_metrics.json, "
            "and create artifacts/evaluation_report.md."
        ),
        expected_output=(
            "A confirmation that model.joblib, model_metrics.json, "
            "and evaluation_report.md were created successfully."
        ),
        agent=modeling_agent,
    )

    model_card_task = Task(
        description=(
            "Create the model card after the model training task is complete. "
            "You must use only the model card tool. "
            "Read the saved model metrics and create artifacts/model_card.md."
        ),
        expected_output="A confirmation that model_card.md was created successfully.",
        agent=model_documentation_agent,
    )

    crew = Crew(
        agents=[
            validation_agent,
            feature_engineering_agent,
            modeling_agent,
            model_documentation_agent,
        ],
        tasks=[
            validation_task,
            feature_engineering_task,
            modeling_task,
            model_card_task,
        ],
        process=Process.sequential,
        verbose=True,
    )

    return crew


def run_scientist_crew() -> str:
    """
    Run Crew 2: Data Scientist Crew.
    """

    crew = build_scientist_crew()
    result = crew.kickoff()
    return str(result)
