import React from 'react';
import { motion } from 'framer-motion';

const SkillCard = ({ icon, name, description, level }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-dark rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 card-hover group"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
      >
        {React.cloneElement(icon, { className: "w-8 h-8 text-white" })}
      </motion.div>
      
      <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-emerald-400 transition-colors duration-300">
        {name}
      </h3>
      
      <p className="text-gray-400 mb-4">{description}</p>
      
      <div className="relative">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Proficiency</span>
          <span className="text-emerald-400 font-bold">{level}%</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full relative"
          >
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg shadow-emerald-500/50"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;