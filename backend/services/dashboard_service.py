import json
from pathlib import Path

import pandas as pd


CLEAN_DATA_PATH = Path("data/processed/clean_data.csv")
VALUE_TRANSLATIONS_PATH = Path("artifacts/value_translations.json")


def get_dashboard_data() -> dict:
    """
    Read clean_data.csv and return all metrics needed by the dashboard.
    Raises FileNotFoundError if the workflow hasn't been run yet.
    """
    if not CLEAN_DATA_PATH.exists():
        raise FileNotFoundError(
            "Clean data not found. Run the analysis workflow first."
        )

    df = pd.read_csv(CLEAN_DATA_PATH)
    df["date"] = pd.to_datetime(df["date"], errors="coerce")

    total_sales = round(float(df["sales"].sum()), 2)
    total_orders = int(len(df))
    average_order_value = round(float(df["sales"].mean()), 2)

    category_sales = df.groupby("category")["sales"].sum().sort_values(ascending=False) if "category" in df.columns else pd.Series(dtype=float)
    region_sales = df.groupby("region")["sales"].sum().sort_values(ascending=False) if "region" in df.columns else pd.Series(dtype=float)
    product_sales = df.groupby("product_name")["sales"].sum().sort_values(ascending=False) if "product_name" in df.columns else pd.Series(dtype=float)

    top_category = str(category_sales.index[0]) if not category_sales.empty else ""
    top_region = str(region_sales.index[0]) if not region_sales.empty else ""
    best_product = str(product_sales.index[0]) if not product_sales.empty else ""

    sales_by_category = [
        {"category": str(cat), "sales": round(float(val), 2)}
        for cat, val in category_sales.items()
    ]

    sales_by_region = [
        {"region": str(reg), "sales": round(float(val), 2)}
        for reg, val in region_sales.items()
    ]

    df["month"] = df["date"].dt.to_period("M").astype(str)
    monthly = df.groupby("month")["sales"].sum().sort_index()
    monthly_sales = [
        {"month": str(month), "sales": round(float(val), 2)}
        for month, val in monthly.items()
    ]

    top_products = [
        {"product": str(prod), "sales": round(float(val), 2)}
        for prod, val in product_sales.head(10).items()
    ]

    segment_counts = df["customer_segment"].value_counts()
    customer_segments = [
        {"segment": str(seg), "count": int(cnt)}
        for seg, cnt in segment_counts.items()
    ]

    payment_counts = df["payment_method"].value_counts()
    payment_methods = [
        {"method": str(method), "count": int(cnt)}
        for method, cnt in payment_counts.items()
    ]

    translations: dict = {}
    if VALUE_TRANSLATIONS_PATH.exists():
        with open(VALUE_TRANSLATIONS_PATH, "r", encoding="utf-8") as fh:
            translations = json.load(fh)

    return {
        "total_sales": total_sales,
        "total_orders": total_orders,
        "average_order_value": average_order_value,
        "top_category": top_category,
        "top_region": top_region,
        "best_product": best_product,
        "sales_by_category": sales_by_category,
        "sales_by_region": sales_by_region,
        "monthly_sales": monthly_sales,
        "top_products": top_products,
        "customer_segments": customer_segments,
        "payment_methods": payment_methods,
        "translations": translations,
    }
