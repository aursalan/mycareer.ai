// components/CTA2.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOrCreateUserId } from "../../utils/userService";

const CTA2 = () => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeUserSession = async () => {
      try {
        // Skip if already created in this session
        if (!sessionStorage.getItem("userId_created")) {
          const id = await getOrCreateUserId();
          setUserId(id);
        } else {
          setUserId(sessionStorage.getItem("userId"));
        }
      } catch (err) {
        setError("Failed to initialize session. Please refresh the page.");
        console.error("Session initialization error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUserSession();
  }, []);

  if (isLoading) {
    return (
      <section className="ezy__cta2 light py-14 w-full h-screen bg-[#F4F2EE] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Initializing your session...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="ezy__cta2 light py-14 w-full h-screen bg-[#F4F2EE] flex items-center justify-center">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl">
          <h2 className="text-2xl text-red-600 mb-4">Error</h2>
          <p className="mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#F1F1F1] rounded-full hover:bg-gray-200"
          >
            Refresh Page
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="ezy__cta2 light py-14 w-full h-screen bg-[#F4F2EE] text-black font-[Neue_Montreal]">
      <div className="container px-4">
        <div className="">
          <div className="grid grid-cols-12">
            <div className="col-span-12 m-20 bg-[#FFFFFF] rounded-3xl">
              <div className="py-12 px-6 m-20 text-center">
                <h2 className="text-6xl tracking-tight uppercase leading-none mb-6">
                  Choose your preference
                </h2>

                <div className="p-10 uppercase">
                  <Link 
                    to={`/aipage?userId=${userId}`}
                    className="text-md border hover:bg-[#F1F1F1] px-7 py-2 rounded-full transition-all"
                  >
                    Without Questions
                  </Link>

                  <Link 
                    to={`/ptpage?userId=${userId}`}
                    className="text-md border hover:bg-[#F1F1F1] px-7 py-2 ml-10 rounded-full transition-all"
                  >
                    With Questions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA2;