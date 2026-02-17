import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Code } from 'lucide-react';
import NavLink from './NavLink';
import MobileNavLink from './MobileNavLink';
import { PERSONAL_INFO } from '../../constants/config';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass-dark shadow-lg shadow-emerald-500/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Code className="w-8 h-8 text-emerald-400" />
              </motion.div>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                {PERSONAL_INFO.name}
              </span>
            </div>
          </motion.div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink href="#home">Home</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#skills">Skills</NavLink>
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#experience">Experience</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg glass-dark text-emerald-400 hover:text-emerald-300 transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-dark border-t border-emerald-500/20"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileNavLink>
            <MobileNavLink href="#skills" onClick={() => setIsMobileMenuOpen(false)}>Skills</MobileNavLink>
            <MobileNavLink href="#projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</MobileNavLink>
            <MobileNavLink href="#experience" onClick={() => setIsMobileMenuOpen(false)}>Experience</MobileNavLink>
            <MobileNavLink href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</MobileNavLink>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;