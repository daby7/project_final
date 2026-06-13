"""
Generate synthetic retail sales data and retrain the model.
Run once: python generate_and_train.py
"""
import random
from pathlib import Path
from datetime import date, timedelta

import pandas as pd

# ── Config ────────────────────────────────────────────────────────────────────
ROWS = 500
SEED = 42
random.seed(SEED)

CATEGORIES = {
    "Electronics": [("P001", "Laptop", 800, 1200),
                    ("P002", "Phone",  500,  700),
                    ("P003", "Headphones", 80, 150)],
    "Fashion":     [("P006", "Shoes",   60,  100),
                    ("P007", "Jacket", 100,  180)],
    "Furniture":   [("P004", "Desk",   230,  350),
                    ("P005", "Chair",  120,  180)],
    "Home":        [("P008", "Coffee Maker", 80, 130)],
}
REGIONS   = ["East", "West", "North", "South"]
SEGMENTS  = ["New", "Regular", "Premium"]
PAYMENTS  = ["Cash", "Card", "Online"]
DISCOUNTS = [0.0, 0.0, 0.05, 0.05, 0.10, 0.15, 0.20]

START = date(2025, 1, 1)
END   = date(2025, 12, 31)

# ── Generate ──────────────────────────────────────────────────────────────────
rows = []
for i in range(1, ROWS + 1):
    category = random.choice(list(CATEGORIES.keys()))
    product_id, product_name, price_low, price_high = random.choice(CATEGORIES[category])
    price    = round(random.uniform(price_low, price_high), 2)
    quantity = random.randint(1, 8)
    discount = random.choice(DISCOUNTS)
    sales    = round(price * quantity * (1 - discount), 2)
    days_offset = random.randint(0, (END - START).days)
    rows.append({
        "order_id":        f"O{i:04d}",
        "date":            (START + timedelta(days=days_offset)).isoformat(),
        "customer_id":     f"C{random.randint(1, 150):03d}",
        "customer_segment": random.choice(SEGMENTS),
        "product_id":      product_id,
        "product_name":    product_name,
        "category":        category,
        "region":          random.choice(REGIONS),
        "payment_method":  random.choice(PAYMENTS),
        "price":           price,
        "quantity":        quantity,
        "discount":        discount,
        "sales":           sales,
    })

df = pd.DataFrame(rows)

# ── Save ──────────────────────────────────────────────────────────────────────
raw_path    = Path("data/raw/retail_sales.csv")
sample_path = Path("frontend/static/sample_data.csv")

raw_path.parent.mkdir(parents=True, exist_ok=True)
sample_path.parent.mkdir(parents=True, exist_ok=True)

df.to_csv(raw_path, index=False)
df.to_csv(sample_path, index=False)
print(f"[OK] Generated {ROWS} rows -> {raw_path}  +  {sample_path}")

# ── Clean ─────────────────────────────────────────────────────────────────────
import sys, os
sys.path.insert(0, str(Path(__file__).parent.parent))
from crewai_workflow.tools.analyst_tools import clean_and_preprocess_data
result = clean_and_preprocess_data()
print(f"[OK] Clean: {result}")

# ── Features ──────────────────────────────────────────────────────────────────
from crewai_workflow.tools.scientist_tools import create_features
result = create_features()
print(f"[OK] Features: {result}")

# ── Train ─────────────────────────────────────────────────────────────────────
from crewai_workflow.tools.scientist_tools import train_and_evaluate_models
result = train_and_evaluate_models()
print(f"[OK] Model: {result}")

print("\nDone - model retrained and sample_data.csv ready for download.")
