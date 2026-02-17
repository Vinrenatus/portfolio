import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SkillCard from '../common/SkillCard';
import { Code, Database, BarChart3, Brain, Server, Cpu } from 'lucide-react';
import { SKILLS_DATA } from '../../data/projects';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Convert skills data to match SkillCard component structure
  const skillCards = [
    {
      icon: <Code className="w-8 h-8" />,
      name: "Software Engineering",
      description: "Building scalable application with modern technologies",
      level: 95
    },
    {
      icon: <Database className="w-8 h-8" />,
      name: "Data Science",
      description: "Statistical analysis, machine learning, and predictive modeling",
      level: 90
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      name: "Data Analytics",
      description: "Transforming raw data into actionable insights",
      level: 88
    },
    {
      icon: <Brain className="w-8 h-8" />,
      name: "AI & Machine Learning",
      description: "Developing intelligent systems and algorithms",
      level: 85
    },
    {
      icon: <Server className="w-8 h-8" />,
      name: "Cloud Architecture",
      description: "Designing and deploying scalable cloud solutions",
      level: 87
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      name: "System Design",
      description: "Architecting robust and efficient systems",
      level: 90
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-tech-dots opacity-20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-center mb-16"
        >
          Skills & Expertise
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCards.map((skill, index) => (
            <SkillCard key={index} {...skill} />
          ))}
        </div>

        {/* Detailed Skills Breakdown */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {SKILLS_DATA.map((category, index) => (
            <motion.div 
              key={index} 
              className="glass-dark rounded-xl p-6 border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 card-hover"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-cyan-500 rounded-full"></span>
                {category.category}
              </h3>
              <ul className="space-y-3">
                {category.skills.map((skill, idx) => (
                  <motion.li 
                    key={idx} 
                    className="flex items-start group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 + idx * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></span>
                    <span className="text-gray-300 group-hover:text-emerald-400 transition-colors duration-300">{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;