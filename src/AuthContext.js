// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const authenticateUser = (user) => {
    setAuthenticatedUser(user);
  };

  const logout = () => {
    setAuthenticatedUser(null);
  };

  return (
    <AuthContext.Provider value={{ authenticatedUser, authenticateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
