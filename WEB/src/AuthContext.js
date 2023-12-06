// AuthContext.js

import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const updateAuthStatus = (username) => {
    setIsLoggedIn(!!username);
    setIsAdmin(username === 'Root');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, updateAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
