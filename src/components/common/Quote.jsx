import React from 'react';

const Quote = ({ text, author }) => (
  <div className="px-6 py-3 bg-white/60 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
    <p className="text-lg italic text-emerald-800 font-serif">"{text}"</p>
    {author && (
      <p className="text-sm text-emerald-600 mt-2 text-right">- {author}</p>
    )}
  </div>
);

export default Quote;