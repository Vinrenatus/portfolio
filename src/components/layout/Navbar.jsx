import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code, Sparkles, ArrowRight } from 'lucide-react';
import NavLink from './NavLink';
import MobileNavLink from './MobileNavLink';
import { PERSONAL_INFO } from '../../constants/config';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Detect active section
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  const navItems = [
    { name: 'Home', path: '#home', icon: '🏠' },
    { name: 'About', path: '#about', icon: '👤' },
    { name: 'Skills', path: '#skills', icon: '⚡' },
    { name: 'Projects', path: '#projects', icon: '🚀' },
    { name: 'Experience', path: '#experience', icon: '💼' },
    { name: 'Contact', path: '#contact', icon: '📧' },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 z-[9999] shadow-lg shadow-emerald-500/50"
        style={{ 
          width: `${scrollProgress}%`,
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)'
        }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'glass-dark shadow-lg shadow-emerald-500/20 backdrop-blur-xl' 
            : 'bg-transparent'
        }`}
      >
        {/* Animated background gradient on scroll */}
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-cyan-500/5"
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="#home" 
                onClick={(e) => scrollToSection(e, '#home')}
                className="flex items-center gap-3 group"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-lg blur-lg group-hover:bg-emerald-500/40 transition-all" />
                  <Code className="w-8 h-8 text-emerald-400 relative z-10" />
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-300% bg-clip-text text-transparent animate-gradient-shift">
                    {PERSONAL_INFO.name}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Software Engineer & AI Specialist
                  </span>
                </div>
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.path}
                    onClick={(e) => scrollToSection(e, item.path)}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                      activeSection === item.path.substring(1)
                        ? 'text-emerald-400'
                        : 'text-gray-300 hover:text-emerald-400'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Active/Hover background */}
                    <motion.div
                      className={`absolute inset-0 rounded-lg ${
                        activeSection === item.path.substring(1)
                          ? 'bg-emerald-500/10'
                          : 'bg-transparent group-hover:bg-emerald-500/5'
                      }`}
                      layoutId="activeNav"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                    
                    {/* Content */}
                    <span className="relative z-10 flex items-center gap-2">
                      <span>{item.icon}</span>
                      {item.name}
                    </span>

                    {/* Bottom indicator */}
                    {activeSection === item.path.substring(1) && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                      />
                    )}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden md:block">
              <motion.a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white text-sm font-medium rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Let's Talk
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg glass-dark text-emerald-400 hover:text-emerald-300 transition-all duration-300 border border-emerald-500/20 hover:border-emerald-500/50"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glass-dark border-t border-emerald-500/20 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.path}
                    onClick={(e) => scrollToSection(e, item.path)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                      activeSection === item.path.substring(1)
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/5'
                    }`}
                    whileHover={{ x: 10 }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {item.name}
                    {activeSection === item.path.substring(1) && (
                      <motion.div
                        layoutId="mobileActive"
                        className="ml-auto w-2 h-2 rounded-full bg-emerald-400"
                      />
                    )}
                  </motion.a>
                ))}
                
                {/* Mobile CTA */}
                <motion.a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center gap-2 px-6 py-3 mt-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-medium rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Let's Talk</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
