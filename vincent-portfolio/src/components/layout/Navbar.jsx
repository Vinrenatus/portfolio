import React, { useState, useEffect } from 'react';
import { Menu, X, Code, BookOpen, Pen, Brain } from 'lucide-react';
import NavLink from './NavLink';
import MobileNavLink from './MobileNavLink';

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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
              Vincent Irungu
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink icon={<Code className="w-4 h-4" />} text="Development" />
              <NavLink icon={<BookOpen className="w-4 h-4" />} text="Tutoring" />
              <NavLink icon={<Pen className="w-4 h-4" />} text="Writing" />
              <NavLink icon={<Brain className="w-4 h-4" />} text="Skills" />
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-emerald-700 hover:text-emerald-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <MobileNavLink icon={<Code className="w-4 h-4" />} text="Development" />
            <MobileNavLink icon={<BookOpen className="w-4 h-4" />} text="Tutoring" />
            <MobileNavLink icon={<Pen className="w-4 h-4" />} text="Writing" />
            <MobileNavLink icon={<Brain className="w-4 h-4" />} text="Skills" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;