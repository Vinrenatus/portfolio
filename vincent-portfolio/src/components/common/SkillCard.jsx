import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ProjectList from './ProjectList';

const SkillCard = ({ icon, name, description, level }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const projects = {
    "Full Stack Development": [
      {
        title: "E-Commerce Platform",
        description: "Built with MERN stack and Stripe integration",
        link: "#",
        technologies: ["React", "Node.js", "MongoDB", "Express"]
      },
      {
        title: "Real-time Chat Application",
        description: "WebSocket-based messaging platform",
        link: "#",
        technologies: ["Socket.io", "React", "Redis", "Node.js"]
      }
    ],
    "Database Design": [
      {
        title: "Healthcare Data Platform",
        description: "Complex SQL schema with HIPAA compliance",
        link: "#",
        technologies: ["PostgreSQL", "TypeORM", "Node.js"]
      },
      {
        title: "Analytics Dashboard",
        description: "Real-time data processing pipeline",
        link: "#",
        technologies: ["MongoDB", "Redis", "Express"]
      }
    ],
    "Web Technologies": [
      {
        title: "Progressive Web App",
        description: "Offline-first social platform",
        link: "#",
        technologies: ["React", "Service Workers", "IndexedDB"]
      },
      {
        title: "Microservices Architecture",
        description: "Distributed system with API Gateway",
        link: "#",
        technologies: ["Docker", "Kubernetes", "Node.js"]
      }
    ],
    "Academic Tutoring": [
      {
        title: "Physics Learning Platform",
        description: "Interactive physics simulations",
        link: "#",
        technologies: ["Three.js", "React", "WebGL"]
      },
      {
        title: "Math Problem Generator",
        description: "Adaptive learning system",
        link: "#",
        technologies: ["Python", "React", "TensorFlow"]
      }
    ],
    "System Architecture": [
      {
        title: "CI/CD Pipeline",
        description: "Automated deployment workflow",
        link: "#",
        technologies: ["Jenkins", "Docker", "AWS"]
      },
      {
        title: "Microservices Monitor",
        description: "Real-time system monitoring",
        link: "#",
        technologies: ["Prometheus", "Grafana", "Node.js"]
      }
    ],
    "Technical Writing": [
      {
        title: "API Documentation System",
        description: "Auto-generated technical docs",
        link: "#",
        technologies: ["Swagger", "Node.js", "Markdown"]
      },
      {
        title: "Developer Blog Platform",
        description: "Technical content management",
        link: "#",
        technologies: ["Next.js", "MDX", "GraphQL"]
      }
    ]
  };

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left focus:outline-none"
      >
        <div className="relative">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="text-emerald-600 mb-3 transform group-hover:scale-110 transition-transform duration-300">
                {icon}
              </div>
              <h3 className="text-lg font-semibold text-emerald-800 mb-2">{name}</h3>
              <p className="text-sm text-emerald-600">{description}</p>
              <div className="mt-3 w-full bg-emerald-100 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-green-400 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${level}%` }}
                />
              </div>
            </div>
            <div className="ml-4 text-emerald-600">
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
        </div>
      </button>
      
      {isExpanded && (
        <div className="p-6 pt-0 border-t border-emerald-100">
          <ProjectList projects={projects[name] || []} />
        </div>
      )}
    </div>
  );
};

export default SkillCard;