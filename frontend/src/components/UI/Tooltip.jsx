import { useState } from "react";

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute bottom-full mb-2 px-3 py-1.5 text-xs capitalize font-[Neue_Montreal] text-white bg-black rounded-full shadow-md whitespace-nowrap">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
