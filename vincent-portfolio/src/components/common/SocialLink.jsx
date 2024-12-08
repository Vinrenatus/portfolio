import React from 'react';

const SocialLink = ({ href, icon, label, className }) => (
  <a
    href={href}
    className={`transform hover:scale-110 transition-transform duration-200 ${className}`}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </a>
);

export default SocialLink;