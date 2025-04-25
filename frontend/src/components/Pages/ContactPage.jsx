import React, { useState } from "react";
import { FiMail, FiPhone, FiGlobe } from "react-icons/fi"; // Importing icons from React Icons
import PropTypes from "prop-types";

const contactInfoList = [
  {
    icon: <FiMail className="text-3xl text-blue-500" />,
    label: "email@easyfrontend.com",
    href: "mailto:email@easyfrontend.com",
  },
  {
    icon: <FiPhone className="text-3xl text-blue-500" />,
    label: "+880 1742-0****0",
    href: "tel:+88017420****0",
  },
  {
    icon: <FiGlobe className="text-3xl text-blue-500" />,
    label: "easyfrontend.com",
    href: "https://easyfrontend.com",
  },
];

// Contact Form Component
const ContactForm = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidated(true);
  };

  return (
    <form className="" noValidate onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          className="min-h-[48px] bg-[#F2F6FD] dark:bg-[#2A384C] border rounded-xl focus:outline-none focus:border-[#86b7fe] w-full px-5"
          placeholder="Enter Name"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          className="min-h-[48px] bg-[#F2F6FD] dark:bg-[#2A384C] border rounded-xl focus:outline-none focus:border-[#86b7fe] w-full px-5"
          placeholder="Enter Email"
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          name="message"
          className="min-h-[48px] bg-[#F2F6FD] dark:bg-[#2A384C] border rounded-xl focus:outline-none focus:border-[#86b7fe] w-full px-5 py-3"
          placeholder="Enter Message"
          rows="4"
          required
        ></textarea>
      </div>
      <div className="text-start">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded transition">
          Submit
        </button>
      </div>
    </form>
  );
};

// Contact Form Card Component
const ContactFormCard = () => (
  <div className="bg-white dark:bg-[#162231] shadow-xl rounded-2xl p-6 md:p-12">
    <h2 className="text-2xl md:text-[45px] font-bold mb-4">Contact Us</h2>
    <p className="text-lg mb-6">We list your menu online, help you process orders.</p>
    <ContactForm />
  </div>
);

// Contact Info Component
const ContactInfo = ({ contactInfoList }) => (
  <div className="mt-5">
    {contactInfoList.map((info, i) => (
      <div key={i} className="bg-gray-100 shadow dark:bg-gray-800 max-w-[350px] mt-6 flex items-center rounded-xl p-5">
        {info.icon}
        <a className="text-lg font-medium ml-4 text-gray-900 dark:text-white" href={info.href}>
          {info.label}
        </a>
      </div>
    ))}
  </div>
);

ContactInfo.propTypes = {
  contactInfoList: PropTypes.array.isRequired,
};

// Main Contact Page Component
const ContactPage = () => {
  return (
    <section className="py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl md:text-[45px] font-bold mb-6">How can we help you?</h2>
            <p className="text-lg mb-6">
              It’s easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you!
            </p>
            <ContactInfo contactInfoList={contactInfoList} />
          </div>

          {/* Contact Form */}
          <ContactFormCard />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
