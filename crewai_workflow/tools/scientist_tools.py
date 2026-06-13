from pathlib import Path
import json
import math

import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


CLEAN_DATA_PATH = Path("data/processed/clean_data.csv")
FEATURES_PATH = Path("data/processed/features.csv")

ARTIFACTS_DIR = Path("artifacts")
CONTRACT_PATH = ARTIFACTS_DIR / "dataset_contract.json"

MODEL_PATH = ARTIFACTS_DIR / "model.joblib"
MODEL_METRICS_PATH = ARTIFACTS_DIR / "model_metrics.json"
MODEL_FEATURES_PATH = ARTIFACTS_DIR / "model_features.json"
EVALUATION_REPORT_PATH = ARTIFACTS_DIR / "evaluation_report.md"
MODEL_CARD_PATH = ARTIFACTS_DIR / "model_card.md"


def validate_clean_data_and_contract() -> str:
    """
    Tool 1:
    Validate that clean_data.csv and dataset_contract.json exist and match.
    """

    if not CLEAN_DATA_PATH.exists():
        raise FileNotFoundError(
            f"Cleaned dataset not found at: {CLEAN_DATA_PATH}. "
            "Run the Data Analyst Crew first."
        )

    if not CONTRACT_PATH.exists():
        raise FileNotFoundError(
            f"Dataset contract not found at: {CONTRACT_PATH}. "
            "Run the Data Analyst Crew first."
        )

    df = pd.read_csv(CLEAN_DATA_PATH)

    with open(CONTRACT_PATH, "r", encoding="utf-8") as file:
        contract = json.load(file)

    required_columns = contract.get("required_columns", [])
    target_column = contract.get("target_column", "sales")

    missing_columns = []

    for column in required_columns:
        if column not in df.columns:
            missing_columns.append(column)

    if missing_columns:
        raise ValueError(f"Cleaned dataset is missing required columns: {missing_columns}")

    if target_column not in df.columns:
        raise ValueError(f"Target column '{target_column}' does not exist in cleaned dataset.")

    if df.empty:
        raise ValueError("Cleaned dataset is empty.")

    return (
        f"Cleaned dataset and dataset contract validated successfully. "
        f"Dataset shape: {df.shape}. Target column: {target_column}"
    )


def create_features() -> str:
    """
    Tool 2:
    Create machine learning features and save features.csv.
    """

    if not CLEAN_DATA_PATH.exists():
        raise FileNotFoundError(
            f"Cleaned dataset not found at: {CLEAN_DATA_PATH}. "
            "Run the Data Analyst Crew first."
        )

    df = pd.read_csv(CLEAN_DATA_PATH)

    df["date"] = pd.to_datetime(df["date"], errors="coerce")

    df["month"] = df["date"].dt.month
    df["day_of_week"] = df["date"].dt.dayofweek
    df["is_weekend"] = df["day_of_week"].isin([5, 6]).astype(int)

    feature_columns = [
        "customer_segment",
        "category",
        "region",
        "payment_method",
        "price",
        "quantity",
        "discount",
        "month",
        "day_of_week",
        "is_weekend",
    ]

    target_column = "sales"

    missing_columns = []

    for column in feature_columns + [target_column]:
        if column not in df.columns:
            missing_columns.append(column)

    if missing_columns:
        raise ValueError(f"Missing columns needed for feature engineering: {missing_columns}")

    model_df = df[feature_columns + [target_column]].copy()

    model_df = model_df.dropna()

    categorical_columns = [
        "customer_segment",
        "category",
        "region",
        "payment_method",
    ]

    features_df = pd.get_dummies(
        model_df,
        columns=categorical_columns,
        drop_first=False,
        dtype=int,
    )

    ordered_columns = []

    for column in features_df.columns:
        if column != target_column:
            ordered_columns.append(column)

    ordered_columns.append(target_column)

    features_df = features_df[ordered_columns]

    FEATURES_PATH.parent.mkdir(parents=True, exist_ok=True)
    features_df.to_csv(FEATURES_PATH, index=False)

    feature_info = {
        "target_column": target_column,
        "feature_columns": [column for column in features_df.columns if column != target_column],
        "categorical_columns": categorical_columns,
        "numeric_columns": [
            "price",
            "quantity",
            "discount",
            "month",
            "day_of_week",
            "is_weekend",
        ],
        "feature_engineering_steps": [
            "Converted date column to datetime.",
            "Created month feature.",
            "Created day_of_week feature.",
            "Created is_weekend feature.",
            "One-hot encoded categorical columns.",
        ],
    }

    ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)

    with open(MODEL_FEATURES_PATH, "w", encoding="utf-8") as file:
        json.dump(feature_info, file, indent=4)

    return f"Features saved successfully to {FEATURES_PATH}. Shape: {features_df.shape}"


