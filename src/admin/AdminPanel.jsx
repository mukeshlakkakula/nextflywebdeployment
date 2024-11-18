"use client";

import React, { useState, useEffect } from "react";
import { auth } from "../firebase.config";
import { useRouter } from "next/navigation";
import Login from "./Login";
import Dashboard from "./Dashboard";

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-900"></div>
      </div>
    );
  }

  // Redirect to home if not logged in
  if (!isLoggedIn) {
    router.replace("/");
    return null;
  }

  return <Dashboard />;
};

export default AdminPanel;
