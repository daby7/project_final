
# Model Evaluation Report

## Goal
Predict retail transaction sales using the cleaned and engineered dataset.

## Dataset Split
- Training rows: 48
- Testing rows: 12
- Target column: sales

## Model Comparison

### Linear Regression
- MAE: 147.1736
- RMSE: 297.4076
- R2 Score: 0.5946

### Random Forest Regressor
- MAE: 123.9002
- RMSE: 296.2112
- R2 Score: 0.5979

## Best Model
The best model is **Random Forest Regressor** because it achieved the lowest RMSE.

## Saved Artifacts
- Best model: `artifacts/model.joblib`
- Metrics JSON: `artifacts/model_metrics.json`
- Features file: `data/processed/features.csv`
