import React, { useState } from 'react';

const Predict = () => {
  const [formData, setFormData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: '',
    DiabetesPedigreeFunction: '',
    Age: ''
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    
    // Basic validation
    for (const key in formData) {
      if (formData[key] === '') {
        setError(`Please fill in ${key}`);
        return;
      }
    }
    
    setIsSubmitting(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Prediction failed');
      }
    } catch (err) {
      setError('Cannot connect to the server. Is the Flask API running?');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card glass">
      <h2 className="title" style={{ fontSize: '2rem' }}>Run Prediction</h2>
      <p className="subtitle" style={{ marginBottom: '2rem' }}>
        Enter the diagnostic metrics below to predict the likelihood of diabetes.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="form-group">
          <label>Pregnancies</label>
          <input type="number" name="Pregnancies" value={formData.Pregnancies} onChange={handleChange} min="0" />
        </div>
        <div className="form-group">
          <label>Glucose</label>
          <input type="number" name="Glucose" value={formData.Glucose} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Blood Pressure</label>
          <input type="number" name="BloodPressure" value={formData.BloodPressure} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Skin Thickness</label>
          <input type="number" name="SkinThickness" value={formData.SkinThickness} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Insulin</label>
          <input type="number" name="Insulin" value={formData.Insulin} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>BMI</label>
          <input type="number" step="0.1" name="BMI" value={formData.BMI} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Diabetes Pedigree Function</label>
          <input type="number" step="0.001" name="DiabetesPedigreeFunction" value={formData.DiabetesPedigreeFunction} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="number" name="Age" value={formData.Age} onChange={handleChange} min="1" />
        </div>

        <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
          {error && (
            <div style={{ color: 'var(--danger-color)', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid var(--danger-color)' }}>
              {error}
            </div>
          )}

          {result && (
            <div style={{ 
              padding: '1.5rem', 
              background: result.prediction === 'Diabetic' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)', 
              border: `1px solid ${result.prediction === 'Diabetic' ? 'var(--danger-color)' : 'var(--accent-color)'}`,
              borderRadius: '8px', 
              marginBottom: '1.5rem',
              textAlign: 'center',
              animation: 'fadeIn 0.5s ease-out'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: result.prediction === 'Diabetic' ? '#fca5a5' : '#6ee7b7' }}>
                {result.prediction}
              </h3>
              <p>Confidence: {result.confidence}</p>
            </div>
          )}

          <button type="submit" className="btn" style={{ width: '100%' }} disabled={isSubmitting}>
            {isSubmitting ? 'Analyzing...' : 'Analyze Data'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Predict;
