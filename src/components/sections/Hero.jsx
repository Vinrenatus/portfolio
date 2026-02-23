import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Mail, Download, Code, Cpu, Database, Sun, Moon, User, LogOut, Sparkles, Zap, Star, ArrowRight } from 'lucide-react';
import SocialLink from '../ui/SocialLink';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../common/LoginModal';
import PyramidAnimation from '../common/PyramidAnimation';
import { PERSONAL_INFO } from '../../constants/config';

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const { theme, toggleTheme } = useTheme();
  const { currentUser, isAdmin, login, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const containerRef = useRef(null);

  // Scroll-based parallax effects
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  // Smooth mouse follow effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useSpring(mousePosition.x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(mousePosition.y, { stiffness: 500, damping: 100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typewriter effect texts
  const typewriterTexts = [
    "Your vision deserves exceptional execution. 🚀",
    "Let's build something remarkable together. 💡",
    "Ready to transform your ideas into reality? ✨",
    "Your success story starts with the right code. 🎯",
    "Innovation meets expertise right here. 🏆",
    "Let's create the future, one line at a time. ⚡"
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentFullText = typewriterTexts[currentTextIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentFullText.length) {
          setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
          setTypingSpeed(100);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
          setTypingSpeed(50);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTextIndex, typingSpeed]);

  // Particle system
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  // Floating code snippets
  const codeSnippets = [
    { code: '<Component />', x: '10%', y: '20%', delay: 0 },
    { code: 'function build()', x: '85%', y: '15%', delay: 1 },
    { code: 'const success = true', x: '15%', y: '75%', delay: 2 },
    { code: 'return <Future />', x: '80%', y: '70%', delay: 3 },
    { code: 'AI.transform()', x: '50%', y: '10%', delay: 4 },
  ];

  // Stats with counter animation
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={login}
      />

      <section
        ref={containerRef}
        className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 ${
          theme === 'light' 
            ? 'bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50' 
            : 'bg-gradient-to-br from-gray-900 via-emerald-950 to-black'
        }`}
      >
        {/* Animated Grid Background */}
        <div className={`absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px] ${
          theme === 'light' ? 'opacity-50' : 'opacity-100'
        }`} />

        {/* Radial Gradient Overlay */}
        <div className={`absolute inset-0 ${
          theme === 'light' 
            ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)]' 
            : 'bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]'
        }`} />

        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${
              theme === 'light' ? 'bg-emerald-400/30' : 'bg-emerald-500/20'
            }`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Floating Code Snippets */}
        {codeSnippets.map((snippet, index) => (
          <motion.div
            key={index}
            className={`absolute hidden lg:block font-mono text-sm ${
              theme === 'light' ? 'text-emerald-600/15' : 'text-emerald-500/10'
            }`}
            style={{ left: snippet.x, top: snippet.y }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
              x: mouseX.get() * 20,
            }}
            transition={{
              duration: 4,
              delay: snippet.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {snippet.code}
          </motion.div>
        ))}

        {/* Animated Gradient Orbs */}
        <motion.div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-screen filter blur-3xl opacity-30 ${
            theme === 'light' ? 'bg-emerald-300/30' : 'bg-emerald-500/20'
          }`}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute top-1/3 right-1/4 w-96 h-96 rounded-full mix-blend-screen filter blur-3xl opacity-30 ${
            theme === 'light' ? 'bg-cyan-300/30' : 'bg-cyan-500/20'
          }`}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full mix-blend-screen filter blur-3xl opacity-30 ${
            theme === 'light' ? 'bg-purple-300/30' : 'bg-purple-500/20'
          }`}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 80, 0],
            y: [0, -80, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Mouse Follow Spotlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${50 + mouseX.get() * 50}% ${50 + mouseY.get() * 50}%, ${
              theme === 'light' 
                ? 'rgba(16, 185, 129, 0.08)' 
                : 'rgba(16, 185, 129, 0.1)'
            }, transparent 40%)`,
          }}
        />

        {/* Control Buttons - Top Right */}
        <div className="absolute top-4 right-4 z-50 flex gap-2">
          {/* Theme Toggle Button */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-full backdrop-blur-sm border transition-all duration-300 shadow-lg cursor-pointer ${
              theme === 'light'
                ? 'bg-amber-100/80 border-amber-300 hover:border-amber-400 text-amber-600 hover:text-amber-700 hover:shadow-amber-500/25'
                : 'bg-white/10 border-emerald-500/20 hover:border-emerald-500/50 text-emerald-400 hover:text-emerald-300 hover:shadow-emerald-500/25'
            }`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="w-6 h-6" />
            ) : (
              <Sun className="w-6 h-6" />
            )}
          </motion.button>

          {currentUser ? (
            <div className="flex items-center gap-2">
              <span className={`text-sm px-3 py-2 rounded-full border hidden sm:block ${
                theme === 'light'
                  ? 'bg-emerald-100/50 border-emerald-300 text-emerald-700'
                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              }`}>
                {isAdmin ? 'Admin' : 'User'}: {currentUser.name}
              </span>
              <motion.button
                onClick={logout}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full backdrop-blur-sm border transition-all duration-300 shadow-lg cursor-pointer ${
                  theme === 'light'
                    ? 'bg-red-100/80 border-red-300 hover:border-red-400 text-red-600 hover:text-red-700 hover:shadow-red-500/25'
                    : 'bg-white/10 border-red-500/20 hover:border-red-500/50 text-red-400 hover:text-red-300 hover:shadow-red-500/25'
                }`}
                aria-label="Logout"
              >
                <LogOut className="w-6 h-6" />
              </motion.button>
            </div>
          ) : (
            <motion.button
              onClick={() => setShowLoginModal(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-3 rounded-full backdrop-blur-sm border transition-all duration-300 shadow-lg cursor-pointer ${
                theme === 'light'
                  ? 'bg-emerald-100/80 border-emerald-300 hover:border-emerald-400 text-emerald-600 hover:text-emerald-700 hover:shadow-emerald-500/25'
                  : 'bg-white/10 border-emerald-500/20 hover:border-emerald-500/50 text-emerald-400 hover:text-emerald-300 hover:shadow-emerald-500/25'
              }`}
              aria-label="Login"
            >
              <User className="w-6 h-6" />
            </motion.button>
          )}
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          style={{ opacity, scale }}
          className="relative z-10 container mx-auto px-4 py-16"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div variants={itemVariants} className="text-center lg:text-left flex-1">
              {/* Availability Badge with Pulse */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`inline-block mb-4 px-4 py-2 border rounded-full relative overflow-hidden group cursor-pointer ${
                  theme === 'light'
                    ? 'bg-emerald-100/50 border-emerald-300'
                    : 'bg-emerald-500/10 border-emerald-500/20'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <span className={`relative z-10 text-sm font-medium flex items-center gap-2 ${
                  theme === 'light' ? 'text-emerald-700' : 'text-emerald-400'
                }`}>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    🚀
                  </motion.span>
                  Available for Hire
                  <Sparkles className="w-4 h-4" />
                </span>
              </motion.div>

              {/* Name with Gradient and Glow */}
              <motion.h1
                className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-300% animate-gradient">
                    {PERSONAL_INFO.name}
                  </span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>
              </motion.h1>

              {/* Title with Typing Animation Effect */}
              <motion.h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 ${
                  theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="inline-flex items-center gap-2">
                  <Zap className="w-6 h-6" />
                  {PERSONAL_INFO.title}
                </span>
              </motion.h2>

              {/* Description with Highlight */}
              <motion.p
                className={`text-lg max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Transforming ideas into{' '}
                <span className={`${theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'} font-semibold relative`}>
                  innovative solutions
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500/50"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  />
                </span>{' '}
                through cutting-edge technology, AI expertise, and strategic thinking.
              </motion.p>

              {/* Follow Hamman Social Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className={`mb-6 p-4 rounded-2xl border-2 inline-block ${
                  theme === 'light'
                    ? 'bg-white/80 border-emerald-300 shadow-lg shadow-emerald-500/10'
                    : 'bg-white/5 border-emerald-500/30 shadow-lg shadow-emerald-500/20'
                }`}
              >
                <p className={`text-sm font-bold mb-3 text-center ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  🔔 Follow Hamman
                </p>
                <div className="flex gap-3">
                  {/* GitHub */}
                  <motion.a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative group p-3 rounded-xl transition-all duration-300 ${
                      theme === 'light'
                        ? 'bg-gray-900 text-white hover:bg-gray-800'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    } shadow-lg hover:shadow-xl`}
                    title="Follow on GitHub"
                  >
                    <Github className="w-6 h-6" />
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: -35 }}
                      className="absolute left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg whitespace-nowrap pointer-events-none"
                    >
                      GitHub 👨‍💻
                    </motion.span>
                  </motion.a>
                  
                  {/* LinkedIn */}
                  <motion.a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative group p-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800"
                    title="Connect on LinkedIn"
                  >
                    <Linkedin className="w-6 h-6" />
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: -35 }}
                      className="absolute left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg whitespace-nowrap pointer-events-none"
                    >
                      LinkedIn 💼
                    </motion.span>
                  </motion.a>
                  
                  {/* Email */}
                  <motion.a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative group p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-cyan-600"
                    title="Send Email"
                  >
                    <Mail className="w-6 h-6" />
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: -35 }}
                      className="absolute left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg whitespace-nowrap pointer-events-none"
                    >
                      Email ✉️
                    </motion.span>
                  </motion.a>
                </div>
              </motion.div>

              {/* CTA Buttons with Advanced Effects */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                {/* Social Links */}
                <div className="flex gap-4">
                  <motion.a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 backdrop-blur-sm rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                      theme === 'light'
                        ? 'bg-gray-100/80 border-gray-300 hover:border-gray-400'
                        : 'bg-white/10 border-gray-500/20 hover:border-gray-400/50'
                    }`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-gray-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <Github className={`w-6 h-6 transition-colors relative z-10 ${
                      theme === 'light' ? 'text-gray-600 group-hover:text-gray-800' : 'text-gray-300 group-hover:text-white'
                    }`} />
                  </motion.a>
                  <motion.a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 backdrop-blur-sm rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                      theme === 'light'
                        ? 'bg-blue-100/80 border-blue-300 hover:border-blue-400'
                        : 'bg-white/10 border-blue-500/20 hover:border-blue-400/50'
                    }`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <Linkedin className={`w-6 h-6 transition-colors relative z-10 ${
                      theme === 'light' ? 'text-blue-600 group-hover:text-blue-800' : 'text-blue-400 group-hover:text-blue-300'
                    }`} />
                  </motion.a>
                </div>

                {/* Download CV Button */}
                <motion.a
                  href="/Hamman_Muraya_Complete_CV.pdf"
                  download
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group px-8 py-4 backdrop-blur-sm font-medium rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden ${
                    theme === 'light'
                      ? 'bg-emerald-100/80 text-emerald-700 border border-emerald-300 hover:border-emerald-400 hover:shadow-emerald-500/25'
                      : 'bg-white/10 text-emerald-400 border border-emerald-500/20 hover:shadow-xl'
                  }`}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <Download className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span className="relative z-10">Download CV</span>
                </motion.a>

                {/* Primary CTA Button */}
                {!currentUser ? (
                  <motion.button
                    onClick={() => setShowLoginModal(true)}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-8 py-4 bg-gradient-to-r from-emerald-600 via-cyan-600 to-emerald-600 bg-300% text-white font-medium rounded-xl shadow-lg hover:shadow-emerald-500/50 transform transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <User className="w-5 h-5" />
                    <span className="relative z-10">Admin Login</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={logout}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-8 py-4 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-300% text-white font-medium rounded-xl shadow-lg hover:shadow-red-500/50 transform transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="relative z-10">Logout</span>
                  </motion.button>
                )}
              </motion.div>

              {/* Quick Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className={`mt-8 flex flex-wrap gap-4 justify-center lg:justify-start text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                <motion.a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  whileHover={{ scale: 1.05, color: theme === 'light' ? '#059669' : '#34d399' }}
                  className={`flex items-center gap-2 transition-colors ${
                    theme === 'light' ? 'hover:text-emerald-600' : 'hover:text-emerald-400'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  {PERSONAL_INFO.email}
                </motion.a>
                <span className="hidden sm:inline">•</span>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2"
                >
                  <Star className={`w-4 h-4 ${theme === 'light' ? 'text-yellow-600' : 'text-yellow-500'}`} />
                  Top Rated Developer
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Right Side - Pyramid + Typewriter */}
            <motion.div
              variants={itemVariants}
              className="relative flex flex-col items-center gap-6"
              style={{ y: y2 }}
            >
              {/* Decorative Ring */}
              <motion.div
                className={`absolute inset-0 rounded-full border ${
                  theme === 'light' ? 'border-emerald-300/30' : 'border-emerald-500/10'
                }`}
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ width: 400, height: 400, left: '50%', top: '50%', marginLeft: -200, marginTop: -200 }}
              />
              <motion.div
                className={`absolute inset-0 rounded-full border ${
                  theme === 'light' ? 'border-cyan-300/30' : 'border-cyan-500/10'
                }`}
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{ width: 350, height: 350, left: '50%', top: '50%', marginLeft: -175, marginTop: -175 }}
              />

              <PyramidAnimation />

              {/* Typewriter Effect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 max-w-md mx-auto w-full"
              >
                <div className={`relative backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg ${
                  theme === 'light'
                    ? 'bg-emerald-50/80 border border-emerald-200 shadow-emerald-500/10'
                    : 'bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 shadow-emerald-500/10'
                }`}>
                  <div className="flex items-center gap-3">
                    <motion.span
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-2xl"
                    >
                      💬
                    </motion.span>
                    <div className="flex-1">
                      <p className={`font-medium text-sm md:text-base min-h-[1.5rem] ${
                        theme === 'light' ? 'text-emerald-700' : 'text-emerald-300'
                      }`}>
                        {displayedText}
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className={`inline-block w-0.5 h-5 ml-1 align-middle ${
                            theme === 'light' ? 'bg-emerald-600' : 'bg-emerald-400'
                          }`}
                        />
                      </p>
                    </div>
                  </div>
                  {/* Decorative corners */}
                  <div className={`absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 rounded-tl-lg ${
                    theme === 'light' ? 'border-emerald-400' : 'border-emerald-500/50'
                  }`} />
                  <div className={`absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 rounded-tr-lg ${
                    theme === 'light' ? 'border-emerald-400' : 'border-emerald-500/50'
                  }`} />
                  <div className={`absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 rounded-bl-lg ${
                    theme === 'light' ? 'border-emerald-400' : 'border-emerald-500/50'
                  }`} />
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 rounded-br-lg ${
                    theme === 'light' ? 'border-emerald-400' : 'border-emerald-500/50'
                  }`} />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats Section with Counter Animation */}
          <motion.div
            ref={statsRef}
            variants={itemVariants}
            className="mt-20"
          >
            <div className="relative">
              {/* Background Glow */}
              <div className={`absolute inset-0 rounded-3xl blur-3xl ${
                theme === 'light' 
                  ? 'bg-gradient-to-r from-emerald-200/30 via-cyan-200/30 to-emerald-200/30' 
                  : 'bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-emerald-500/5'
              }`} />

              <div className={`relative grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl border ${
                theme === 'light'
                  ? 'bg-white/70 backdrop-blur-xl border-emerald-200'
                  : 'bg-white/5 backdrop-blur-xl border-emerald-500/10'
              }`}>
                {[
                  { number: '5+', label: 'Years Experience', icon: '🎯', color: 'from-emerald-400 to-cyan-400' },
                  { number: '50+', label: 'Projects Completed', icon: '🚀', color: 'from-cyan-400 to-blue-400' },
                  { number: '15+', label: 'Happy Clients', icon: '😊', color: 'from-purple-400 to-pink-400' },
                  { number: '10+', label: 'AI Models Trained', icon: '🤖', color: 'from-orange-400 to-red-400' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={statsVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className={`text-4xl mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, delay: index * 0.1, repeat: Infinity }}
                    >
                      {stat.icon}
                    </motion.div>
                    <motion.div
                      className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      initial={{ opacity: 0 }}
                      animate={statsVisible ? { opacity: 1 } : {}}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className={`text-sm mt-1 ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
