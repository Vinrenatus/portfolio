import React from 'react';

const MobileNavLink = ({ icon, text }) => (
  <a
    href={`#${text.toLowerCase()}`}
    className="flex items-center px-3 py-2 text-base font-medium text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 transition-colors rounded-md"
  >
    {icon}
    <span className="ml-2">{text}</span>
  </a>
);

export default MobileNavLink;