import React from 'react';

const About = () => {
  return (
    <div className="card glass" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem' }}>
        <img 
          src="/profile.jpeg" 
          alt="Anas Nawaz" 
          style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--primary-color)' }}
        />
        <div>
          <h1 className="title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Anas Nawaz</h1>
          <p style={{ color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: '500' }}>Machine Learning Engineer & Data Scientist</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <span>📧 Email / Contact Info</span>
            <span>📍 Location</span>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.2rem', borderBottom: '2px solid var(--primary-color)', display: 'inline-block', paddingBottom: '0.2rem' }}>
          Summary
        </h3>
        <p className="subtitle">
          Passionate Machine Learning Engineer with expertise in developing predictive models, analyzing complex datasets, and building full-stack AI applications. Demonstrated ability in translating data into actionable insights and deploying models into production environments.
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.2rem', borderBottom: '2px solid var(--primary-color)', display: 'inline-block', paddingBottom: '0.2rem' }}>
          Technical Skills
        </h3>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '1.2rem' }}>
          <li><strong>Languages:</strong> Python, JavaScript, SQL</li>
          <li><strong>Machine Learning:</strong> Scikit-Learn, TensorFlow, PyTorch, Pandas, NumPy</li>
          <li><strong>Web Technologies:</strong> React, Flask, Node.js, HTML/CSS</li>
          <li><strong>Tools:</strong> Git, Docker, Jupyter</li>
        </ul>
      </div>

      <div>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.2rem', borderBottom: '2px solid var(--primary-color)', display: 'inline-block', paddingBottom: '0.2rem' }}>
          Projects
        </h3>
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
          <h4 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>Diabetes Prediction Platform</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Developed a comprehensive machine learning pipeline using Random Forest to predict diabetes based on patient metrics. Built a full-stack web application using React and Flask to deploy the model, providing an intuitive interface for real-time predictions and model analysis.
          </p>
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', fontStyle: 'italic' }}>
        Note: Resume details have been populated with placeholder structure as Python was unavailable to parse the provided PDF. Please update this page with exact details from the PDF.
      </div>
    </div>
  );
};

export default About;
