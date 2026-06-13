from dotenv import load_dotenv
from crewai import Agent, Task, Crew, Process
from crewai.tools import tool

from crewai_workflow.tools.analyst_tools import (
    ingest_and_validate_data,
    clean_and_preprocess_data,
    create_dataset_contract,
    generate_eda_report_and_insights,
    generate_value_translations_with_llm,
)


load_dotenv()


@tool("Ingest and Validate Retail Dataset")
def ingest_validate_tool() -> str:
    """
    Validate that the raw retail dataset exists and contains all required columns.
    """
    return ingest_and_validate_data()


@tool("Clean and Preprocess Retail Dataset")
def clean_preprocess_tool() -> str:
    """
    Clean the raw retail dataset and save clean_data.csv.
    """
    return clean_and_preprocess_data()


@tool("Create Dataset Contract")
def dataset_contract_tool() -> str:
    """
    Create dataset_contract.json with schema, allowed values, assumptions, and constraints.
    """
    return create_dataset_contract()


@tool("Generate EDA Report and Business Insights")
def eda_insights_tool() -> str:
    """
    Generate eda_report.html, insights.md, and visual charts.
    """
    return generate_eda_report_and_insights()


@tool("Generate Value Translations")
def localization_tool() -> str:
    """
    Extract unique display values from clean_data.csv and translate them into
    Arabic and Hebrew using the OpenAI API.  Saves artifacts/value_translations.json.
    """
    return generate_value_translations_with_llm()


def build_analyst_crew() -> Crew:
    """
    Build the Data Analyst Crew with at least 3 agents.
    """

    ingestion_agent = Agent(
        role="Data Ingestion and Validation Agent",
        goal="Validate the raw retail sales dataset before any analysis begins.",
        backstory=(
            "You are a careful data analyst responsible for checking that the "
            "incoming retail dataset exists and has the required columns."
        ),
        tools=[ingest_validate_tool],
        verbose=True,
    )

    cleaning_agent = Agent(
        role="Data Cleaning Agent",
        goal="Clean and preprocess the retail sales dataset.",
        backstory=(
            "You are a data cleaning specialist who prepares raw business data "
            "for reliable analysis and machine learning."
        ),
        tools=[clean_preprocess_tool],
        verbose=True,
    )

    eda_contract_agent = Agent(
        role="EDA and Dataset Contract Agent",
        goal=(
            "Produce descriptive analytics, business insights, visual reports, "
            "and a dataset contract for the Data Scientist Crew."
        ),
        backstory=(
            "You are a senior business analyst who summarizes retail performance "
            "and documents the dataset rules for downstream modeling."
        ),
        tools=[dataset_contract_tool, eda_insights_tool],
        verbose=True,
    )

    localization_agent = Agent(
        role="Localization and Translation Agent",
        goal=(
            "Translate all unique user-facing dataset values into Arabic and Hebrew "
            "so the frontend can display them in multiple languages."
        ),
        backstory=(
            "You are a multilingual data specialist. After the dataset is cleaned, "
            "you extract every unique display value and produce accurate translations "
            "for the frontend, using an LLM for values not in the known dictionary."
        ),
        tools=[localization_tool],
        verbose=True,
    )

    ingestion_task = Task(
        description=(
            "Validate the raw retail sales dataset. "
            "You must use the ingest validation tool. "
            "Confirm that the dataset exists and contains all required columns."
        ),
        expected_output="A validation confirmation message with the dataset shape.",
        agent=ingestion_agent,
    )

    cleaning_task = Task(
        description=(
            "Clean and preprocess the raw retail sales dataset. "
            "You must use the cleaning tool. "
            "Save the cleaned dataset as data/processed/clean_data.csv."
        ),
        expected_output="A confirmation that clean_data.csv was created successfully.",
        agent=cleaning_agent,
    )

    eda_contract_task = Task(
        description=(
            "Create the dataset contract and generate the EDA report and business insights. "
            "You must use the dataset contract tool and the EDA insights tool. "
            "Save the outputs as artifacts/dataset_contract.json, "
            "artifacts/eda_report.html, and artifacts/insights.md."
        ),
        expected_output=(
            "A confirmation that dataset_contract.json, eda_report.html, "
            "and insights.md were created successfully."
        ),
        agent=eda_contract_agent,
    )

    localization_task = Task(
        description=(
            "Translate all unique user-facing values from the cleaned dataset into Arabic and Hebrew. "
            "You must use the localization tool. "
            "Save the output to artifacts/value_translations.json."
        ),
        expected_output=(
            "A confirmation that value_translations.json was created with the total number of entries "
            "and how many were translated by the LLM versus served from cache."
        ),
        agent=localization_agent,
    )

    crew = Crew(
        agents=[
            ingestion_agent,
            cleaning_agent,
            eda_contract_agent,
            localization_agent,
        ],
        tasks=[
            ingestion_task,
            cleaning_task,
            eda_contract_task,
            localization_task,
        ],
        process=Process.sequential,
        verbose=True,
    )

    return crew


def run_analyst_crew() -> str:
    """
    Run the Data Analyst Crew.
    """

    crew = build_analyst_crew()
    result = crew.kickoff()
    return str(result)
