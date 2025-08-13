import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient
from flask import Flask, request, jsonify

# Import mapping functions
from mapping_ocean_to_dataset import map_ocean_score
from mapping_riasec_to_dataset import map_score

app = Flask(__name__)

# ✅ Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["Major_Project"]
user_collection = db["User_Responses"]
career_collection = db["CBF"]
recommendation_collection = db["User_Recommendations"]

# ✅ Load dataset
df = pd.DataFrame(list(career_collection.find({}, {"_id": 0})))

# ✅ Define feature groups
riasec_features = ["Artistic", "Conventional", "Enterprising", "Investigative", "Realistic", "Social"]
ocean_features = ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"]
education_features = ["Less than a High School Diploma", "High School Diploma", "Post-Secondary Certificate - Award", "Some College Courses", "Associate's Degree (or other 2-year degree)", "Bachelor's Degree", "Post-Baccalaureate Certificate - Award", "Master's Degree", "Post-Master's Certificate - Award", "First Professional Degree - Award", "Doctoral Degree", "Post-Doctoral Training"
]

# ✅ Apply MinMax Scaling separately to each group
scaler_riasec = MinMaxScaler(feature_range=(0, 1))
scaler_ocean = MinMaxScaler(feature_range=(0, 1))
scaler_education = MinMaxScaler(feature_range=(0, 1))

df[riasec_features] = scaler_riasec.fit_transform(df[riasec_features])
df[ocean_features] = scaler_ocean.fit_transform(df[ocean_features])
df[education_features] = scaler_education.fit_transform(df[education_features])

# ✅ Min & max values for mapping functions
ocean_min_max = {
    "Openness": (0.0506, 0.2409),
    "Conscientiousness": (0.0761, 0.1819),
    "Extraversion": (0.0851, 0.2348),
    "Agreeableness": (0.0109, 0.0679),
    "Neuroticism": (-0.1291, -0.0719)
}

riasec_min_max = {
    "Realistic": (1.00, 7.00),
    "Investigative": (1.00, 7.00),
    "Artistic": (1.00, 7.00),
    "Social": (1.00, 7.00),
    "Enterprising": (1.00, 7.00),
    "Conventional": (1.66, 7.00)
}

@app.route("/compute-recommendations", methods=["POST"])
def compute_recommendations():
    try:
        data = request.json
        userId = data.get("userId")

        # ✅ Fetch user data from MongoDB
        user_data = user_collection.find_one({"userId": userId}, {"_id": 0})
        if not user_data:
            return jsonify({"error": "User not found"}), 404

        # ✅ Extract user scores
        raw_ocean_scores = {trait: user_data[trait] for trait in ocean_features}
        raw_riasec_scores = {trait: user_data[trait] for trait in riasec_features}
        education_category = user_data.get("educationCategory", "")
        # matching_type = user_data.get("matchingType", "Soft Matching")

        # ✅ Map raw scores to dataset ranges
        mapped_ocean = {trait: map_ocean_score(raw_ocean_scores[trait], *ocean_min_max[trait]) for trait in ocean_features}
        mapped_riasec = {trait: map_score(raw_riasec_scores[trait], *riasec_min_max[trait], 5, 25) for trait in riasec_features}

        # ✅ Convert user input to DataFrame for scaling
        user_df = pd.DataFrame([{**mapped_ocean, **mapped_riasec}])

        # Normalize user input using the same scalers
        # Use mapped values directly (avoid double scaling)
        user_df[riasec_features] = np.round(pd.DataFrame([mapped_riasec]), decimals=6)
        user_df[ocean_features] = np.round(pd.DataFrame([mapped_ocean]), decimals=6)

        

        # ✅ Fix education category selection (only set the chosen category to 1)
        education_result = {edu: 0 for edu in education_features}
        if education_category in education_result:
            education_result[education_category] = 1

        user_education_df = pd.DataFrame([education_result])

        # ✅ Compute Cosine Similarity for RIASEC & OCEAN
        similarity_riasec = cosine_similarity(user_df[riasec_features], df[riasec_features])[0]
        similarity_ocean = cosine_similarity(user_df[ocean_features], df[ocean_features])[0]
        similarity_education = cosine_similarity(user_education_df, df[education_features])[0]

        # ✅ Weighted Similarity Calculation
        df["final_similarity"] = (0.6 * similarity_riasec) + (0.3 * similarity_ocean) + (0.1 * similarity_education)

        # ✅ Get Top 5 Recommendations
        top_recommendations = df.nlargest(6, "final_similarity")[["Occupation Title", "Career Pathway", "Career Cluster", "final_similarity"]]

        # ✅ Store recommendations back in MongoDB
        recommendation_collection.update_one(
            {"userId": userId},
            {"$set": {"recommendations": top_recommendations.to_dict(orient="records")}},
            upsert=True
        )

        return jsonify({"message": "Recommendations computed successfully!", "recommendations": top_recommendations.to_dict(orient="records")})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
