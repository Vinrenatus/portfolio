import React from 'react';
import { Star, Quote as QuoteIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonial = ({ name, role, content, rating }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center mb-4">
        <QuoteIcon className="w-8 h-8 text-emerald-500 mr-2" />
        <div className="flex gap-1">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>
      <p className="text-emerald-800 italic mb-4">{content}</p>
      <div className="border-t border-emerald-100 pt-4">
        <p className="font-semibold text-emerald-700">{name}</p>
        <p className="text-sm text-emerald-600">{role}</p>
      </div>
    </motion.div>
  );
};

export default Testimonial;