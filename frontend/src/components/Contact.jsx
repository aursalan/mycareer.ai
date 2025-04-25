import React from "react";
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlinePhone } from "react-icons/hi";

function Contact() {
  const contactDetails = [
    {
      icon: <HiOutlineMail className="w-6 h-6" />,
      title: "Email",
      description: "Our friendly team is here to help.",
      contact: "aursalansayed@gmail.com",
    },
    {
      icon: <HiOutlineLocationMarker className="w-6 h-6" />,
      title: "Office",
      description: "Come say hello at our office HQ.",
      contact: "Vasantdada Patil College of Engg Sion Mumbai-400028",
    },
    {
      icon: <HiOutlinePhone className="w-6 h-6" />,
      title: "Phone",
      description: "Mon-Fri from 8am to 5pm.",
      contact: "+9122 2084 0325/2084 7226",
    },
  ];

  return (
    <section data-scroll data-scroll-section data-scroll-speed="0"
    className="-mt-[220px] bg-[#0A66C2] rounded-tl-3xl rounded-tr-3xl text-white font-['Neue_Montreal'] leading-none">
      <div className="container px-6 py-12 mx-auto">
        <div className="text-center">
          <p className="font-medium">Contact us</p>
          <h1 className="mt-2 text-2xl font-semibold md:text-3xl">Get in touch</h1>
          <p className="mt-3">Our friendly team is always here to chat.</p>
        </div>

        <div className="grid grid-cols-1 gap-12 mt-10 md:grid-cols-2 lg:grid-cols-3">
          {contactDetails.map(({ icon, title, description, contact }) => (
            <div key={title} className="flex flex-col items-center justify-center text-center">
              <span className="p-3 rounded-full bg-blue-100/80 ">{icon}</span>
              <h2 className="mt-4 text-lg font-medium">{title}</h2>
              <p className="mt-2">{description}</p>
              <p className="mt-2">{contact}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;
