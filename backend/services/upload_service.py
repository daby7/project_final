from pathlib import Path
from io import StringIO

import pandas as pd

from backend import state as _state


RAW_DATA_PATH = Path("data/raw/retail_sales.csv")

# Maps each canonical column name to the accepted aliases (all lowercase, stripped).
# The first alias listed is usually the exact canonical name itself.
_COLUMN_ALIASES: dict[str, list[str]] = {
    "order_id":         ["order id", "orderid", "id", "order_number", "order no"],
    "date":             ["order date", "date", "created at", "created_at",
                         "sale date", "sale_date", "orderdate", "order_date",
                         "transaction date", "transaction_date"],
    "customer_name":    ["customer name", "customer", "customer_name",
                         "name", "client", "client name"],
    "category":         ["category", "product category", "product_category",
                         "type", "item_type", "cat", "dept", "department"],
    "region":           ["region", "area", "location", "city", "zone",
                         "territory", "state", "province"],
    "product_name":     ["product name", "product", "product_name", "item",
                         "sku", "item_name", "product_title", "article"],
    "quantity":         ["quantity", "qty", "units", "amount_sold",
                         "count", "vol", "volume", "no of units", "num_units"],
    "price":            ["unit price", "price", "unit_price", "unit cost",
                         "unit_cost", "cost", "rate", "selling price",
                         "selling_price"],
    "discount":         ["discount", "disc", "discount_pct", "discount_rate",
                         "disc_pct", "discounts", "discount %", "disc %"],
    "customer_segment": ["customer segment", "customer_segment", "segment",
                         "customer type", "customer_type", "cust_segment",
                         "client_type", "client type"],
    "payment_method":   ["payment method", "payment_method", "payment",
                         "method", "pay_method", "payment_type", "pay type"],
    "sales":            ["total sales", "sales", "total_sales", "revenue",
                         "amount", "total", "sale_amount", "total_amount",
                         "net_sales", "gross_sales", "total revenue",
                         "total_revenue", "sale value", "sale_value"],
}


def _normalize_columns(df: pd.DataFrame) -> pd.DataFrame:
    """Rename DataFrame columns to canonical snake_case names where aliases match."""
    mapping: dict[str, str] = {}
    for col in df.columns:
        key = col.strip().lower()
        for canonical, aliases in _COLUMN_ALIASES.items():
            if key == canonical or key in aliases:
                mapping[col] = canonical
                break
    return df.rename(columns=mapping)


def save_uploaded_csv(file_stream, filename: str) -> dict:
    """
    Normalize column names, save as data/raw/retail_sales.csv, and assign a
    fresh dataset_id.  Column normalization is intentionally light — the
    CrewAI Data Ingestion Agent does deeper cleaning downstream.
    """
    if not filename.lower().endswith(".csv"):
        raise ValueError("Uploaded file must be a CSV.")

    content = file_stream.read().decode("utf-8-sig")

    try:
        df = pd.read_csv(StringIO(content))
    except Exception:
        raise ValueError(
            "The file could not be read as a CSV. "
            "Please make sure it is a valid comma-separated (.csv) file."
        )

    if df.empty:
        raise ValueError("The uploaded CSV file is empty.")

    df = _normalize_columns(df)

    # Detect currency symbol from a 'currency' column if present
    currency_col = next((c for c in df.columns if c.strip().lower() == "currency"), None)
    if currency_col:
        non_null = df[currency_col].dropna()
        symbol = str(non_null.iloc[0]).strip() if not non_null.empty else ""
    else:
        symbol = ""
    _state.set_currency_symbol(symbol)

    RAW_DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(RAW_DATA_PATH, index=False)

    dataset_id = _state.new_dataset_id()

    return {
        "message": "CSV uploaded and saved successfully.",
        "rows": int(len(df)),
        "columns": list(df.columns),
        "saved_to": str(RAW_DATA_PATH),
        "dataset_id": dataset_id,
        "currency_symbol": symbol,
    }
