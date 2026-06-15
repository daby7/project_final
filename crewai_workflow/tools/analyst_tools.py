from pathlib import Path
import json

import pandas as pd

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt


RAW_DATA_PATH = Path("data/raw/retail_sales.csv")
CLEAN_DATA_PATH = Path("data/processed/clean_data.csv")

ARTIFACTS_DIR = Path("artifacts")
FIGURES_DIR = ARTIFACTS_DIR / "figures"

CONTRACT_PATH = ARTIFACTS_DIR / "dataset_contract.json"
EDA_REPORT_PATH = ARTIFACTS_DIR / "eda_report.html"
INSIGHTS_PATH = ARTIFACTS_DIR / "insights.md"
VALUE_TRANSLATIONS_PATH = ARTIFACTS_DIR / "value_translations.json"

# Columns whose values are shown to the user (never IDs)
_DISPLAY_COLUMNS = ["category", "region", "product_name", "customer_segment", "payment_method"]

# Known translations — keyed by lowercase English value
_KNOWN_TRANSLATIONS: dict[str, dict] = {
    # categories
    "electronics":       {"en": "Electronics",       "ar": "الإلكترونيات",   "he": "אלקטרוניקה"},
    "furniture":         {"en": "Furniture",          "ar": "الأثاث",          "he": "ריהוט"},
    "clothing":          {"en": "Clothing",           "ar": "الملابس",         "he": "ביגוד"},
    "groceries":         {"en": "Groceries",          "ar": "البقالة",         "he": "מצרכים"},
    "beauty":            {"en": "Beauty",             "ar": "الجمال",          "he": "טיפוח"},
    "fashion":           {"en": "Fashion",            "ar": "الأزياء",         "he": "אופנה"},
    "home":              {"en": "Home",               "ar": "المنزل",          "he": "בית"},
    # regions
    "east":              {"en": "East",               "ar": "الشرقية",         "he": "מזרח"},
    "west":              {"en": "West",               "ar": "الغربية",         "he": "מערב"},
    "north":             {"en": "North",              "ar": "الشمالية",        "he": "צפון"},
    "south":             {"en": "South",              "ar": "الجنوبية",        "he": "דרום"},
    "jerusalem":         {"en": "Jerusalem",          "ar": "القدس",           "he": "ירושלים"},
    "tel aviv":          {"en": "Tel Aviv",           "ar": "تل أبيب",         "he": "תל אביב"},
    "haifa":             {"en": "Haifa",              "ar": "حيفا",            "he": "חיפה"},
    "nazareth":          {"en": "Nazareth",           "ar": "الناصرة",         "he": "נצרת"},
    "beer sheva":        {"en": "Beer Sheva",         "ar": "بئر السبع",       "he": "באר שבע"},
    # customer segments
    "new":               {"en": "New",                "ar": "جديد",            "he": "חדש"},
    "premium":           {"en": "Premium",            "ar": "مميز",            "he": "פרימיום"},
    "regular":           {"en": "Regular",            "ar": "عادي",            "he": "רגיל"},
    "retail":            {"en": "Retail",             "ar": "تجزئة",           "he": "קמעונאות"},
    "corporate":         {"en": "Corporate",          "ar": "شركات",           "he": "עסקי"},
    "vip":               {"en": "VIP",                "ar": "مميز خاص",        "he": "VIP"},
    "student":           {"en": "Student",            "ar": "طالب",            "he": "סטודנט"},
    # payment methods
    "credit card":       {"en": "Credit Card",        "ar": "بطاقة ائتمان",    "he": "כרטיס אשראי"},
    "card":              {"en": "Card",               "ar": "بطاقة ائتمان",    "he": "כרטיס אשראי"},
    "cash":              {"en": "Cash",               "ar": "نقدًا",           "he": "מזומן"},
    "online":            {"en": "Online",             "ar": "دفع إلكتروني",    "he": "תשלום אלקטרוני"},
    "paypal":            {"en": "PayPal",             "ar": "باي بال",         "he": "PayPal"},
    "bank transfer":     {"en": "Bank Transfer",      "ar": "تحويل بنكي",      "he": "העברה בנקאית"},
    "apple pay":         {"en": "Apple Pay",          "ar": "Apple Pay",       "he": "Apple Pay"},
    # products — generate_and_train.py sample
    "laptop":            {"en": "Laptop",             "ar": "لابتوب",          "he": "מחשב נייד"},
    "phone":             {"en": "Phone",              "ar": "هاتف",            "he": "טלפון"},
    "headphones":        {"en": "Headphones",         "ar": "سماعات",          "he": "אוזניות"},
    "shoes":             {"en": "Shoes",              "ar": "أحذية",           "he": "נעליים"},
    "jacket":            {"en": "Jacket",             "ar": "جاكيت",          "he": "ז'קט"},
    "desk":              {"en": "Desk",               "ar": "مكتب",            "he": "שולחן"},
    "chair":             {"en": "Chair",              "ar": "كرسي",            "he": "כיסא"},
    "coffee maker":      {"en": "Coffee Maker",       "ar": "آلة قهوة",        "he": "מכונת קפה"},
    # products — user test CSV
    "office chair":      {"en": "Office Chair",       "ar": "كرسي مكتب",       "he": "כיסא משרדי"},
    "study desk":        {"en": "Study Desk",         "ar": "مكتب دراسة",      "he": "שולחן לימוד"},
    "bookshelf":         {"en": "Bookshelf",          "ar": "مكتبة",           "he": "כוננית ספרים"},
    "desk lamp":         {"en": "Desk Lamp",          "ar": "مصباح مكتب",      "he": "מנורת שולחן"},
    "storage cabinet":   {"en": "Storage Cabinet",    "ar": "خزانة تخزين",     "he": "ארון אחסון"},
    "wireless mouse":    {"en": "Wireless Mouse",     "ar": "فأرة لاسلكية",    "he": "עכבר אלחוטי"},
    "bluetooth speaker": {"en": "Bluetooth Speaker",  "ar": "سماعة بلوتوث",    "he": "רמקול בלוטות'"},
    "laptop stand":      {"en": "Laptop Stand",       "ar": "حامل لابتوب",     "he": "מעמד למחשב נייד"},
    "usb-c hub":         {"en": "USB-C Hub",          "ar": "موزع USB-C",      "he": "מפצל USB-C"},
    "keyboard":          {"en": "Keyboard",           "ar": "لوحة مفاتيح",     "he": "מקלדת"},
    "t-shirt":           {"en": "T-Shirt",            "ar": "قميص",            "he": "חולצה"},
    "jeans":             {"en": "Jeans",              "ar": "جينز",            "he": "ג'ינס"},
    "sneakers":          {"en": "Sneakers",           "ar": "حذاء رياضي",      "he": "נעלי ספורט"},
    "cap":               {"en": "Cap",                "ar": "قبعة",            "he": "כובע"},
    "coffee beans":      {"en": "Coffee Beans",       "ar": "حبوب قهوة",       "he": "פולי קפה"},
    "olive oil":         {"en": "Olive Oil",          "ar": "زيت زيتون",       "he": "שמן זית"},
    "pasta pack":        {"en": "Pasta Pack",         "ar": "عبوة معكرونة",    "he": "חבילת פסטה"},
    "rice bag":          {"en": "Rice Bag",           "ar": "كيس أرز",         "he": "שק אורז"},
    "chocolate box":     {"en": "Chocolate Box",      "ar": "علبة شوكولاتة",   "he": "קופסת שוקולד"},
    "face cream":        {"en": "Face Cream",         "ar": "كريم وجה",        "he": "קרם פנים"},
    "shampoo":           {"en": "Shampoo",            "ar": "شامبو",           "he": "שמפו"},
    "perfume":           {"en": "Perfume",            "ar": "عطر",             "he": "בושם"},
    "body lotion":       {"en": "Body Lotion",        "ar": "لوشن للجسم",      "he": "קרם גוף"},
    "hair gel":          {"en": "Hair Gel",           "ar": "جل شعر",          "he": "ג'ל לשיער"},
}


