from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import json
import os

app = Flask(__name__)
CORS(app)

# Load model and scaler
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, 'model.pkl')
SCALER_PATH = os.path.join(BASE_DIR, 'scaler.pkl')
METRICS_PATH = os.path.join(BASE_DIR, 'metrics.json')

model = None
scaler = None

try:
    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)
    with open(SCALER_PATH, 'rb') as f:
        scaler = pickle.load(f)
except Exception as e:
    print(f"Error loading models. Have you trained them yet? {e}")

@app.route('/api/predict', methods=['POST'])
def predict():
    if not model or not scaler:
        return jsonify({"error": "Model not loaded"}), 500
        
    data = request.json
    try:
        # Expected features in order:
        # Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age
        features = [
            float(data.get('Pregnancies', 0)),
            float(data.get('Glucose', 0)),
            float(data.get('BloodPressure', 0)),
            float(data.get('SkinThickness', 0)),
            float(data.get('Insulin', 0)),
            float(data.get('BMI', 0)),
            float(data.get('DiabetesPedigreeFunction', 0)),
            float(data.get('Age', 0))
        ]
        
        # Scale features
        features_scaled = scaler.transform([features])
        
        # Predict
        prediction = model.predict(features_scaled)[0]
        probability = model.predict_proba(features_scaled)[0][1]
        
        result = "Diabetic" if prediction == 1 else "Not Diabetic"
        
        return jsonify({
            "prediction": result,
            "confidence": f"{probability:.2%}" if prediction == 1 else f"{(1 - probability):.2%}"
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    try:
        with open(METRICS_PATH, 'r') as f:
            metrics = json.load(f)
        return jsonify(metrics)
    except Exception as e:
        # Return mock metrics if not trained yet
        return jsonify({
            "accuracy": 0.78,
            "f1": 0.75,
            "roc_auc": 0.82,
            "error": "Metrics file not found. Returning mock data. Please train the model."
        })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 7860))
    app.run(debug=False, host='0.0.0.0', port=port)
