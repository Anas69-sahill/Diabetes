# Diabetes Prediction Project

## Overview
This project contains the complete solution for the Diabetes Prediction task, including a Machine Learning Notebook and a Full-Stack React + Flask Web Application.

## Deliverable 1: Machine Learning Model
The main deliverable is `diabetes_prediction.ipynb`, which contains the full EDA, preprocessing, cross-validated Random Forest training, and evaluation. 
We have also included `train_model.py` which you can run to easily generate the `model.pkl`, `scaler.pkl`, and `metrics.json` files required by the backend.

**To run the ML script (Make sure Python is installed):**
```bash
pip install pandas numpy scikit-learn
python train_model.py
```

## Deliverable 2: Web Application

### Backend (Flask)
The backend serves the trained model via a REST API.
1. Navigate to the `backend` folder: `cd backend`
2. Install requirements: `pip install -r requirements.txt`
3. Run the server: `python app.py`
The backend will run on `http://localhost:5000`.

### Frontend (React)
The frontend is a modern, premium web app built with React (Vite).
1. Ensure Node.js is installed.
2. Navigate to the `frontend` folder: `cd frontend`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
The frontend will run on `http://localhost:5173` (or the port specified by Vite).

### Note on Developer Profile
The About page has been set up with the provided profile image and a beautifully styled placeholder for Anas Nawaz's profile. You can fine-tune the exact textual content in `frontend/src/pages/About.jsx` using the details from your PDF resume.