def generate_value_translations() -> None:
    """
    Build artifacts/value_translations.json from the unique display values
    in clean_data.csv.  Known values use the curated translations; unknown
    values fall back to the original string for all three languages so the
    UI never breaks.  Called automatically after data cleaning.
    """
    if not CLEAN_DATA_PATH.exists():
        return

    df = pd.read_csv(CLEAN_DATA_PATH)
    result: dict[str, dict] = {}

    for col in _DISPLAY_COLUMNS:
        if col not in df.columns:
            continue
        for raw in df[col].dropna().unique():
            val = str(raw).strip()
            if not val or val.lower() == "unknown" or val in result:
                continue
            entry = _KNOWN_TRANSLATIONS.get(val.lower())
            result[val] = entry.copy() if entry else {"en": val, "ar": val, "he": val}

    ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)
    with open(VALUE_TRANSLATIONS_PATH, "w", encoding="utf-8") as fh:
        json.dump(result, fh, ensure_ascii=False, indent=2)


def generate_value_translations_with_llm() -> str:
    """
    Tool 5 — Localization Agent:
    Extracts unique display values from clean_data.csv, uses _KNOWN_TRANSLATIONS
    as a cache, and calls the OpenAI API to translate any unknown values into
    Arabic and Hebrew.  Falls back to the original string if the API key is absent
    or the request fails.  Saves artifacts/value_translations.json.
    """
    import os

    print("Localization Agent started")

    if not CLEAN_DATA_PATH.exists():
        raise FileNotFoundError(f"Clean data not found at: {CLEAN_DATA_PATH}")

    df = pd.read_csv(CLEAN_DATA_PATH)

    unique_values: set[str] = set()
    for col in _DISPLAY_COLUMNS:
        if col in df.columns:
            for raw in df[col].dropna().unique():
                val = str(raw).strip()
                if val and val.lower() != "unknown":
                    unique_values.add(val)

    print(f"Extracted {len(unique_values)} unique display values")

    result: dict[str, dict] = {}
    unknown_values: list[str] = []

    for val in sorted(unique_values):
        entry = _KNOWN_TRANSLATIONS.get(val.lower())
        if entry:
            result[val] = entry.copy()
        else:
            unknown_values.append(val)

    api_key = os.environ.get("OPENAI_API_KEY")

    if unknown_values and api_key:
        try:
            from openai import OpenAI

            client = OpenAI(api_key=api_key)
            values_list = "\n".join(f"- {v}" for v in unknown_values)
            prompt = (
                "You are a professional translator for a retail analytics platform.\n"
                "Translate each of the following retail data values into Arabic and Hebrew.\n"
                "These are display labels: product names, categories, regions, customer segments, payment methods.\n\n"
                "Return ONLY a valid JSON object where each key is the original English value "
                "and each value has 'ar' and 'he' fields.\n\n"
                f"Values:\n{values_list}\n\n"
                'Example: {"Vacuum Cleaner": {"ar": "مكنسة كهربائية", "he": "שואב אבק"}}\n'
                "Return only the JSON, no explanation."
            )
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}],
                temperature=0,
                response_format={"type": "json_object"},
            )
            translations_raw: dict = json.loads(response.choices[0].message.content)
            for val in unknown_values:
                t = translations_raw.get(val, {})
                result[val] = {
                    "en": val,
                    "ar": t.get("ar", val),
                    "he": t.get("he", val),
                }
        except Exception as exc:
            print(f"Warning: LLM translation failed ({exc}). Using original values for unknown entries.")
            for val in unknown_values:
                result[val] = {"en": val, "ar": val, "he": val}
    elif unknown_values:
        print("Warning: OPENAI_API_KEY not set. Unknown values will not be translated.")
        for val in unknown_values:
            result[val] = {"en": val, "ar": val, "he": val}

    ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)
    with open(VALUE_TRANSLATIONS_PATH, "w", encoding="utf-8") as fh:
        json.dump(result, fh, ensure_ascii=False, indent=2)

    llm_count = len(unknown_values) if (unknown_values and api_key) else 0
    cache_count = len(result) - len(unknown_values)
    print(f"Generated value_translations.json with {len(result)} entries")
    print("Localization Agent completed")

    return (
        f"value_translations.json saved: {len(result)} total entries "
        f"({cache_count} from cache, {llm_count} translated by LLM)."
    )


