from flask import Flask, request, jsonify, render_template
import pandas as pd
import joblib
from sklearn.metrics.pairwise import cosine_similarity
import pickle

app = Flask(__name__)

# Load the model and data for job recommendations
with open(r'C:\Users\Administrator\Desktop\sih24\model.pkl', 'rb') as f:
    tfidf, data = pickle.load(f)
tfidf_matrix = tfidf.transform(data["Key Skills"].tolist())

# Load the model and vectorizer for skills prediction using joblib with memory mapping
rf_model = joblib.load(r'C:\Users\Administrator\Desktop\sih24\model2.joblib', mmap_mode='r')
vectorizer = joblib.load(r'C:\Users\Administrator\Desktop\sih24\vectorizer.joblib', mmap_mode='r')

@app.route('/')
def home():
    return render_template('chatbot.html')

@app.route('/predict', methods=['POST'])
def predict():
    user_input = request.json['skills']
    user_tfidf = tfidf.transform([user_input])
    user_similarity = cosine_similarity(user_tfidf, tfidf_matrix)
    similar_jobs = user_similarity.argsort()[0][-5:][::-1]  # Top 5 jobs
    recommended_jobs = data['Job Title'].iloc[similar_jobs].tolist()
    return jsonify({"type": "jobs", "results": recommended_jobs})

@app.route('/predict_skills', methods=['POST'])
def predict_skills():
    target_job = request.json['job']
    target_job_vec = vectorizer.transform([target_job])
    predicted_skills = rf_model.predict(target_job_vec)
    return jsonify({"type": "skills", "results": predicted_skills.tolist()})

if __name__ == '__main__':
    app.run(port=5001)
    app.run(debug=True)
