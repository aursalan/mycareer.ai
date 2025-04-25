import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CIPage = ({ onNext }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId"); // Extract userId from URL

  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const questionsPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:5000/api/riasec-questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("❌ Error fetching questions:", error));
  }, []);

  const handleResponseChange = (index, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [index]: value,
    }));
  };

  const isCurrentPageAnswered = () => {
    return currentQuestions.every((_, index) => responses[startIndex + index] !== undefined);
  };

  const allQuestionsAnswered = () => {
    return questions.every((_, index) => responses[index] !== undefined);
  };

  const calculateRiasecScores = () => {
    const scores = { Realistic: 0, Investigative: 0, Artistic: 0, Social: 0, Enterprising: 0, Conventional: 0 };
    const traitMap = { R: "Realistic", I: "Investigative", A: "Artistic", S: "Social", E: "Enterprising", C: "Conventional" };

    questions.forEach((question, index) => {
      const traitKey = traitMap[question.Trait];
      scores[traitKey] += responses[index] || 0;
    });
    return scores;
  };

  const handleSubmit = async () => {
    if (!allQuestionsAnswered()) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setShowPopup(true);
  };

  const confirmSubmission = async () => {
    const finalScores = { ...calculateRiasecScores(), userId }; // Include userId
    console.log("📤 Submitting RIASEC Scores:", finalScores);
    try {
      const response = await fetch("http://localhost:5000/api/storeResponses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalScores),
      });
      const data = await response.json();
      console.log("📥 Server Response:", data);
      if (response.ok) {
        alert("Submission successful! Moving to the next section.");
        if (onNext) onNext(finalScores);
        
        // Navigate to next page with userId
        if (userId) {
          navigate(`/epage?userId=${userId}`);
        } else {
          console.error("❌ Error: userId is missing, navigation aborted.");
          alert("Error: User ID not found. Please try again.");
        }
      } else {
        console.error("❌ Server error:", data.error);
      }
    } catch (error) {
      console.error("❌ API Error:", error);
    }
  };

  const labels = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  return (
    <div className="max-w-[800px] mx-auto p-5 font-['Neue_Montreal'] text-black pt-20">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 text-center">Career Interest Test</h2>
      
      {/* Questions container */}
      <div className="mb-24"> {/* Extra space for fixed navigation */}
        {currentQuestions.length > 0 ? (
          <div className="grid gap-4">
            {currentQuestions.map((question, i) => (
              <div 
                key={startIndex + i} 
                className="p-5 bg-gray-50 rounded-3xl shadow-sm"
              >
                <p className="font-medium mb-4 text-lg">{question.Question}</p>
                <div className="flex flex-wrap justify-between gap-2">
                  {labels.map((label, j) => (
                    <label 
                      key={j}
                      className={`
                        flex items-center justify-center p-2 rounded-full border cursor-pointer
                        min-w-[100px] transition-all
                        ${responses[startIndex + i] === j + 1 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 hover:bg-gray-100'}
                      `}
                    >
                      <input
                        type="radio"
                        name={`question-${startIndex + i}`}
                        value={j + 1}
                        checked={responses[startIndex + i] === j + 1}
                        onChange={() => handleResponseChange(startIndex + i, j + 1)}
                        className="mr-2"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading questions...</p>
        )}
      </div>
  
      {/* Fixed navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white py-3 border-t shadow-lg">
        <div className="max-w-[800px] mx-auto flex justify-center items-center gap-5 px-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`
              px-5 py-2 rounded-full border transition-colors
              ${currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'}
            `}
          >
            Previous
          </button>
          
          <span className="text-gray-600 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          
          {currentPage < totalPages ? (
            <button
              onClick={() => {
                if (isCurrentPageAnswered()) {
                  setCurrentPage(prev => prev + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  alert("Please answer all questions on this page before proceeding.");
                }
              }}
              className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              Submit
            </button>
          )}
        </div>
      </div>
  
      {/* Submission confirmation modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-3xl text-center max-w-sm">
            <p className="text-lg mb-5">
              Are you sure you want to submit? This action cannot be reversed.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setShowPopup(false)} 
                className="px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmSubmission} 
                className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CIPage;