REQUIRED_COLUMNS = [
    "order_id",
    "date",
    "customer_id",
    "customer_segment",
    "product_id",
    "product_name",
    "category",
    "region",
    "payment_method",
    "price",
    "quantity",
    "discount",
    "sales",
]


COLUMN_MAP = {
    # ── Order ID ────────────────────────────────────────────────────────────
    "order id": "order_id", "order_id": "order_id", "orderid": "order_id",
    "transaction id": "order_id", "transaction_id": "order_id",
    "invoice id": "order_id", "invoice_id": "order_id", "invoice": "order_id",

    # ── Date ────────────────────────────────────────────────────────────────
    "order date": "date", "order_date": "date", "date": "date",
    "transaction date": "date", "transaction_date": "date",
    "sale date": "date", "sale_date": "date",
    "purchase date": "date", "purchase_date": "date",
    "invoice date": "date", "invoice_date": "date",

    # ── Customer name (→ customer_name; ID generated below) ─────────────────
    "customer name": "customer_name", "customer_name": "customer_name",
    "customername": "customer_name", "customer": "customer_name",
    "client name": "customer_name", "client_name": "customer_name",
    "client": "customer_name", "buyer": "customer_name",

    # ── Customer ID ──────────────────────────────────────────────────────────
    "customer id": "customer_id", "customer_id": "customer_id",
    "customerid": "customer_id", "client id": "customer_id",

    # ── Customer segment ─────────────────────────────────────────────────────
    "customer segment": "customer_segment", "customer_segment": "customer_segment",
    "segment": "customer_segment", "tier": "customer_segment",
    "customer tier": "customer_segment", "customer_tier": "customer_segment",
    "membership": "customer_segment", "loyalty tier": "customer_segment",
    "loyalty_tier": "customer_segment",

    # ── Product name ─────────────────────────────────────────────────────────
    "product name": "product_name", "product_name": "product_name",
    "productname": "product_name", "product": "product_name",
    "item name": "product_name", "item_name": "product_name",
    "item": "product_name", "description": "product_name",
    "goods": "product_name",

    # ── Product ID ───────────────────────────────────────────────────────────
    "product id": "product_id", "product_id": "product_id",
    "productid": "product_id", "sku": "product_id",
    "item id": "product_id", "item_id": "product_id",
    "barcode": "product_id",

    # ── Category ─────────────────────────────────────────────────────────────
    "category": "category", "product category": "category",
    "product_category": "category", "dept": "category",
    "department": "category", "product type": "category",
    "product_type": "category",

    # ── Region ───────────────────────────────────────────────────────────────
    "region": "region", "territory": "region", "area": "region",
    "zone": "region", "store location": "region",
    "store_location": "region", "branch": "region",
    "market": "region",

    # ── Payment method ───────────────────────────────────────────────────────
    "payment method": "payment_method", "payment_method": "payment_method",
    "payment": "payment_method", "payment type": "payment_method",
    "payment_type": "payment_method", "pay method": "payment_method",

    # ── Quantity ─────────────────────────────────────────────────────────────
    "quantity": "quantity", "qty": "quantity",
    "units": "quantity", "units sold": "quantity",
    "units_sold": "quantity", "volume": "quantity",
    "pieces": "quantity", "no of units": "quantity",

    # ── Price ────────────────────────────────────────────────────────────────
    "unit price": "price", "unit_price": "price", "price": "price",
    "cost": "price", "unit cost": "price", "unit_cost": "price",
    "selling price": "price", "selling_price": "price",
    "retail price": "price", "retail_price": "price",
    "list price": "price", "list_price": "price",

    # ── Discount ─────────────────────────────────────────────────────────────
    "discount": "discount", "discount rate": "discount",
    "discount_rate": "discount", "discount %": "discount",
    "discount percent": "discount", "discount_percent": "discount",
    "promo": "discount", "promo rate": "discount",

    # ── Sales / Revenue ───────────────────────────────────────────────────────
    "total sales": "sales", "total_sales": "sales", "sales": "sales",
    "revenue": "sales", "total revenue": "sales", "total_revenue": "sales",
    "total amount": "sales", "total_amount": "sales",
    "sale amount": "sales", "sale_amount": "sales",
    "net sales": "sales", "net_sales": "sales",
    "gross sales": "sales", "gross_sales": "sales",
    "amount": "sales", "subtotal": "sales",
    "total": "sales", "line total": "sales", "line_total": "sales",
}

