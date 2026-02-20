import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SkillCard from '../common/SkillCard';
import { Code, Database, BarChart3, Brain, Server, Cpu, Sparkles, Zap, Trophy } from 'lucide-react';
import { SKILLS_DATA } from '../../data/projects';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const controls = useAnimation();
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  // Convert skills data to match SkillCard component structure
  const skillCards = [
    {
      icon: <Code className="w-8 h-8" />,
      name: "Software Engineering",
      description: "Building scalable applications with modern technologies",
      level: 95,
      color: "from-emerald-400 to-cyan-400"
    },
    {
      icon: <Database className="w-8 h-8" />,
      name: "Data Science",
      description: "Statistical analysis, machine learning, and predictive modeling",
      level: 90,
      color: "from-blue-400 to-purple-400"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      name: "Data Analytics",
      description: "Transforming raw data into actionable insights",
      level: 88,
      color: "from-orange-400 to-red-400"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      name: "AI & Machine Learning",
      description: "Developing intelligent systems and algorithms",
      level: 92,
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: <Server className="w-8 h-8" />,
      name: "Cloud Architecture",
      description: "Designing and deploying scalable cloud solutions",
      level: 87,
      color: "from-cyan-400 to-blue-400"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      name: "System Design",
      description: "Architecting robust and efficient systems",
      level: 90,
      color: "from-green-400 to-emerald-400"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-emerald-950/20 to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-tech-grid opacity-10" />
      <div className="absolute inset-0 bg-particles opacity-30" />
      
      {/* Floating orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full mix-blend-screen filter blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/30 mb-4"
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">Expertise & Proficiency</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-300% animate-gradient-shift mb-4">
            Skills & Expertise
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            A comprehensive toolkit forged through years of building production systems
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mx-auto mt-6"
          />
        </motion.div>

        {/* Skill Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {skillCards.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onHoverStart={() => setHoveredSkill(index)}
              onHoverEnd={() => setHoveredSkill(null)}
              className="relative"
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-500`} />
              
              <SkillCard 
                {...skill} 
                index={index}
                isInView={inView}
              />

              {/* Level badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                className="absolute top-4 right-4 px-2 py-1 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
              >
                <span className="text-xs font-medium text-emerald-400">{skill.level}%</span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Skills Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-6 h-6 text-emerald-400" />
            <h3 className="text-2xl font-bold text-white">Technical Proficiencies</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {SKILLS_DATA.map((category, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 relative overflow-hidden group"
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ delay: index * 0.15 + 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Animated border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/30 rounded-2xl transition-colors duration-500" />

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-emerald-400 mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-full" />
                    {category.category}
                  </h3>
                  
                  <div className="space-y-3">
                    {category.skills.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-3 group/skill"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.15 + idx * 0.05 + 1 }}
                        whileHover={{ x: 8 }}
                      >
                        {/* Animated dot */}
                        <motion.span
                          className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 flex-shrink-0"
                          whileHover={{ scale: 1.5 }}
                        />
                        
                        {/* Skill text */}
                        <span className="text-gray-300 group-hover/skill:text-emerald-400 transition-colors duration-300">
                          {skill}
                        </span>

                        {/* Hover line */}
                        <motion.div
                          className="flex-1 h-px bg-gradient-to-r from-emerald-500/0 to-emerald-500/0 group-hover/skill:to-emerald-500/50 transition-all duration-300"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Corner decoration */}
                <motion.div
                  className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-emerald-500/5 rounded-3xl blur-3xl" />
          
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 p-8 glass-card rounded-3xl">
            {[
              { icon: '💻', label: 'Languages', value: '8+', color: 'from-emerald-400 to-cyan-400' },
              { icon: '🛠️', label: 'Frameworks', value: '15+', color: 'from-blue-400 to-purple-400' },
              { icon: '☁️', label: 'Cloud Platforms', value: '5+', color: 'from-orange-400 to-red-400' },
              { icon: '🏆', label: 'Years Experience', value: '5+', color: 'from-purple-400 to-pink-400' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 + 1.4, type: "spring" }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div 
                  className="text-4xl mb-2"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div 
                  className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
