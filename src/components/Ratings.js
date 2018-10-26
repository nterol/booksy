import React from "react";

export default function Ratings({ score }) {
  const starGen = score => {
    const stars = Math.round(score * 20) / 2;
    return Array.from({ length: 5 }, (b, i) => {
      const s = stars - i;
      if (s > 0.5) return "fa-star checked";
      if (s === 0.5) return "fa-star-half-o";
      if (s <= 0) return "fa-star-o";
      return "";
    });
  };

  return (
    <div className="score container">
      {starGen(score).map((star, i) => (
        <span key={`${star}-${i}`} className={`fa ${star}`} />
      ))}
    </div>
  );
}