# Fields we absolutely cannot default — at least one from each group must exist
_ESSENTIAL_GROUPS = {
    "a date or transaction date column":         ["date"],
    "a quantity or units column":                ["quantity"],
    "a price, unit price, or sales/revenue column": ["price", "sales"],
    "a product name, item, or category column":  ["product_name", "category"],
}


def ingest_and_validate_data() -> str:
    """
    Tool 1 — Data Ingestion Agent.

    • Normalises column names from any user-friendly sales CSV.
    • Derives or defaults every optional field so downstream tools
      always receive the canonical 13-column schema.
    • Returns a friendly explanation (not a stack trace) when the
      file is clearly not a sales dataset.
    """

    if not RAW_DATA_PATH.exists():
        raise FileNotFoundError(
            "No CSV file found. Please upload a sales data file first."
        )

    df = pd.read_csv(RAW_DATA_PATH)

    # ── Step 1: normalise column names ──────────────────────────────────────
    df.columns = df.columns.str.lower().str.strip()
    df.rename(columns=COLUMN_MAP, inplace=True)

    # ── Step 2: check essential field groups ────────────────────────────────
    missing_essential = [
        label
        for label, candidates in _ESSENTIAL_GROUPS.items()
        if not any(col in df.columns for col in candidates)
    ]

    if missing_essential:
        raise ValueError(
            "This file doesn't look like a retail sales dataset. "
            "The following essential information could not be found:\n"
            + "\n".join(f"  • {m}" for m in missing_essential)
            + "\n\nPlease upload a CSV that contains at least: "
            "a date, a product or category, a quantity, "
            "and a price or sales amount."
        )

    # ── Step 3: generate / default every optional field ─────────────────────

    # order_id
    if "order_id" not in df.columns:
        df["order_id"] = [f"O{i + 1:04d}" for i in range(len(df))]

    # customer_id  (prefer explicit ID; fall back to slugified name)
    if "customer_id" not in df.columns:
        if "customer_name" in df.columns:
            df["customer_id"] = (
                df["customer_name"]
                .str.lower().str.strip()
                .str.replace(r"\s+", "_", regex=True)
            )
        else:
            df["customer_id"] = "unknown"

    # product_id  (prefer explicit ID; fall back to slugified name)
    if "product_id" not in df.columns:
        if "product_name" in df.columns:
            df["product_id"] = (
                df["product_name"]
                .str.lower().str.strip()
                .str.replace(r"\s+", "_", regex=True)
            )
        else:
            df["product_id"] = "unknown"

    # product_name
    if "product_name" not in df.columns:
        df["product_name"] = df["category"] if "category" in df.columns else "Unknown"

    # category
    if "category" not in df.columns:
        df["category"] = "Unknown"

    # region
    if "region" not in df.columns:
        df["region"] = "Unknown"

    # customer_segment
    if "customer_segment" not in df.columns:
        df["customer_segment"] = "Unknown"

    # payment_method
    if "payment_method" not in df.columns:
        df["payment_method"] = "Unknown"

    # discount  (default 0 — no discount)
    if "discount" not in df.columns:
        df["discount"] = 0.0

    # sales  (derive from price × quantity × (1 − discount) if missing)
    if "sales" not in df.columns:
        df["sales"] = (
            pd.to_numeric(df["price"], errors="coerce")
            * pd.to_numeric(df["quantity"], errors="coerce")
            * (1 - pd.to_numeric(df["discount"], errors="coerce").fillna(0))
        ).round(2)

    # price  (derive from sales ÷ quantity if missing)
    if "price" not in df.columns:
        qty = pd.to_numeric(df["quantity"], errors="coerce").replace(0, pd.NA)
        df["price"] = (
            pd.to_numeric(df["sales"], errors="coerce") / qty
        ).round(2).fillna(0.0)

    # ── Step 4: save normalised file for downstream agents ──────────────────
    df.to_csv(RAW_DATA_PATH, index=False)

    missing_cols = [c for c in REQUIRED_COLUMNS if c not in df.columns]
    if missing_cols:
        raise ValueError(
            f"Normalisation incomplete — still missing: {missing_cols}. "
            "Please check your CSV and try again."
        )

    return (
        f"Dataset validated and normalised successfully. "
        f"Shape: {df.shape}. "
        f"Columns mapped: {list(df.columns)}"
    )


