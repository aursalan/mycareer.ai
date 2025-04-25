import { FaReddit, FaFacebook, FaGithub } from "react-icons/fa";

const socialLinks = [
  { href: "#", ariaLabel: "Reddit", icon: <FaReddit /> },
  { href: "#", ariaLabel: "Facebook", icon: <FaFacebook /> },
  { href: "#", ariaLabel: "Github", icon: <FaGithub /> },
];

const Footer = () => {
  return (
    <footer data-scroll data-scroll-section data-scroll-seed="0"
     className="bg-[#F1F1F1] text-black font-['Neue_Montreal'] leading-none">
      <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
        <p className="text-sm">&copy; Copyright 2025. All Rights Reserved.</p>

        <div className="flex space-x-4">
          {socialLinks.map(({ href, ariaLabel, icon }) => (
            <a 
              key={ariaLabel} 
              href={href} 
              className="transition-colors duration-300  hover:text-gray-500" 
              aria-label={ariaLabel}
            >
              <span className="text-xl">{icon}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
