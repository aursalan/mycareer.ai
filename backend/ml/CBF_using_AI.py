from flask import Flask, request, jsonify
from pymongo import MongoClient
import numpy as np
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from sklearn.decomposition import PCA
from nltk.corpus import wordnet

app = Flask(__name__)

# MongoDB Connection
client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["Major_Project"]
user_responses_collection = db["User_Responses"]
recommendations_collection = db["User_Recommendations"]
occupations_collection = db["CBF_using_AI"]

# Load NLP models
nlp = spacy.load("en_core_web_sm")
model = SentenceTransformer('all-MiniLM-L6-v2')
pca = None  # For PCA reduction
vectorizer = TfidfVectorizer(max_features=50000, ngram_range=(1,5), stop_words='english', sublinear_tf=True, smooth_idf=True)

def preprocess_text(text):
    doc = nlp(text.lower())
    tokens = [token.lemma_ for token in doc if not token.is_stop and token.is_alpha]
    return " ".join(tokens)

def load_data():
    occupations = list(occupations_collection.find({}, {"_id": 0}))
    for occupation in occupations:
        full_text = " ".join([
            occupation.get("Description", ""),
            occupation.get("Top Interests", ""),
            occupation.get("Key Skills", ""),
            occupation.get("Critical Abilities", ""),
            occupation.get("Essential Knowledge", ""),
            occupation.get("On-Site or In-Plant Training", ""),
            occupation.get("On-the-Job Training", ""),
            occupation.get("Related Work Experience", ""),
            occupation.get("Required Level of Education", "")
        ])
        occupation['Processed_Text'] = preprocess_text(full_text)
    return occupations

data = load_data()
job_texts = [item["Processed_Text"] for item in data]
job_titles = [item["Title"] for item in data]
career_pathways = {item["Title"]: item["Career Pathway"] for item in data}
career_clusters = {item["Title"]: item.get("Career Cluster", "Unknown") for item in data}  # Added career clusters mapping
job_vectors = vectorizer.fit_transform(job_texts)

def compute_bert_embeddings(texts):
    global pca
    embeddings = np.array([model.encode(text, convert_to_tensor=True).cpu().numpy() for text in texts])
    if embeddings.shape[0] > 50 and embeddings.shape[1] > 384:
        pca = PCA(n_components=384)
        embeddings = pca.fit_transform(embeddings)
    return embeddings

job_embeddings = compute_bert_embeddings(job_texts)

def compute_tfidf_similarity(user_input):
    user_vector = vectorizer.transform([user_input])
    return cosine_similarity(user_vector, job_vectors).flatten()

def compute_bert_similarity(user_input):
    global pca
    user_embedding = model.encode(user_input, convert_to_tensor=True).cpu().numpy().reshape(1, -1)
    if pca is not None and user_embedding.shape[1] > 384:
        user_embedding = pca.transform(user_embedding)
    return cosine_similarity(user_embedding, job_embeddings).flatten()

def compute_recommendations(user_input):
    input_length = len(user_input.split())
    tfidf_weight = 0.8 if input_length > 10 else 0.65
    bert_weight = 1 - tfidf_weight
    
    tfidf_scores = compute_tfidf_similarity(user_input)
    bert_scores = compute_bert_similarity(user_input)
    
    tfidf_scores = (tfidf_scores - tfidf_scores.min()) / (tfidf_scores.max() - tfidf_scores.min()) if np.ptp(tfidf_scores) > 0 else tfidf_scores
    bert_scores = (bert_scores - bert_scores.min()) / (bert_scores.max() - bert_scores.min()) if np.ptp(bert_scores) > 0 else bert_scores
    
    final_scores = (tfidf_weight * tfidf_scores) + (bert_weight * bert_scores)
    recommendations = sorted(zip(job_titles, final_scores), key=lambda x: x[1], reverse=True)[:6]
    
    return [{
        "Occupation Title": title, 
        "Career Pathway": career_pathways.get(title, "Unknown"), 
        "Career Cluster": career_clusters.get(title, "Unknown"),  # Added career cluster
        "final_similarity": round(score, 4)
    } for title, score in recommendations]

@app.route("/analyze-response", methods=["POST"])
def analyze_response():
    data = request.json
    user_id = data.get("userId")
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    user_doc = user_responses_collection.find_one({"userId": user_id})
    if not user_doc:
        return jsonify({"error": "User response not found"}), 404
    
    user_text = preprocess_text(user_doc.get("text", ""))
    recommendations = compute_recommendations(user_text)
    
    recommendations_collection.update_one(
        {"userId": user_id},
        {"$set": {"recommendations": recommendations}},
        upsert=True
    )

    return jsonify({"message": "Recommendations computed successfully", "recommendations": recommendations})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)