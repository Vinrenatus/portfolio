import React from "react";

const Testimony = ({ testimonial, onLike, onDislike, onShare }) => {
  const { author, text, likes, dislikes } = testimonial;

  return (
    <div className="p-4 mb-4 border rounded-lg shadow-md">
      <p className="text-gray-800 mb-2">{text}</p>
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button onClick={onLike} className="text-green-500 hover:text-green-700">
            👍 {likes}
          </button>
          <button onClick={onDislike} className="text-red-500 hover:text-red-700">
            👎 {dislikes}
          </button>
        </div>
        <div className="flex space-x-2">
          <button onClick={onShare} className="text-blue-500 hover:text-blue-700">Share</button>
        </div>
      </div>
    </div>
  );
};

export default Testimony;


