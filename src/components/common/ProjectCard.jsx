import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, ExternalLink } from 'lucide-react';

const ProjectCard = ({ title, type, description, tags, image, link, onDelete }) => {
  const hasLink = link && link !== null;
  
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group glass-dark rounded-2xl overflow-hidden border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 card-hover relative flex flex-col"
    >
      {onDelete && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          whileHover={{ opacity: 1, scale: 1 }}
          onClick={onDelete}
          className="absolute top-3 right-3 p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 z-10"
          aria-label="Delete project"
        >
          <Trash2 size={16} />
        </motion.button>
      )}

      {/* Project Image */}
      {image && (
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
          
          {/* Link badge */}
          {hasLink && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 p-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-300 shadow-lg"
              aria-label={`View ${title} project`}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col">
        <motion.div
          className="text-sm text-orange-400 mb-2 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {type}
        </motion.div>
        <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-emerald-400 transition-colors duration-300">
          {title}
        </h3>
        
        {/* Description Card with lime green background */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 p-4 rounded-xl bg-lime-500/10 border border-lime-500/30 backdrop-blur-sm"
        >
          <p className="text-lime-100 text-sm leading-relaxed">{description}</p>
        </motion.div>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags?.map((tag, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400 rounded-full border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Link button for projects without images */}
        {!image && hasLink && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
          >
            View Project <ExternalLink size={16} />
          </a>
        )}
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/5 group-hover:to-cyan-500/5 transition-all duration-500 pointer-events-none"></div>
    </motion.div>
  );
};

export default ProjectCard;
