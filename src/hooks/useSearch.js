import { useState, useEffect } from 'react';

export const useSearch = (data) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
      return;
    }

    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = data.filter(item =>
      item.title.toLowerCase().includes(lowercasedTerm) ||
      item.description.toLowerCase().includes(lowercasedTerm) ||
      item.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm)) ||
      item.type.toLowerCase().includes(lowercasedTerm)
    );

    setFilteredData(filtered);
  }, [searchTerm, data]);

  return {
    searchTerm,
    setSearchTerm,
    filteredData
  };
};