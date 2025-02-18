// Chapters.js
import React from "react";

const Chapters = () => {
  const chapters = [
    "My Bicycle",
    "Picture Reading",
    "It is Fun",
    "Seeing without Seeing",
  ];

  return (
    <div className="container text-center my-4">
      <h2>Class 2 English Chapters</h2>
      <div className="list-group">
        {chapters.map((chapter, index) => (
          <button key={index} className="list-group-item list-group-item-action" onClick={() => alert(`Opening Chapter ${index + 1}`)}>
            Chapter {index + 1}: {chapter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chapters;
