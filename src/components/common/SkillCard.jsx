import React from 'react';
import { motion } from 'framer-motion';

const SkillCard = ({ icon, name, description, level, index = 0, isInView = false, color = "from-emerald-500 to-cyan-500" }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all duration-500 group relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
      
      {/* Icon container */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
        transition={{ type: "spring", stiffness: 200, delay: index * 0.1 + 0.2 }}
        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
        style={{
          boxShadow: `0 10px 30px -10px rgba(16, 185, 129, 0.5)`
        }}
      >
        {React.cloneElement(icon, { className: "w-8 h-8 text-white" })}
      </motion.div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-emerald-400 transition-colors duration-300">
        {name}
      </h3>

      {/* Description */}
      <p className="text-gray-400 mb-5 leading-relaxed">{description}</p>

      {/* Progress bar */}
      <div className="relative">
        <div className="flex justify-between text-sm mb-3">
          <span className="text-gray-400">Proficiency</span>
          <span className="text-emerald-400 font-bold">{level}%</span>
        </div>
        <div className="h-2.5 bg-gray-700/50 rounded-full overflow-hidden border border-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${level}%` } : { width: 0 }}
            transition={{ duration: 1.2, delay: index * 0.1 + 0.4, ease: "easeOut" }}
            className={`h-full bg-gradient-to-r ${color} rounded-full relative`}
          >
            {/* Animated shimmer */}
            <motion.div
              animate={{ x: [0, 100, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: index * 0.1 + 0.6 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
            
            {/* Glowing dot at end */}
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg shadow-emerald-500/50"
            />
          </motion.div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-cyan-500/5 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default SkillCard;
