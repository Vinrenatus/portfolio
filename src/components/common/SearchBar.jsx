import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ data, searchTerm, onSearchChange }) => {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects, skills, or technologies..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
        />
      </div>
      {searchTerm && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Search active
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;