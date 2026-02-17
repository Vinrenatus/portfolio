import React from 'react';

const MobileNavLink = ({ href, onClick, children }) => (
  <a
    href={href}
    onClick={onClick}
    className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-emerald-400 hover:bg-white/5 rounded-lg transition-all duration-300"
  >
    {children}
  </a>
);

export default MobileNavLink;