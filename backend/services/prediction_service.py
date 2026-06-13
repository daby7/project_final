from pathlib import Path
from datetime import datetime

import pandas as pd
import joblib


MODEL_PATH = Path("artifacts/model.joblib")


def predict_sales(
    category: str,
    region: str,
    customer_segment: str,
    payment_method: str,
    price: float,
    quantity: float,
    discount: float,
) -> float:
    """
    Load the trained model and return a predicted sales value.

    Numeric date features (month, day_of_week, is_weekend) are derived
    from the current date so the prediction is always contextually fresh.
    """
    if not MODEL_PATH.exists():
        raise FileNotFoundError(
            "Trained model not found at artifacts/model.joblib. "
            "Run the analysis workflow first."
        )

    model_package = joblib.load(MODEL_PATH)
    model = model_package["model"]
    feature_columns = model_package["feature_columns"]

    now = datetime.now()
    month = now.month
    day_of_week = now.weekday()
    is_weekend = 1 if day_of_week >= 5 else 0

    # Start with all feature columns zeroed out (handles unseen one-hot values safely)
    row = {col: 0 for col in feature_columns}

    row["price"] = float(price)
    row["quantity"] = float(quantity)
    row["discount"] = float(discount)
    row["month"] = month
    row["day_of_week"] = day_of_week
    row["is_weekend"] = is_weekend

    # Activate the correct one-hot columns for each categorical input
    for prefix, value in {
        "customer_segment": customer_segment,
        "category": category,
        "region": region,
        "payment_method": payment_method,
    }.items():
        one_hot_col = f"{prefix}_{value}"
        if one_hot_col in row:
            row[one_hot_col] = 1

    X = pd.DataFrame([row])[feature_columns]
    predicted = model.predict(X)[0]

    return round(float(predicted), 2)