def train_and_evaluate_models() -> str:
    """
    Tool 3:
    Train and compare at least two predictive model variations.
    Save the best model as model.joblib and create evaluation_report.md.
    """

    if not FEATURES_PATH.exists():
        raise FileNotFoundError(
            f"Features file not found at: {FEATURES_PATH}. "
            "Run create_features() first."
        )

    features_df = pd.read_csv(FEATURES_PATH)

    target_column = "sales"

    if target_column not in features_df.columns:
        raise ValueError(f"Target column '{target_column}' not found in features.csv.")

    X = features_df.drop(columns=[target_column])
    y = features_df[target_column]

    if len(features_df) < 20:
        raise ValueError("Not enough rows to train a reliable model.")

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
    )

    models = {
        "Linear Regression": LinearRegression(),
        "Random Forest Regressor": RandomForestRegressor(
            n_estimators=100,
            random_state=42,
        ),
    }

    results = {}
    trained_models = {}

    for model_name, model in models.items():
        model.fit(X_train, y_train)

        predictions = model.predict(X_test)

        mae = mean_absolute_error(y_test, predictions)
        mse = mean_squared_error(y_test, predictions)
        rmse = math.sqrt(mse)
        r2 = r2_score(y_test, predictions)

        results[model_name] = {
            "mae": round(float(mae), 4),
            "rmse": round(float(rmse), 4),
            "r2_score": round(float(r2), 4),
        }

        trained_models[model_name] = model

    best_model_name = min(results, key=lambda name: results[name]["rmse"])
    best_model = trained_models[best_model_name]

    ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)

    model_package = {
        "model": best_model,
        "model_name": best_model_name,
        "target_column": target_column,
        "feature_columns": list(X.columns),
        "metrics": results[best_model_name],
    }

    joblib.dump(model_package, MODEL_PATH)

    metrics_output = {
        "best_model": best_model_name,
        "target_column": target_column,
        "train_rows": int(len(X_train)),
        "test_rows": int(len(X_test)),
        "all_model_results": results,
        "best_model_metrics": results[best_model_name],
    }

    with open(MODEL_METRICS_PATH, "w", encoding="utf-8") as file:
        json.dump(metrics_output, file, indent=4)

    report_text = f"""
# Model Evaluation Report

## Goal
Predict retail transaction sales using the cleaned and engineered dataset.

## Dataset Split
- Training rows: {len(X_train)}
- Testing rows: {len(X_test)}
- Target column: {target_column}

## Model Comparison

### Linear Regression
- MAE: {results["Linear Regression"]["mae"]}
- RMSE: {results["Linear Regression"]["rmse"]}
- R2 Score: {results["Linear Regression"]["r2_score"]}

### Random Forest Regressor
- MAE: {results["Random Forest Regressor"]["mae"]}
- RMSE: {results["Random Forest Regressor"]["rmse"]}
- R2 Score: {results["Random Forest Regressor"]["r2_score"]}

## Best Model
The best model is **{best_model_name}** because it achieved the lowest RMSE.

## Saved Artifacts
- Best model: `artifacts/model.joblib`
- Metrics JSON: `artifacts/model_metrics.json`
- Features file: `data/processed/features.csv`
"""

    EVALUATION_REPORT_PATH.write_text(report_text, encoding="utf-8")

    return (
        f"Models trained and evaluated successfully. "
        f"Best model: {best_model_name}. "
        f"Model saved to {MODEL_PATH}. "
        f"Evaluation report saved to {EVALUATION_REPORT_PATH}."
    )


def create_model_card() -> str:
    """
    Tool 4:
    Create model_card.md explaining the model, data, metrics, assumptions, and limitations.
    """

    if not MODEL_METRICS_PATH.exists():
        raise FileNotFoundError(
            f"Model metrics file not found at: {MODEL_METRICS_PATH}. "
            "Run train_and_evaluate_models() first."
        )

    if not MODEL_PATH.exists():
        raise FileNotFoundError(
            f"Model file not found at: {MODEL_PATH}. "
            "Run train_and_evaluate_models() first."
        )

    with open(MODEL_METRICS_PATH, "r", encoding="utf-8") as file:
        metrics = json.load(file)

    best_model = metrics["best_model"]
    best_metrics = metrics["best_model_metrics"]
    all_results = metrics["all_model_results"]

    model_card_text = f"""
# Model Card: Retail Sales Prediction Model

## Model Overview
This model predicts retail transaction sales using cleaned retail sales data and engineered features.

## Business Use Case
The model helps a retail-tech company estimate expected sales for transactions based on customer, product, region, payment, and pricing information.

## Target Variable
- Target column: `sales`

## Input Features
The model uses features such as:
- Price
- Quantity
- Discount
- Month
- Day of week
- Weekend indicator
- Customer segment
- Product category
- Region
- Payment method

## Models Compared
Two model variations were trained and compared:

### Linear Regression
- MAE: {all_results["Linear Regression"]["mae"]}
- RMSE: {all_results["Linear Regression"]["rmse"]}
- R2 Score: {all_results["Linear Regression"]["r2_score"]}

### Random Forest Regressor
- MAE: {all_results["Random Forest Regressor"]["mae"]}
- RMSE: {all_results["Random Forest Regressor"]["rmse"]}
- R2 Score: {all_results["Random Forest Regressor"]["r2_score"]}

## Selected Model
The selected model is:

**{best_model}**

It was selected because it had the lowest RMSE among the compared models.

## Best Model Metrics
- MAE: {best_metrics["mae"]}
- RMSE: {best_metrics["rmse"]}
- R2 Score: {best_metrics["r2_score"]}

## Assumptions
- Each row represents one retail transaction.
- The cleaned dataset follows the dataset contract created by the Data Analyst Crew.
- The target variable is `sales`.
- The train/test split uses a fixed random state for reproducibility.

## Limitations
- The dataset is small and used for educational project purposes.
- Real-world sales can be affected by external factors not included in the dataset.
- The model should be retrained when new business data becomes available.
- Predictions should support business decisions, not replace human judgment.

## Saved Artifacts
- Model file: `artifacts/model.joblib`
- Evaluation report: `artifacts/evaluation_report.md`
- Model metrics: `artifacts/model_metrics.json`
- Feature data: `data/processed/features.csv`
"""

    MODEL_CARD_PATH.write_text(model_card_text, encoding="utf-8")

    return f"Model card saved successfully to {MODEL_CARD_PATH}"
