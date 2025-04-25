import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GS = () => {
  const [userId, setUserId] = useState(sessionStorage.getItem("userId") || null);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId && pendingNavigation) {
      navigate(`${pendingNavigation}?userId=${userId}`);
      setPendingNavigation(null); // Reset pending navigation
    }
  }, [userId, pendingNavigation, navigate]);

  const handleNavigation = async (path) => {
    if (!userId) {
      try {
        const response = await fetch("http://localhost:5000/api/createUser", { method: "POST" });
        const data = await response.json();
        const newUserId = data.userId;
        setUserId(newUserId);
        sessionStorage.setItem("userId", newUserId);
        setPendingNavigation(path); // Store the desired path
      } catch (error) {
        console.error("❌ Error generating user ID:", error);
      }
    } else {
      navigate(`${path}?userId=${userId}`);
    }
  };

  return (
    <section 
      data-scroll data-scroll-section data-scroll-speed="0"
      className="light font-['Neue_Montreal'] tracking-tight text-white py-40 rounded-tl-3xl rounded-tr-3xl -mt-80"
      style={{ background: "#0A66C2", backgroundSize: "cover" }}
    >
      <div className="container px-4 text-center">
        <h2 className="text-6xl leading-none mb-12 uppercase font-bold">
          Your future awaits Get on board
        </h2>

        <div className="items-center -mt-10 mb-20">
          <button 
            onClick={() => handleNavigation("/aipage")} 
            className="uppercase gap-10 mx-2 px-7 py-2 border border-[#0E71D3] hover:bg-[#0E71D3] mt-10 rounded-full"
          >
            Without Questions
          </button>

          <button 
            onClick={() => handleNavigation("/ptpage")} 
            className="uppercase gap-10 mx-2 px-7 py-2 border-[1px] border-[#0E71D3] hover:bg-[#0E71D3] mt-10 rounded-full"
          >
            With Questions
          </button>
        </div>
      </div>
    </section>
  );
};

export default GS;
