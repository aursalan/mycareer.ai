import React from "react";
import { motion } from "framer-motion";
import { FaUserCheck, FaSearch, FaLightbulb, FaRocket } from "react-icons/fa";

const HIWPage = () => {
  const steps = [
    {
      icon: <FaUserCheck className="text-4xl text-blue-500" />, 
      title: "Sign Up & Get Started",
      description: "Create your profile and tell us about your career goals and interests.",
    },
    {
      icon: <FaSearch className="text-4xl text-purple-500" />, 
      title: "Personalized Career Analysis",
      description: "Our AI-driven system assesses your skills and provides tailored career insights.",
    },
    {
      icon: <FaLightbulb className="text-4xl text-yellow-500" />, 
      title: "Get Expert Guidance",
      description: "Connect with career mentors and explore opportunities that align with you.",
    },
    {
      icon: <FaRocket className="text-4xl text-green-500" />, 
      title: "Take the Next Step",
      description: "Receive actionable steps to upskill and land your dream job effortlessly.",
    },
  ];

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center justify-center py-20 px-6">
      <div className="text-center max-w-3xl">
        <h2 className="text-5xl font-extrabold text-gray-900">How It Works</h2>
        <p className="mt-4 text-lg text-gray-700">
          Unlock your potential with AI-driven career insights. Follow these simple steps to take charge of your future.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 w-full max-w-7xl">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center bg-white rounded-xl shadow-xl p-8 text-center transition duration-300 hover:shadow-2xl hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-200 p-4 shadow-lg">
              {step.icon}
            </div>
            <h5 className="mt-6 text-2xl font-semibold text-gray-900">{step.title}</h5>
            <p className="mt-3 text-gray-600 text-lg">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HIWPage;
