import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on initial load
    const loggedInUser = localStorage.getItem('currentUser');
    const userRole = localStorage.getItem('userRole');
    
    if (loggedInUser) {
      setCurrentUser(JSON.parse(loggedInUser));
    }
    
    if (userRole === 'admin') {
      setIsAdmin(true);
    }
    
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Admin credentials check (configured via environment variables)
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'hamanmuraya009@gmail.com';
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'Lovelight369$';
    
    if (email === adminEmail && password === adminPassword) {
      const user = {
        id: 1,
        email: adminEmail,
        name: 'Hamman Muraya',
        role: 'admin'
      };

      setCurrentUser(user);
      setIsAdmin(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('userRole', 'admin');
      return true;
    } else {
      // Regular user
      const user = {
        id: 2,
        email: email,
        name: email.split('@')[0],
        role: 'user'
      };

      setCurrentUser(user);
      setIsAdmin(false);
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('userRole', 'user');
      return true;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
  };

  const value = {
    currentUser,
    isAdmin,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};