
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
- MAE: 147.1736
- RMSE: 297.4076
- R2 Score: 0.5946

### Random Forest Regressor
- MAE: 123.9002
- RMSE: 296.2112
- R2 Score: 0.5979

## Selected Model
The selected model is:

**Random Forest Regressor**

It was selected because it had the lowest RMSE among the compared models.

## Best Model Metrics
- MAE: 123.9002
- RMSE: 296.2112
- R2 Score: 0.5979

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