def clean_and_preprocess_data() -> str:
    """
    Tool 2:
    Clean the raw retail sales dataset and save clean_data.csv.
    """

    if not RAW_DATA_PATH.exists():
        raise FileNotFoundError(f"Dataset not found at: {RAW_DATA_PATH}")

    df = pd.read_csv(RAW_DATA_PATH)

    # Remove duplicate rows
    df = df.drop_duplicates()

    # Convert date column to datetime
    df["date"] = pd.to_datetime(df["date"], errors="coerce")

    # Convert numeric columns to numbers
    numeric_columns = ["price", "quantity", "discount", "sales"]

    for column in numeric_columns:
        df[column] = pd.to_numeric(df[column], errors="coerce")

    # Remove rows with invalid important values
    df = df.dropna(subset=["date", "price", "quantity", "discount", "sales"])

    # Fill missing text values (add column with "Unknown" if not present)
    text_columns = [
        "order_id",
        "customer_id",
        "customer_segment",
        "product_id",
        "product_name",
        "category",
        "region",
        "payment_method",
    ]

    for column in text_columns:
        if column in df.columns:
            df[column] = df[column].fillna("Unknown")
        else:
            df[column] = "Unknown"

    # Normalise discount: if stored as percentage (e.g. 20 for 20%), convert to fraction
    if "discount" in df.columns and not df["discount"].empty and df["discount"].max() > 1:
        df["discount"] = df["discount"] / 100

    # Business rules
    df = df[df["price"] > 0]
    df = df[df["quantity"] > 0]
    df = df[(df["discount"] >= 0) & (df["discount"] <= 1)]
    df = df[df["sales"] >= 0]

    # Save cleaned data
    CLEAN_DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(CLEAN_DATA_PATH, index=False)

    generate_value_translations()

    return f"Cleaned data saved successfully to {CLEAN_DATA_PATH}. Shape: {df.shape}"


