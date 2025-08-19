// client/src/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for a token in local storage on initial load
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = (navigate) => {
     console.log("Logout function called"); 
    localStorage.removeItem('token');
    setIsAuthenticated(false);
     if (navigate) {
      navigate('/login'); // 👈 Redirect after logout
    }
  
  };

  return (
    <authContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

export default authContext;