import React from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const ProjectCard = ({ title, type, description, tags, onDelete }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group glass-dark rounded-2xl overflow-hidden border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 card-hover relative"
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
      
      <div className="p-6">
        <motion.div 
          className="text-sm text-emerald-400 mb-2 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {type}
        </motion.div>
        <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-emerald-400 transition-colors duration-300">{title}</h3>
        <p className="text-gray-400 mb-4 line-clamp-3">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-400 rounded-full border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/5 group-hover:to-cyan-500/5 transition-all duration-500 pointer-events-none"></div>
    </motion.div>
  );
};

export default ProjectCard;