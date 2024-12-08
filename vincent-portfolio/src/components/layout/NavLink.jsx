import React from 'react';

const NavLink = ({ icon, text }) => (
  <a
    href={`#${text.toLowerCase()}`}
    className="flex items-center px-3 py-2 text-sm font-medium text-emerald-700 hover:text-emerald-900 transition-colors"
  >
    {icon}
    <span className="ml-2">{text}</span>
  </a>
);

export default NavLink;