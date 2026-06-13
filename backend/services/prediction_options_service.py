import json
from pathlib import Path

import pandas as pd


CLEAN_DATA_PATH = Path("data/processed/clean_data.csv")
VALUE_TRANSLATIONS_PATH = Path("artifacts/value_translations.json")

_DISPLAY_COLUMNS = ["category", "region", "customer_segment", "payment_method", "product_name"]


def get_prediction_options() -> dict | None:
    """
    Read clean_data.csv and return sorted unique values for every
    display column.  Returns None if the file does not exist yet.
    """
    if not CLEAN_DATA_PATH.exists():
        return None

    df = pd.read_csv(CLEAN_DATA_PATH)
    options: dict[str, list[str]] = {}

    for col in _DISPLAY_COLUMNS:
        if col not in df.columns:
            continue
        unique = sorted(
            str(v).strip()
            for v in df[col].dropna().unique()
            if str(v).strip() and str(v).strip().lower() != "unknown"
        )
        if unique:
            options[col] = unique

    translations: dict = {}
    if VALUE_TRANSLATIONS_PATH.exists():
        with open(VALUE_TRANSLATIONS_PATH, "r", encoding="utf-8") as fh:
            translations = json.load(fh)

    return {"options": options, "translations": translations}
