// src/contexts/LeadContext.jsx
"use client";

import React, { createContext, useContext, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase.config"; // Assuming the firebase config is the same

const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addLead = async (leadData) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = await addDoc(collection(db, "leads"), {
        ...leadData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      setLoading(false);
      return docRef.id;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const updateLead = async (id, leadData) => {
    setLoading(true);
    setError(null);
    try {
      const leadRef = doc(db, "leads", id);
      await updateDoc(leadRef, {
        ...leadData,
        updatedAt: Timestamp.now(),
      });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const deleteLead = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteDoc(doc(db, "leads", id));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return (
    <LeadContext.Provider
      value={{
        loading,
        error,
        addLead,
        updateLead,
        deleteLead,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error("useLeads must be used within a LeadProvider");
  }
  return context;
};
