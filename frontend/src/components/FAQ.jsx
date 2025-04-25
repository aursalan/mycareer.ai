import { useState } from "react";

const faqs = [
  {
    question: "How does AI-powered career counseling work?",
    answer:
      "Our AI-driven system analyzes your skills, interests, and career goals to provide personalized recommendations, industry insights, and skill-building advice.",
  },
  {
    question: "Is the AI career guidance accurate and reliable?",
    answer:
      "Yes! Our AI model is trained on vast industry data and expert inputs to provide up-to-date career insights. However, we recommend consulting a human expert for final decisions.",
  },
  {
    question: "Do I need to pay for AI-based career counseling?",
    answer:
      "We offer both free and premium career guidance plans. Premium plans include in-depth analysis, mentorship sessions, and resume-building assistance.",
  },
  {
    question: "Can the AI suggest remote or freelancing career options?",
    answer:
      "Yes! Our system recommends remote jobs, freelancing platforms, and side hustles based on your skills and experience level.",
  },
  {
    question: "How do I get started with AI-based career counseling?",
    answer:
      "Simply sign up, complete our career assessment quiz, and get instant AI-driven career recommendations tailored to your profile.",
  },
  {
    question: "Can I speak with a human career counselor?",
    answer:
      "Absolutely! You can book a session with one of our expert career coaches for personalized career advice.",
  }
];


function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section data-scroll data-scroll-section data-scroll-speed="1" className="-mt-[350px] bg-[#F4F2EE] rounded-tl-3xl rounded-tr-3xl py-10 text-black font-['Neue_Montreal'] leading-none">
      <div className="container max-w-4xl px-6 mx-auto">
        <h1 className="text-center text-6xl text-center capitalize tracking-tight">
          Frequently Asked Questions
        </h1>
        <div className="mt-12 space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-[0.8px] border-zinc-300 rounded-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full p-6"
              >
                <h2 className="font-semibold">
                  {faq.question}
                </h2>
                <span className={`text-white bg-zinc-500 rounded-full p-1`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {openIndex === index ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 12H6"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    )}
                  </svg>
                </span>
              </button>
              {openIndex === index && (
                <div>
                  <hr className="border-gray-200" />
                  <p className="p-6 text-sm">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;