import React from "react";
import { FaLinkedin, FaFacebook, FaGithub } from "react-icons/fa";

const teamMembers = [
  {
    name: "Aursalan Sayed",
    role: "Lead Developer",
    image:"public/Placeholder.png",
    socials: {
      linkedin: "http://www.linkedin.com/in/shubham-yadav18",
      facebook: "",
      github: "https://github.com/ShubhamYadav18",
    },
  },
  {
    name: "Prachi Bebale",
    role: "AI & ML Engineer",
    image:
      "public/Placeholder.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/prachi-bebale-17a11931b/",
      facebook: "https://www.facebook.com/ameliaanderson",
      github: "https://github.com/prak-code",
    },
  },
  {
    name: "Shubham Yadav",
    role: "Full Stack Developer",
    image:
      "public/Placeholder.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/aursalan/",
      facebook: "https://www.facebook.com/oliviawathan",
      github: "https://github.com/aursalan/frontend",
    },
  },
  {
    name: "Sahil Surve",
    role: "Full Stack Developer",
    image:
      "public/Placeholder.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/johndoe",
      facebook: "https://www.facebook.com/johndoe",
      github: "https://github.com/johndoe",
    },
  },
];

const Team = () => {
  return (
    <section data-scroll data-scroll-section data-scroll-speed=".8" className="-mt-80 h-screen bg-[#FFFFFF] rounded-tl-3xl rounded-tr-3xl py-20 text-black font-['Neue_Montreal'] leading-none">
      <div className="container px-6 mx-auto">
        <h1 className="text-6xl text-center capitalize tracking-tight">
          Our Team
        </h1>
        <p className="max-w-2xl mx-auto my-6 text-center">
        A team of AI specialists committed to helping you make informed career decisions.
        </p>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-black dark:border-gray-700 dark:hover:border-transparent"
            >
              <img
                className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
                src={member.image}
                alt={member.name}
              />
              <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">
                {member.name}
              </h1>
              <p className="mt-2 capitalize group-hover:text-gray-300">
                {member.role}
              </p>
              <div className="flex mt-3 space-x-4">
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-500 group-hover:text-white text-2xl"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href={member.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 group-hover:text-white text-2xl"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-500 group-hover:text-white text-2xl"
                  aria-label="Github"
                >
                  <FaGithub />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
