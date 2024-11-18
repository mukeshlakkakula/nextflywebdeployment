// app/admin/PrivateRoute.js
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/adminlogin");
    }
  }, [loading, user, router]);

  if (loading) {
    return <p>Loading...</p>; // Show a loading indicator while checking auth
  }

  return user ? children : null;
};

export default PrivateRoute;
