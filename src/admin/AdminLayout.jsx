"use client";
// src/admin/AdminLayout.jsx
import React from "react";
// import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        {/* <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main> */}
      </div>
    </div>
  );
};

export default AdminLayout;