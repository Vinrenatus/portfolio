// Utility functions for Hamman Muraya's portfolio

/**
 * Formats a phone number for display
 * @param {string} phoneNumber - Raw phone number
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  
  return phoneNumber;
};

/**
 * Generates a random ID
 * @returns {string} Random ID
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Capitalizes the first letter of a string
 * @param {string} str - Input string
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncates a string to a specified length
 * @param {string} str - Input string
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated string with ellipsis
 */
export const truncateString = (str, maxLength) => {
  if (!str || str.length <= maxLength) return str;
  return `${str.substring(0, maxLength)}...`;
};

/**
 * Validates an email address
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Formats currency amount
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};