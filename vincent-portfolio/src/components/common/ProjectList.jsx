import React from 'react';
import { ExternalLink } from 'lucide-react';

const ProjectList = ({ projects }) => {
  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-emerald-50/50 rounded-lg p-4 hover:bg-emerald-50 transition-colors duration-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-emerald-800 font-medium">{project.title}</h4>
              <p className="text-sm text-emerald-600 mt-1">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={project.link}
              className="text-emerald-600 hover:text-emerald-700 transition-colors ml-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;