from flask import Flask, request, jsonify, render_template
import pandas as pd
import pickle
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Load the vectorizer and data from the pickle file
with open(r'C:\Users\Administrator\Desktop\sih24\model.pkl', 'rb') as f:
    tfidf, data = pickle.load(f)

# Transform the data features to create the TF-IDF matrix
tfidf_matrix = tfidf.transform(data["Key Skills"].tolist())

@app.route('/')
def home():
    return render_template('index.html')  # Ensure you have this HTML file in the templates folder

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input from the AJAX request
        user_input = request.json['skills']  # Expecting JSON input
        start_index = request.json.get('start_index', 0)  # Pagination start index

        # Transform user input using the loaded vectorizer
        user_tfidf = tfidf.transform([user_input])
        
        # Calculate cosine similarity between user input and all jobs
        user_similarity = cosine_similarity(user_tfidf, tfidf_matrix)
        
        # Sort all jobs by similarity scores
        all_jobs_sorted = user_similarity[0].argsort()[::-1]  # Sort all jobs by descending similarity
        
        # Pagination
        page_size = 10
        paginated_jobs = all_jobs_sorted[start_index:start_index + page_size]

        # Retrieve job details for the current page
        recommended_jobs = data[['Job Title', 'Job Experience Required', 'Job Salary', 'Functional Area', 'Industry']].iloc[paginated_jobs].to_dict(orient='records')
        
        # Check if there are more jobs available
        more_jobs_available = len(paginated_jobs) == page_size

        # Return the results as JSON along with whether there are more jobs to show
        return jsonify({'jobs': recommended_jobs, 'more_jobs_available': more_jobs_available})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
    app.run(debug=True)
