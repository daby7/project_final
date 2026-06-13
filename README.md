# Retail AI Analytics Platform

An AI-powered web application that analyzes retail sales data, trains a machine learning model, and delivers interactive dashboards with sales predictions — all through a simple CSV upload.

---

## What It Does

1. **Upload** a retail sales CSV file
2. **AI Analysis** runs automatically (powered by CrewAI agents):
   - *Data Analyst Crew* — performs exploratory data analysis, generates insights and an EDA report
   - *Data Scientist Crew* — engineers features and trains a sales prediction model
3. **Dashboard** displays key sales metrics and charts based on your data
4. **Predict** future sales by entering product and order details
5. **Download Reports** — insights summary, model evaluation report, model card, and full EDA report
6. **AI Data Agent (Chatbot)** — ask natural-language questions about your uploaded dataset and get instant answers powered by OpenAI

---

## Who Is It For

| User | How they use it |
|------|----------------|
| Business Analysts | Upload sales data and instantly get visual insights — and ask follow-up questions in plain language |
| Retail Managers | Monitor sales performance, explore predictions, and query the AI chatbot for quick answers |
| Data Teams | Automate EDA and ML model training as a first-pass analysis pipeline |
| Students / Researchers | Experiment with AI-driven analytics and conversational data exploration on custom datasets |

---

## Tech Stack

- **Backend** — Python, Flask
- **AI Agents** — CrewAI (multi-agent workflow)
- **Machine Learning** — scikit-learn, pandas
- **Frontend** — HTML, CSS, JavaScript (vanilla)

---

## Requirements

- Python 3.11+
- An OpenAI API key (used by the CrewAI agents)

---

## Setup

**1. Clone the repository**
```bash
git clone <repo-url>
cd project_final
```

**2. Create a virtual environment and install dependencies**
```bash
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # macOS / Linux
pip install -r requirements.txt
```

**3. Configure environment variables**

Create a `.env` file in the project root:
```
OPENAI_API_KEY=your_openai_api_key_here
```

**4. Run the application**
```bash
python backend/app.py
```

Open your browser at `http://localhost:5000`

---

## Project Structure

```
project_final/
├── backend/                  # Flask API and services
│   ├── routes.py             # API endpoints
│   └── services/             # Dashboard, prediction, upload logic
├── crewai_workflow/          # AI agent pipeline
│   ├── crews/                # Analyst and Scientist crews
│   └── flow.py               # Multi-step CrewAI flow
├── frontend/                 # UI templates and static files
├── data/                     # Raw and processed data
├── artifacts/                # Generated reports and trained model
├── requirements.txt
└── .env                      # Your API keys (not committed to Git)
```

---

## CSV Format

Your CSV file should contain retail/sales transaction records. A sample file is available to download from the application's upload page.

---

## AI Chatbot (Data Agent)

After uploading a CSV, an AI-powered chatbot becomes available on the platform. It indexes your dataset in an OpenAI vector store and lets you ask questions about your data in plain language.

**Supported languages:** English, Arabic, العربية, Hebrew, עברית

**Example questions you can ask:**
- "What are the top 5 products by total sales?"
- "Which region generated the most revenue?"
- "How many orders were placed in the Electronics category?"
- "What is the average order value?"

**How it works:**
1. Your CSV is uploaded to OpenAI and indexed in a vector store immediately after upload
2. After AI analysis completes, the cleaned version of the data replaces the raw file in the index
3. Each message is checked against the dataset context — the agent stays focused on your data and will not answer off-topic questions

**Note:** The chatbot requires `OPENAI_API_KEY` to be set. It uses `gpt-4o-mini` by default (configurable via `OPENAI_MODEL_NAME` environment variable).

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload-csv` | Upload a sales CSV file |
| POST | `/api/run-analysis` | Trigger the full AI analysis workflow |
| GET | `/api/dashboard-data` | Fetch dashboard metrics |
| POST | `/api/predict` | Predict sales for given inputs |
| GET | `/api/reports` | List generated reports |
| GET | `/api/reports/<id>` | Download a specific report |
| POST | `/api/data-agent-chat` | Send a message to the AI Data Agent chatbot |
