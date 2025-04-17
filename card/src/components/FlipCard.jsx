import React, { useState } from "react";

const FlipCard = ({ frontContent, backContent }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full h-64 perspective"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className={`relative w-full h-full flip-card ${flipped ? "flipped" : ""}`}>
        <div className="flip-card-front bg-white rounded-lg shadow-md p-4">
          {frontContent}
        </div>
        <div className="flip-card-back bg-white rounded-lg shadow-md p-4">
          {backContent}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;