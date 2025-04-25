import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId"); // ✅ Extract userId from URL

  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const educationLevels = [
    "Less than a High School Diploma",
    "High School Diploma",
    "Post-Secondary Certificate - Award",
    "Some College Courses",
    "Associate's Degree (or other 2-year degree)",
    "Bachelor's Degree",
    "Post-Baccalaureate Certificate - Award",
    "Master's Degree",
    "Post-Master's Certificate - Award",
    "First Professional Degree - Award",
    "Doctoral Degree",
    "Post-Doctoral Training",
  ];

  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/getEducationCategory/${userId}`);
        const data = await response.json();
        if (data.educationCategory) {
          setSelectedCategory(data.educationCategory);
          setIsSubmitted(true);
        }
      } catch (error) {
        console.error("❌ Error fetching education category:", error);
      }
    };

    if (userId) {
      fetchEducationData();
    }
  }, [userId]);

  const handleSave = async () => {
    if (!userId) {
      alert("❌ User ID not found. Try refreshing the page.");
      return;
    }

    if (!selectedCategory) {
      alert("❌ Please select an education level before saving.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/storeResponses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, educationCategory: selectedCategory }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Education category saved!");
        setIsSubmitted(true);
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error("❌ Error saving education category:", error);
    }
  };

  const handleGetRecommendations = async () => {
    if (!userId) {
      alert("❌ User ID not found. Try refreshing the page.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/getRecommendations/${userId}`);
      const data = await response.json();

      if (response.ok) {
        console.log("✅ Recommendations received:", data);
        // Navigate to the recommendation page with userId
        navigate(`/trpage?userId=${userId}`, { state: { recommendations: data } });
      } else {
        alert(`❌ Error fetching recommendations: ${data.error}`);
      }
    } catch (error) {
      console.error("❌ Error getting recommendations:", error);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto p-6 font-['Neue_Montreal'] text-black pt-20">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-8 text-center">Select Your Education Level</h2>
  
      {!isSubmitted ? (
        <div className="space-y-6">
          {/* Education Level Dropdown */}
          <select
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Select Education Level --</option>
            {educationLevels.map((level, index) => (
              <option key={index} value={level} className="p-2">
                {level}
              </option>
            ))}
          </select>
  
          {/* Save Button */}
          <button 
            className={`w-full py-3 px-4 rounded-xl font-medium transition-colors ${
              selectedCategory 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleSave}
            disabled={!selectedCategory}
          >
            Save Education
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-6 text-lg">Selected: <span className="font-semibold">{selectedCategory}</span></p>
          <button
            className="w-full max-w-[300px] mx-auto py-3 px-4 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
            onClick={handleGetRecommendations}
          >
            Get Recommendations
          </button>
        </div>
      )}
    </div>
  );
};

export default EPage;
