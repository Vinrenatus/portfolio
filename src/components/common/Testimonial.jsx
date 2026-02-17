import React from 'react';
import { Star, Quote as QuoteIcon, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonial = ({ name, role, content, rating, onDelete }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-dark rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 relative card-hover"
    >
      {onDelete && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          whileHover={{ opacity: 1, scale: 1 }}
          onClick={onDelete}
          className="absolute top-3 right-3 p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 z-10"
          aria-label="Delete testimonial"
        >
          <Trash2 size={16} />
        </motion.button>
      )}
      
      <div className="flex items-center mb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mr-3"
        >
          <QuoteIcon className="w-5 h-5 text-white" />
        </motion.div>
        <div className="flex gap-1">
          {[...Array(rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
            </motion.div>
          ))}
        </div>
      </div>
      
      <motion.p 
        className="text-gray-300 italic mb-4 relative pl-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-full"></span>
        {content}
      </motion.p>
      
      <motion.div 
        className="pt-4 border-t border-emerald-500/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="font-semibold text-emerald-400">{name}</p>
        <p className="text-sm text-gray-400">{role}</p>
      </motion.div>
    </motion.div>
  );
};

export default Testimonial;