"use client";
// src/admin/AuthContext.jsx

import React, { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check localStorage on initial render
    const savedUser = localStorage.getItem("adminAuth");
    return savedUser === "true" ? { role: "admin" } : null;
  });
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      // Your authentication logic here
      if (
        credentials.email === "admin@flyyourtech.com" &&
        credentials.password === "admin123"
      ) {
        localStorage.setItem("adminAuth", "true");
        setUser({ role: "admin" });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      localStorage.removeItem("adminAuth");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
