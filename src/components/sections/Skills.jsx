import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SkillCard from '../common/SkillCard';
import { 
  Code, Database, BarChart3, Brain, Server, Cpu, Sparkles, Zap, Trophy, 
  ChevronLeft, ChevronRight, Terminal, Cloud, Layers, 
  GitBranch, Shield, Workflow, Box, Settings, Globe, Target
} from 'lucide-react';
import { SKILLS_DATA } from '../../data/projects';
import { useTheme } from '../../context/ThemeContext';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const { theme } = useTheme();
  const controls = useAnimation();
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  // Update carousel slide when category filter changes
  useEffect(() => {
    if (activeCategory !== 'All') {
      const categoryIndex = SKILLS_DATA.findIndex(cat => cat.category === activeCategory);
      if (categoryIndex !== -1) {
        setCurrentSlide(categoryIndex);
      }
    }
  }, [activeCategory]);

  // Auto-rotate carousel only when All category is selected
  useEffect(() => {
    if (isPaused || activeCategory !== 'All') return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SKILLS_DATA.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, activeCategory]);

  // Icons for each skill category
  const categoryIcons = {
    'AI & Data Training': Brain,
    'Languages & Frameworks': Terminal,
    'DevOps & Infrastructure': Cloud,
    'Tools & Platforms': Settings
  };

  // Software engineering themed icons
  const skillIcons = {
    'Python (Django, Flask, SQLAlchemy)': Layers,
    'JavaScript/TypeScript (React, Node, Redux)': Globe,
    'Elixir (Phoenix)': Zap,
    'SQL': Database,
    'HTML5/CSS3': Code,
    'Java': Box,
    'LaTeX': Terminal,
    'AWS (EC2, S3)': Cloud,
    'Docker': Box,
    'Kubernetes': Settings,
    'PostgreSQL': Database,
    'Redis': Zap,
    'Linux/Bash': Terminal,
    'Google Cloud': Cloud,
    'Azure': Cloud,
    'CI/CD Pipelines': Workflow,
    'RLHF': Brain,
    'SFT': Brain,
    'LLM Evaluation': Brain,
    'Code Hallucination Detection': Shield,
    'Prompt Engineering': Zap,
    'Ground Truth Creation': Target,
    'Chain-of-Thought Reasoning': Brain,
    'Model Stumping': Zap,
    'Responsible AI Guidelines': Shield,
    'HLE Benchmarking': Trophy,
    'Snorkel AI Expert Platform': Box,
    'FT Studio (Telus)': Box,
    'Anthropic Interface': Brain,
    'Appen': Globe,
    'TELUS International': Globe,
    'OpenAI': Brain,
    'Hugging Face': Globe,
    'Jira': Workflow,
    'Slack': Globe
  };

  // Skill cards with emoji icons
  const skillCards = [
    {
      icon: <Code className="w-8 h-8" />,
      emoji: '💻',
      name: "Software Engineering",
      description: "Building scalable applications with modern technologies",
      level: 95,
      color: "from-emerald-400 to-cyan-400"
    },
    {
      icon: <Database className="w-8 h-8" />,
      emoji: '📊',
      name: "Data Science",
      description: "Statistical analysis, machine learning, and predictive modeling",
      level: 90,
      color: "from-blue-400 to-purple-400"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      emoji: '📈',
      name: "Data Analytics",
      description: "Transforming raw data into actionable insights",
      level: 88,
      color: "from-orange-400 to-red-400"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      emoji: '🤖',
      name: "AI & Machine Learning",
      description: "Developing intelligent systems and algorithms",
      level: 92,
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: <Server className="w-8 h-8" />,
      emoji: '☁️',
      name: "Cloud Architecture",
      description: "Designing and deploying scalable cloud solutions",
      level: 87,
      color: "from-cyan-400 to-blue-400"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      emoji: '⚙️',
      name: "System Design",
      description: "Architecting robust and efficient systems",
      level: 90,
      color: "from-green-400 to-emerald-400"
    }
  ];

  const categories = ['All', ...SKILLS_DATA.map(cat => cat.category)];

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

  const slideVariants = {
    enter: { x: 300, opacity: 0, scale: 0.8, rotateY: -15 },
    center: { x: 0, opacity: 1, scale: 1, rotateY: 0 },
    exit: { x: -300, opacity: 0, scale: 0.8, rotateY: 15 }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SKILLS_DATA.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SKILLS_DATA.length) % SKILLS_DATA.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setActiveCategory('All'); // Reset filter when manually navigating
  };

  // Skill proficiency levels
  const getSkillLevel = (skillName) => {
    const levels = {
      'Python (Django, Flask, SQLAlchemy)': 95,
      'JavaScript/TypeScript (React, Node, Redux)': 93,
      'Elixir (Phoenix)': 90,
      'SQL': 92,
      'HTML5/CSS3': 95,
      'Java': 85,
      'LaTeX': 88,
      'AWS (EC2, S3)': 88,
      'Docker': 90,
      'Kubernetes': 85,
      'PostgreSQL': 90,
      'Redis': 87,
      'Linux/Bash': 92,
      'Google Cloud': 82,
      'Azure': 80,
      'CI/CD Pipelines': 88,
      'RLHF': 96,
      'SFT': 94,
      'LLM Evaluation': 95,
      'Code Hallucination Detection': 93,
      'Prompt Engineering': 95,
      'Ground Truth Creation': 94,
      'Chain-of-Thought Reasoning': 93,
      'Model Stumping': 91,
      'Responsible AI Guidelines': 92,
      'HLE Benchmarking': 90
    };
    return levels[skillName] || 85;
  };

  // Color variants for skill cards - Enhanced for better contrast
  const skillColors = {
    'AI & Data Training': {
      from: 'from-purple-500',
      to: 'to-pink-500',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
      textLight: 'text-purple-700',
      bgLight: 'bg-purple-100',
      borderLight: 'border-purple-300',
      glow: 'shadow-purple-500/25'
    },
    'Languages & Frameworks': {
      from: 'from-emerald-500',
      to: 'to-cyan-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      textLight: 'text-emerald-700',
      bgLight: 'bg-emerald-100',
      borderLight: 'border-emerald-300',
      glow: 'shadow-emerald-500/25'
    },
    'DevOps & Infrastructure': {
      from: 'from-blue-500',
      to: 'to-indigo-500',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      textLight: 'text-blue-700',
      bgLight: 'bg-blue-100',
      borderLight: 'border-blue-300',
      glow: 'shadow-blue-500/25'
    },
    'Tools & Platforms': {
      from: 'from-orange-500',
      to: 'to-amber-500',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      text: 'text-orange-400',
      textLight: 'text-orange-700',
      bgLight: 'bg-orange-100',
      borderLight: 'border-orange-300',
      glow: 'shadow-orange-500/25'
    }
  };

  return (
    <section className={`py-24 relative overflow-hidden transition-colors duration-500 ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-white via-gray-50 to-emerald-50' 
        : 'bg-gradient-to-br from-gray-950 via-purple-950 to-black'
    }`}>
      {/* Animated background */}
      <div className={`absolute inset-0 bg-tech-grid opacity-10 ${
        theme === 'light' ? 'opacity-5' : 'opacity-10'
      }`} />
      <div className="absolute inset-0 bg-particles opacity-30" />

      {/* Floating orbs - Enhanced brightness for dark mode */}
      <motion.div
        className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-screen filter blur-3xl ${
          theme === 'light' ? 'bg-emerald-200/30' : 'bg-emerald-500/30'
        }`}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full mix-blend-screen filter blur-3xl ${
          theme === 'light' ? 'bg-cyan-200/30' : 'bg-cyan-500/30'
        }`}
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
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 mb-4 shadow-lg ${
              theme === 'light' 
                ? 'bg-emerald-100 border-emerald-400 shadow-emerald-500/20' 
                : 'bg-emerald-500/20 border-emerald-400 shadow-emerald-500/30'
            }`}
          >
            <Zap className={`w-5 h-5 ${
              theme === 'light' ? 'text-emerald-700' : 'text-emerald-300'
            }`} />
            <span className={`text-base font-bold ${
              theme === 'light' ? 'text-emerald-800' : 'text-emerald-200'
            }`}>⚡ Expertise & Proficiency</span>
          </motion.div>

          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-4 ${
            theme === 'light' 
              ? 'text-gray-900 drop-shadow-sm' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-emerald-300 bg-300% animate-gradient-shift'
          }`}>
            🛠️ Skills & Expertise
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
            className={`text-lg md:text-xl max-w-2xl mx-auto font-medium ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}
          >
            A comprehensive toolkit forged through years of building production systems
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-32 h-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mx-auto mt-6 shadow-lg"
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
              <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`} />

              <SkillCard
                {...skill}
                index={index}
                isInView={inView}
              />

              {/* Level badge - Enhanced */}
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                className={`absolute top-4 right-4 px-3 py-1.5 rounded-full border-2 font-bold text-sm ${
                  theme === 'light' 
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-800' 
                    : 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                }`}
              >
                📊 {skill.level}%
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Filter Section - Controls Technical Proficiencies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="text-center mb-6">
            <h3 className={`text-2xl font-bold mb-2 ${
              theme === 'light' ? 'text-gray-800' : 'text-white'
            }`}>
              📁 Filter by Category
            </h3>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              Click a category to view specific technical proficiencies
            </p>
          </div>

          {/* Category Filter Pills - Enhanced */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-4 rounded-full text-sm font-bold transition-all duration-300 shadow-lg border-2 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-emerald-400 shadow-emerald-500/40 scale-105'
                    : theme === 'light'
                      ? 'bg-white text-gray-700 border-gray-300 hover:border-emerald-500 hover:text-emerald-700 shadow-gray-500/10'
                      : 'bg-gray-800 text-gray-300 border-gray-600 hover:border-emerald-400 hover:text-emerald-300 shadow-gray-900/50'
                }`}
              >
                {category === 'All' && '🎯 '}
                {category === 'AI & Data Training' && '🤖 '}
                {category === 'Languages & Frameworks' && '💻 '}
                {category === 'DevOps & Infrastructure' && '☁️ '}
                {category === 'Tools & Platforms' && '🛠️ '}
                {category}
              </motion.button>
            ))}
          </div>

          {/* Active filter indicator */}
          {activeCategory !== 'All' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 text-center p-3 rounded-xl border-2 ${
                theme === 'light' 
                  ? 'bg-emerald-50 border-emerald-300' 
                  : 'bg-emerald-500/10 border-emerald-400'
              }`}
            >
              <p className={`font-bold ${
                theme === 'light' ? 'text-emerald-800' : 'text-emerald-300'
              }`}>
                🔍 Viewing: {activeCategory}
                <button
                  onClick={() => setActiveCategory('All')}
                  className={`ml-3 px-3 py-1 rounded-lg text-xs font-bold ${
                    theme === 'light' 
                      ? 'bg-emerald-200 text-emerald-800 hover:bg-emerald-300' 
                      : 'bg-emerald-500/30 text-emerald-200 hover:bg-emerald-500/50'
                  }`}
                >
                  ✕ Clear Filter
                </button>
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Technical Proficiencies - Enhanced Carousel (Filtered by Category) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <Trophy className={`w-7 h-7 ${
              theme === 'light' ? 'text-yellow-600' : 'text-yellow-400'
            }`} />
            <h3 className={`text-3xl font-black ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>🏆 Technical Proficiencies</h3>
            {activeCategory !== 'All' && (
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                theme === 'light' ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {activeCategory}
              </span>
            )}
          </div>

          <div 
            ref={carouselRef}
            className="relative max-w-6xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Navigation Buttons - Enhanced */}
            <button
              onClick={prevSlide}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full transition-all duration-300 shadow-xl backdrop-blur-sm border-2 ${
                theme === 'light'
                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-300 shadow-emerald-500/20'
                  : 'bg-emerald-500/30 text-emerald-200 hover:bg-emerald-500/50 border-emerald-400 shadow-emerald-500/30'
              }`}
              aria-label="Previous category"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={nextSlide}
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full transition-all duration-300 shadow-xl backdrop-blur-sm border-2 ${
                theme === 'light'
                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-300 shadow-emerald-500/20'
                  : 'bg-emerald-500/30 text-emerald-200 hover:bg-emerald-500/50 border-emerald-400 shadow-emerald-500/30'
              }`}
              aria-label="Next category"
            >
              <ChevronRight size={28} />
            </button>

            {/* Carousel Container */}
            <div className="overflow-hidden px-16">
              <AnimatePresence initial={false} custom={currentSlide} mode="wait">
                <motion.div
                  key={currentSlide}
                  custom={currentSlide}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 },
                    rotateY: { duration: 0.4 }
                  }}
                  className="w-full"
                >
                  <div className="relative">
                    {/* Category Header Card - Enhanced */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className={`mb-6 p-8 rounded-2xl bg-gradient-to-r ${skillColors[SKILLS_DATA[currentSlide].category].from} ${skillColors[SKILLS_DATA[currentSlide].category].to} bg-opacity-20 border-2 ${skillColors[SKILLS_DATA[currentSlide].category].border} backdrop-blur-sm shadow-2xl`}
                    >
                      <div className="flex items-center gap-5">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                          className={`w-20 h-20 rounded-xl bg-gradient-to-br ${skillColors[SKILLS_DATA[currentSlide].category].from} ${skillColors[SKILLS_DATA[currentSlide].category].to} flex items-center justify-center shadow-2xl ${skillColors[SKILLS_DATA[currentSlide].category].glow}`}
                        >
                          {React.createElement(categoryIcons[SKILLS_DATA[currentSlide].category], { 
                            className: "w-10 h-10 text-white" 
                          })}
                        </motion.div>
                        <div>
                          <h3 className={`text-3xl font-black ${skillColors[SKILLS_DATA[currentSlide].category].text}`}>
                            {SKILLS_DATA[currentSlide].category}
                          </h3>
                          <p className={`text-lg font-semibold ${
                            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                          }`}>
                            💼 {SKILLS_DATA[currentSlide].skills.length} skills mastered
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Skills Grid with Enhanced Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {SKILLS_DATA[currentSlide].skills.map((skill, idx) => {
                        const SkillIcon = skillIcons[skill] || Code;
                        const level = getSkillLevel(skill);
                        const colors = skillColors[SKILLS_DATA[currentSlide].category];
                        
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 + 0.3 }}
                            whileHover={{ scale: 1.05, y: -8 }}
                            className={`relative group p-5 rounded-xl border-2 ${colors.bg} ${
                              theme === 'light' ? colors.borderLight : colors.border
                            } backdrop-blur-sm overflow-hidden shadow-lg`}
                          >
                            {/* Animated background gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${colors.from} ${colors.to} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
                            
                            {/* Content */}
                            <div className="relative z-10">
                              <div className="flex items-start gap-3 mb-4">
                                <motion.div
                                  className={`p-3 rounded-lg bg-gradient-to-br ${colors.from} ${colors.to} shadow-xl`}
                                  whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                  <SkillIcon className="w-5 h-5 text-white" />
                                </motion.div>
                                <div className="flex-1 min-w-0">
                                  <h4 className={`text-sm font-bold ${
                                    theme === 'light' ? colors.textLight : colors.text
                                  } truncate`}>
                                    {skill}
                                  </h4>
                                </div>
                              </div>
                              
                              {/* Proficiency Bar - Enhanced */}
                              <div className={`relative h-3 rounded-full overflow-hidden shadow-inner ${
                                theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
                              }`}>
                                <motion.div
                                  className={`h-full bg-gradient-to-r ${colors.from} ${colors.to} rounded-full shadow-lg`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${level}%` }}
                                  transition={{ delay: idx * 0.05 + 0.5, duration: 0.8 }}
                                />
                              </div>
                              
                              {/* Level indicator */}
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: idx * 0.05 + 0.7 }}
                                className="flex justify-between items-center mt-3"
                              >
                                <span className={`text-xs font-bold ${
                                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                                }`}>💪 Proficiency</span>
                                <span className={`text-sm font-black ${
                                  theme === 'light' ? colors.textLight : colors.text
                                }`}>📊 {level}%</span>
                              </motion.div>
                            </div>

                            {/* Corner glow */}
                            <motion.div
                              className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${colors.from} ${colors.to} rounded-full blur-2xl opacity-20`}
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.1, 0.3, 0.1]
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: idx * 0.3
                              }}
                            />
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots Indicator - Enhanced */}
            <div className="flex justify-center gap-3 mt-8">
              {SKILLS_DATA.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`transition-all duration-300 rounded-full border-2 ${
                    index === currentSlide
                      ? 'w-14 h-4 bg-gradient-to-r from-emerald-500 to-cyan-500 border-emerald-400 shadow-lg'
                      : theme === 'light'
                        ? 'w-4 h-4 bg-gray-300 border-gray-400 hover:bg-gray-400'
                        : 'w-4 h-4 bg-gray-700 border-gray-600 hover:bg-emerald-500/50 hover:border-emerald-400'
                  }`}
                  aria-label={`Go to category ${index + 1}`}
                />
              ))}
            </div>

            {/* Progress Bar - Enhanced (only shows when All categories selected) */}
            {!isPaused && activeCategory === 'All' && (
              <div className={`mt-6 h-2 rounded-full overflow-hidden max-w-md mx-auto shadow-lg ${
                theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
              }`}>
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                  key={currentSlide}
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Skills Summary Stats - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2 }}
          className="relative"
        >
          <div className={`absolute inset-0 rounded-3xl blur-3xl ${
            theme === 'light' 
              ? 'bg-gradient-to-r from-emerald-200/40 via-cyan-200/40 to-emerald-200/40' 
              : 'bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10'
          }`} />

          <div className={`relative grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl border-2 ${
            theme === 'light'
              ? 'bg-white/80 backdrop-blur-xl border-emerald-300 shadow-xl shadow-emerald-500/10'
              : 'bg-gray-800/80 backdrop-blur-xl border-emerald-500/30 shadow-xl shadow-emerald-500/20'
          }`}>
            {[
              { icon: '💻', label: 'Languages', value: '8+', color: 'from-emerald-400 to-cyan-400' },
              { icon: '🛠️', label: 'Frameworks', value: '15+', color: 'from-blue-400 to-purple-400' },
              { icon: '☁️', label: 'Cloud Platforms', value: '5+', color: 'from-orange-400 to-red-400' },
              { icon: '🏆', label: 'Years Experience', value: '8+', color: 'from-purple-400 to-pink-400' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-5 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 border-2 border-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 + 1.4, type: "spring" }}
                whileHover={{ scale: 1.08, y: -8 }}
              >
                <motion.div
                  className="text-5xl mb-3"
                  whileHover={{ scale: 1.3, rotate: 10 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                >
                  {stat.value}
                </motion.div>
                <div className={`text-sm font-bold ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
