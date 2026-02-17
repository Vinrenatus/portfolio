import React from 'react';

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="relative px-3 py-2 text-sm font-medium text-gray-300 hover:text-emerald-400 transition-all duration-300 group"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
  </a>
);

export default NavLink;