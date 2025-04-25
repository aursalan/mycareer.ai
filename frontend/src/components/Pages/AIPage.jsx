import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getOrCreateUserId } from "../../utils/userService";

function AIPage() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Initialize user ID when component mounts
    const initializeUserId = async () => {
      try {
        const id = await getOrCreateUserId();
        setUserId(id);
        
        // Update URL with userId if it's not already there
        const queryParams = new URLSearchParams(location.search);
        if (!queryParams.get("userId")) {
          navigate(`?userId=${id}`, { replace: true });
        }
      } catch (error) {
        console.error("Failed to initialize user ID:", error);
        alert("Failed to initialize user session. Please refresh the page.");
      }
    };

    initializeUserId();
  }, [navigate, location.search]);

  const handleSave = async () => {
    if (!userId) {
      alert("User session is not ready. Please wait...");
      return;
    }

    if (!inputText.trim()) {
      alert("Please enter some text before saving.");
      return;
    }

    setLoading(true);
    try {
      // Save input text to MongoDB collection "User_Responses"
      const saveResponse = await fetch("http://localhost:5000/api/saveUserResponse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, text: inputText }),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save user response.");
      }

      // Fetch recommendations after analysis
      const fetchResponse = await fetch(`http://localhost:5000/api/getRecommendations/${userId}`);
      const data = await fetchResponse.json();

      if (fetchResponse.ok) {
        console.log("✅ Recommendations received:", data);
        navigate(`/trpage?userId=${userId}`, { state: { recommendations: data } });
      } else {
        console.error("❌ Error fetching AI recommendations:", data.error);
        alert("Failed to fetch recommendations.");
      }
    } catch (error) {
      console.error("❌ API Error:", error);
      alert("Error connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-container p-40 flex flex-col items-center justify-center min-h-screen text-black">
      <div>
        <textarea
          className="ai-textarea resize-none border border-gray-300 rounded-xl p-4 w-[800px] h-[400px] text-lg
             bg-white/10 backdrop-blur-lg text-black placeholder-black 
             shadow-lg transition-all duration-300 ease-in-out 
             focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
          rows="15"
          placeholder="Tell about yourself in 50 words..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={!userId} // Disable if userId not ready
        />
      </div>
      <div>
        <button 
          className="ai-button" 
          onClick={handleSave} 
          disabled={loading || !userId}
        >
          {!userId ? "Initializing..." : 
           loading ? "Saving..." : "Get Recommendations"}
        </button>
      </div>
    </div>
  );
}

export default AIPage;