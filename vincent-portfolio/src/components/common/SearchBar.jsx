import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Fuse from 'fuse.js';

const SearchBar = ({ data, onResultsChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const fuse = new Fuse(data, {
    keys: ['title', 'description', 'type', 'tags'],
    threshold: 0.3,
  });

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.length > 2) {
      const results = fuse.search(value);
      onResultsChange(results.map(result => result.item));
    } else {
      onResultsChange([]);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search projects, documents, and skills..."
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white/80 backdrop-blur-sm"
        />
      </div>
    </div>
  );
};

export default SearchBar;