def create_dataset_contract() -> str:
    """
    Tool 3:
    Create dataset_contract.json.
    This contract tells the Data Scientist Crew what rules and columns to follow.
    """

    if not CLEAN_DATA_PATH.exists():
        raise FileNotFoundError(
            f"Cleaned dataset not found at: {CLEAN_DATA_PATH}. "
            "Run clean_and_preprocess_data() first."
        )

    df = pd.read_csv(CLEAN_DATA_PATH)

    contract = {
        "dataset_name": "retail_sales",
        "target_column": "sales",
        "required_columns": REQUIRED_COLUMNS,
        "schema": {
            "order_id": "string",
            "date": "date",
            "customer_id": "string",
            "customer_segment": "category",
            "product_id": "string",
            "product_name": "category",
            "category": "category",
            "region": "category",
            "payment_method": "category",
            "price": "float",
            "quantity": "integer",
            "discount": "float",
            "sales": "float",
        },
        "allowed_values": {
            "customer_segment": sorted(df["customer_segment"].unique().tolist()),
            "category": sorted(df["category"].unique().tolist()),
            "region": sorted(df["region"].unique().tolist()),
            "payment_method": sorted(df["payment_method"].unique().tolist()),
        },
        "assumptions": [
            "Each row represents one retail transaction.",
            "The target column for prediction is sales.",
            "Sales is calculated using price, quantity, and discount.",
            "Rows with invalid dates, prices, quantities, discounts, or sales values are removed.",
        ],
        "constraints": {
            "price": "must be greater than 0",
            "quantity": "must be greater than 0",
            "discount": "must be between 0 and 1",
            "sales": "must be greater than or equal to 0",
        },
    }

    CONTRACT_PATH.parent.mkdir(parents=True, exist_ok=True)

    with open(CONTRACT_PATH, "w", encoding="utf-8") as file:
        json.dump(contract, file, indent=4)

    return f"Dataset contract saved successfully to {CONTRACT_PATH}"


