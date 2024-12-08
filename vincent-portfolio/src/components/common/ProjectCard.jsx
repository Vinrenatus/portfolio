import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

const ProjectCard = ({ title, description, githubUrl, demoUrl, tags }) => {
  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-emerald-800 mb-2">{title}</h3>
        <p className="text-emerald-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-emerald-100 text-emerald-700 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          <a
            href={githubUrl}
            className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <Github className="w-5 h-5 mr-1" />
            Code
          </a>
          <a
            href={demoUrl}
            className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <ExternalLink className="w-5 h-5 mr-1" />
            Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;