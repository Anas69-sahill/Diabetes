import React, { useEffect, useState } from 'react';

const Overview = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    // Fetch metrics from Flask API
    fetch(`${API_URL}/api/metrics`)
      .then(res => res.json())
      .then(data => setMetrics(data))
      .catch(err => console.error("Failed to fetch metrics:", err));
  }, []);

  return (
    <div className="card glass">
      <h1 className="title">Diabetes Prediction Platform</h1>
      <p className="subtitle">
        This platform leverages a Random Forest classifier trained on the Pima Indians Diabetes Dataset 
        to predict the likelihood of diabetes based on diagnostic measurements.
      </p>
      
      <div className="metric-grid">
        <div className="metric-card">
          <div className="metric-value">
            {metrics ? `${(metrics.accuracy * 100).toFixed(1)}%` : '...'}
          </div>
          <div className="metric-label">Test Accuracy</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">
            {metrics ? `${(metrics.f1 * 100).toFixed(1)}%` : '...'}
          </div>
          <div className="metric-label">F1 Score</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">
            {metrics ? `${(metrics.roc_auc * 100).toFixed(1)}%` : '...'}
          </div>
          <div className="metric-label">ROC-AUC</div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
