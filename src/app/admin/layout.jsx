// components/Layout/AdminLayout.jsx
"use client";

import React from "react";
import { Header } from "@/admin";
import Sidebar from "@/admin/Sidebar";
import { AuthProvider } from "@/admin/AuthContext";
import PrivateRoute from "@/admin/PrivateRoute";
import { LeadProvider } from "@/admin/LeadsContext";
const AdminLayout = ({ children }) => {
  return (
    <AuthProvider>
      <LeadProvider>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto ">
              <PrivateRoute>
                {children} {/* Render the page content passed as children */}
              </PrivateRoute>{" "}
            </main>
          </div>
        </div>
      </LeadProvider>
    </AuthProvider>
  );
};

export default AdminLayout;
