import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Code, 
  Sparkles, 
  Heart, 
  ArrowUp,
  ExternalLink,
  MapPin,
  Phone,
  Calendar
} from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../constants/config';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', path: '#home' },
    { name: 'About', path: '#about' },
    { name: 'Skills', path: '#skills' },
    { name: 'Projects', path: '#projects' },
    { name: 'Experience', path: '#experience' },
    { name: 'Contact', path: '#contact' },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: PERSONAL_INFO.github, color: 'hover:text-gray-300' },
    { name: 'LinkedIn', icon: Linkedin, url: PERSONAL_INFO.linkedin, color: 'hover:text-blue-400' },
    { name: 'Email', icon: Mail, url: `mailto:${PERSONAL_INFO.email}`, color: 'hover:text-emerald-400' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-emerald-950/20 to-black border-t border-emerald-500/10">
      {/* Animated background */}
      <div className="absolute inset-0 bg-tech-grid opacity-5" />
      <div className="absolute inset-0 bg-particles opacity-20" />
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-full shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 group"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Code className="w-10 h-10 text-emerald-400" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-sm text-gray-400">Software Engineer & AI Specialist</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transforming ideas into innovative solutions through cutting-edge technology and AI expertise.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 pt-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className={`p-3 rounded-xl bg-white/5 border border-white/10 ${social.color} transition-all duration-300`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-emerald-400 mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                >
                  <a
                    href={link.path}
                    className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-emerald-400 mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact
            </h4>
            <ul className="space-y-4">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-3 group"
              >
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  {PERSONAL_INFO.email}
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="flex items-start gap-3 group"
              >
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <a href={`tel:${PERSONAL_INFO.phone}`} className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  {PERSONAL_INFO.phone}
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-3 group"
              >
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-gray-400 text-sm">{PERSONAL_INFO.location}</span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Available Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-emerald-400 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Availability
            </h4>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50"
                />
                <span className="text-emerald-400 font-semibold">Available for Hire</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Open to full-time opportunities and freelance projects
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 group"
              >
                Get in Touch
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-emerald-500/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-500 text-sm text-center md:text-left"
            >
              © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-500 text-sm flex items-center gap-2"
            >
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> and lots of ☕
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
