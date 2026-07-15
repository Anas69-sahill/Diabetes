import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix
import pickle
import json

def train_and_save():
    # Load dataset
    df = pd.read_csv('diabetes.csv')
    
    # Replace zeros with NaN in specific columns and then impute with median
    cols_with_zeros = ['Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI']
    df[cols_with_zeros] = df[cols_with_zeros].replace(0, np.nan)
    
    for col in cols_with_zeros:
        df[col].fillna(df[col].median(), inplace=True)
        
    X = df.drop('Outcome', axis=1)
    y = df['Outcome']
    
    # Train test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Grid search for RF to avoid overfitting
    param_grid = {
        'n_estimators': [50, 100],
        'max_depth': [3, 5, 7],
        'min_samples_split': [5, 10],
        'min_samples_leaf': [3, 5]
    }
    
    rf = RandomForestClassifier(random_state=42)
    grid_search = GridSearchCV(rf, param_grid, cv=5, scoring='accuracy')
    grid_search.fit(X_train_scaled, y_train)
    
    best_model = grid_search.best_estimator_
    
    # Predict
    y_train_pred = best_model.predict(X_train_scaled)
    y_test_pred = best_model.predict(X_test_scaled)
    y_test_proba = best_model.predict_proba(X_test_scaled)[:, 1]
    
    train_acc = accuracy_score(y_train, y_train_pred)
    test_acc = accuracy_score(y_test, y_test_pred)
    gap = train_acc - test_acc
    
    print(f"Train Accuracy: {train_acc:.4f}")
    print(f"Test Accuracy: {test_acc:.4f}")
    print(f"Gap: {gap:.4f}")
    
    # Metrics
    metrics = {
        "accuracy": float(test_acc),
        "precision": float(precision_score(y_test, y_test_pred)),
        "recall": float(recall_score(y_test, y_test_pred)),
        "f1": float(f1_score(y_test, y_test_pred)),
        "roc_auc": float(roc_auc_score(y_test, y_test_proba)),
        "confusion_matrix": confusion_matrix(y_test, y_test_pred).tolist(),
        "train_accuracy": float(train_acc)
    }
    
    with open('metrics.json', 'w') as f:
        json.dump(metrics, f)
        
    print(f"Metrics saved: {metrics}")
    
    # Save model and scaler
    with open('model.pkl', 'wb') as f:
        pickle.dump(best_model, f)
        
    with open('scaler.pkl', 'wb') as f:
        pickle.dump(scaler, f)
        
    print("Model and scaler saved.")

if __name__ == "__main__":
    train_and_save()
