import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Mail, Download, Code, Cpu, Database, Sun, Moon, User, LogOut } from 'lucide-react';
import SocialLink from '../ui/SocialLink';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../common/LoginModal';
import { PERSONAL_INFO } from '../../constants/config';

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const { theme, toggleTheme } = useTheme();
  const { currentUser, isAdmin, login, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = React.useState(false);

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

  const techIcons = [
    { icon: Code, delay: 0, position: 'top-20 left-10' },
    { icon: Cpu, delay: 0.5, position: 'top-40 right-20' },
    { icon: Database, delay: 1, position: 'bottom-40 left-20' },
  ];

  return (
    <>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={login}
      />
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Control Buttons - Top Right */}
        <div className="absolute top-4 right-4 z-50 flex gap-2">
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 text-emerald-400 hover:text-emerald-300 cursor-pointer shadow-lg hover:shadow-emerald-500/25"
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
              <span className="text-sm text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-full border border-emerald-500/20 hidden sm:block">
                {isAdmin ? 'Admin' : 'User'}: {currentUser.name}
              </span>
              <motion.button
                onClick={logout}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-red-500/20 hover:border-red-500/50 transition-all duration-300 text-red-400 hover:text-red-300 cursor-pointer shadow-lg hover:shadow-red-500/25"
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
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 text-emerald-400 hover:text-emerald-300 cursor-pointer shadow-lg hover:shadow-emerald-500/25"
              aria-label="Login"
            >
              <User className="w-6 h-6" />
            </motion.button>
          )}
        </div>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Tech grid pattern */}
        <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Floating tech icons */}
        {techIcons.map((Tech, index) => (
          <motion.div
            key={index}
            className={`absolute ${Tech.position} text-emerald-500/10`}
            initial={{ opacity: 0, y: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 5,
              delay: Tech.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Tech.icon size={120} strokeWidth={0.5} />
          </motion.div>
        ))}
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative z-10 container mx-auto px-4 py-16"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div variants={itemVariants} className="text-center lg:text-left flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full"
            >
              <span className="text-emerald-400 text-sm font-medium">🚀 Available for Hire</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight">
              <span className="text-gradient-animated">
                {PERSONAL_INFO.name}
              </span>
            </h1>

            <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-400 mb-6">
              {PERSONAL_INFO.title}
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-8">
              Transforming ideas into innovative solutions through cutting-edge technology,
              AI expertise, and strategic thinking.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* GitHub & LinkedIn Icons */}
              <div className="flex gap-4">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-gray-500/20 hover:border-gray-400/50 transition-all duration-300 hover:scale-110 group"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-110 group"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                </a>
              </div>
              
              <a
                href="/Hamman_Muraya_Complete_CV.pdf"
                download
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-emerald-400 font-medium rounded-lg shadow-lg hover:shadow-xl border border-emerald-500/20 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
              >
                <Download className="w-5 h-5" /> Download CV
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative"
          >
            {/* Animated ring around profile */}
            <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-spin-slow" style={{ animationDuration: '20s' }}></div>
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-spin-slow" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
            
            <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden ring-4 ring-emerald-500/50 shadow-2xl animate-pulse-glow">
              <img
                src="https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg"
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-blob"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-500 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 -left-8 w-16 h-16 bg-purple-500 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
          </motion.div>
        </div>

        <motion.div 
          variants={itemVariants} 
          className="mt-16 flex flex-wrap justify-center gap-6"
        >
          {[
            { number: '5+', label: 'Years Experience', icon: '🎯' },
            { number: '50+', label: 'Projects Completed', icon: '🚀' },
            { number: '15+', label: 'Happy Clients', icon: '😊' },
            { number: '10+', label: 'AI Models Trained', icon: '🤖' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 card-hover"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-emerald-400">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
    </>
  );
};

export default Hero;