FROM python:3.11-slim

WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend app
COPY app.py .

# Copy model artifacts from parent context
COPY model.pkl .
COPY scaler.pkl .
COPY metrics.json .

# Expose port 7860 (required by Hugging Face Spaces)
EXPOSE 7860

# Run with gunicorn on port 7860
CMD ["gunicorn", "--bind", "0.0.0.0:7860", "--workers", "1", "--timeout", "120", "app:app"]
