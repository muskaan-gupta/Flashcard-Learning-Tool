import React, { useState } from "react";

const FlipCard = ({ frontContent, backContent }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full h-64 max-w-md perspective mx-auto"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className={`relative w-full h-full  flip-card ${flipped ? "flipped" : ""}`}>
        <div className="flip-card-front bg-gradient-to-b from-blue-400 to-purple-200  text-center justify-center rounded-lg shadow-md p-2  font-bold ">
          {frontContent}
        </div>
        <div className="flip-card-back bg-gradient-to-b from-purple-300 to-blue-200 text-black  font-bold items-center justify-center rounded-lg shadow-md p-2">
          {backContent}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;