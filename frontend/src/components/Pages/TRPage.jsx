import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const TRPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!userId) {
        setError("Error: User ID not found.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/getRecommendations/${userId}`);
        const data = await response.json();

        if (data && data.recommendations && Array.isArray(data.recommendations)) {
          setRecommendations(data.recommendations);
        } else {
          setError("No recommendations found.");
        }
      } catch (error) {
        setError("Failed to fetch recommendations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-['Neue_Montreal'] pt-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-black text-center">Your Career Recommendations</h1>

        {loading && <p className="text-gray-600">Loading recommendations...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && recommendations.length === 0 && (
          <p className="text-gray-600">No recommendations available.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {rec["Occupation Title"] || "Unknown Career"}
              </h2>
              
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-500">Cluster:</span>
                <p className="text-gray-700">{rec["Career Cluster"] || "N/A"}</p>
              </div>
              
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-500">Pathway:</span>
                <p className="text-gray-700">{rec["Career Pathway"] || "No pathway available"}</p>
              </div>
              
              <div className="mt-4 pt-2 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-500">Match Score:</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div 
                    className="bg-[#0A66C2] h-2.5 rounded-full" 
                    style={{ width: `${(rec["final_similarity"] * 100).toFixed(0)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {(rec["final_similarity"] * 100).toFixed(2)}% match
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TRPage;