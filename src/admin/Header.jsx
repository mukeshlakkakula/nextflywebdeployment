// admin/Header.jsx
"use client";

import React from "react";
import { useAuth } from "./AuthContext";
import { FiBell, FiUser, FiSettings } from "react-icons/fi";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-semibold text-gray-800">
            Admin Dashboard
          </h1>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <FiBell className="w-6 h-6" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <div className="flex items-center gap-2">
                <img
                  src={user?.photoURL || "https://via.placeholder.com/32"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">
                  {user?.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