def generate_eda_report_and_insights() -> str:
    """
    Tool 4:
    Generate EDA charts, eda_report.html, and insights.md.
    Uses matplotlib only to avoid CrewAI/seaborn warning conflicts.
    """

    if not CLEAN_DATA_PATH.exists():
        raise FileNotFoundError(
            f"Cleaned dataset not found at: {CLEAN_DATA_PATH}. "
            "Run clean_and_preprocess_data() first."
        )

    df = pd.read_csv(CLEAN_DATA_PATH)
    df["date"] = pd.to_datetime(df["date"], errors="coerce")

    ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)
    FIGURES_DIR.mkdir(parents=True, exist_ok=True)

    # Chart 1: Sales by category
    category_sales = df.groupby("category")["sales"].sum().sort_values(ascending=False)

    plt.figure(figsize=(8, 5))
    plt.bar(category_sales.index, category_sales.values)
    plt.title("Total Sales by Category")
    plt.xlabel("Category")
    plt.ylabel("Total Sales")
    plt.tight_layout()
    category_chart_path = FIGURES_DIR / "sales_by_category.png"
    plt.savefig(category_chart_path)
    plt.close()

    # Chart 2: Sales by region
    region_sales = df.groupby("region")["sales"].sum().sort_values(ascending=False)

    plt.figure(figsize=(8, 5))
    plt.bar(region_sales.index, region_sales.values)
    plt.title("Total Sales by Region")
    plt.xlabel("Region")
    plt.ylabel("Total Sales")
    plt.tight_layout()
    region_chart_path = FIGURES_DIR / "sales_by_region.png"
    plt.savefig(region_chart_path)
    plt.close()

    # Chart 3: Monthly sales trend
    df["month"] = df["date"].dt.to_period("M").astype(str)
    monthly_sales = df.groupby("month")["sales"].sum().sort_index()

    plt.figure(figsize=(10, 5))
    plt.plot(monthly_sales.index, monthly_sales.values, marker="o")
    plt.title("Monthly Sales Trend")
    plt.xlabel("Month")
    plt.ylabel("Total Sales")
    plt.xticks(rotation=45)
    plt.tight_layout()
    monthly_chart_path = FIGURES_DIR / "monthly_sales.png"
    plt.savefig(monthly_chart_path)
    plt.close()

    total_orders = len(df)
    total_sales = round(df["sales"].sum(), 2)
    average_order_value = round(df["sales"].mean(), 2)

    best_category = category_sales.index[0]
    best_region = region_sales.index[0]
    best_product = df.groupby("product_name")["sales"].sum().idxmax()

    insights_text = f"""
# Retail Sales Business Insights

## Dataset Summary
- Total orders: {total_orders}
- Total sales: {total_sales}
- Average order value: {average_order_value}

## Key Business Insights
- Best performing category: {best_category}
- Best performing region: {best_region}
- Best performing product: {best_product}

## Business Interpretation
The Data Analyst Crew found that sales performance differs by category, region, and product.
The strongest category and region should be prioritized in future business strategy.
Lower-performing regions should be investigated to understand whether the issue is pricing, demand, marketing, or product availability.
"""

    INSIGHTS_PATH.write_text(insights_text, encoding="utf-8")

    html_report = f"""
<html>
<head>
    <title>Retail Sales EDA Report</title>
</head>
<body>
    <h1>Retail Sales EDA Report</h1>

    <h2>Dataset Overview</h2>
    <p>Total orders: {total_orders}</p>
    <p>Total sales: {total_sales}</p>
    <p>Average order value: {average_order_value}</p>

    <h2>Sales by Category</h2>
    <img src="figures/sales_by_category.png" width="700">

    <h2>Sales by Region</h2>
    <img src="figures/sales_by_region.png" width="700">

    <h2>Monthly Sales Trend</h2>
    <img src="figures/monthly_sales.png" width="700">

    <h2>Business Summary</h2>
    <p>Best performing category: {best_category}</p>
    <p>Best performing region: {best_region}</p>
    <p>Best performing product: {best_product}</p>
</body>
</html>
"""

    EDA_REPORT_PATH.write_text(html_report, encoding="utf-8")

    return (
        f"EDA report saved successfully to {EDA_REPORT_PATH}. "
        f"Insights saved successfully to {INSIGHTS_PATH}."
    )
