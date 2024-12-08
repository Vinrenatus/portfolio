import React, { useState } from 'react';
import { FileText, Download, ChevronDown, ChevronUp } from 'lucide-react';

const DocumentCard = ({ title, type, preview }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const documents = {
    "Academic": [
      { name: "Advanced Physics Paper.pdf", size: "2.4 MB" },
      { name: "Quantum Mechanics Notes.pdf", size: "1.8 MB" }
    ],
    "Teaching": [
      { name: "Chemistry Lab Manual.pdf", size: "3.1 MB" },
      { name: "Physics Practice Problems.pdf", size: "1.5 MB" }
    ],
    "Writing": [
      { name: "Technical Documentation Guide.pdf", size: "2.2 MB" },
      { name: "API Documentation.pdf", size: "1.9 MB" }
    ]
  };

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <img
          src={preview}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-start justify-between focus:outline-none"
        >
          <div>
            <h3 className="text-lg font-semibold text-emerald-800 mb-1">{title}</h3>
            <p className="text-sm text-emerald-600">{type}</p>
          </div>
          <div className="text-emerald-600">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {isExpanded && (
          <div className="mt-4 space-y-2 border-t border-emerald-100 pt-4">
            {documents[type]?.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <FileText className="w-4 h-4 text-emerald-600 mr-2" />
                  <span className="text-sm text-emerald-800">{doc.name}</span>
                  <span className="text-xs text-emerald-500 ml-2">({doc.size})</span>
                </div>
                <button className="p-1 text-emerald-600 hover:text-emerald-700 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;