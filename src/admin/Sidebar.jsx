"use client";

import React from "react";
import Link from "next/link"; // Use Next.js's Link component for navigation
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation"; // For navigation and routing
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiPlusCircle,
} from "react-icons/fi";
import { useAuth } from "./AuthContext"; // Assuming your auth context is unchanged

const Sidebar = () => {
  const { logout } = useAuth();
  const router = useRouter(); // Use useRouter from Next.js for programmatic navigation

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/adminlogin"); // Navigate to login after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white h-screen shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-purple-900">FlyYourTech</h1>
      </div>

      <nav className="mt-6">
        <Link href="/admin/dashboard">
          <li
            type="button"
            className={`flex items-center px-6 py-3 text-gray-600 ${
              pathname === "/admin/dashboard"
                ? "bg-purple-50 border-r-4 border-purple-500"
                : "hover:bg-gray-50"
            }`}
          >
            <FiHome className="h-5 w-5" />
            <span className="mx-4">Dashboard</span>
          </li>
        </Link>

        <Link href="/admin/leads">
          <li
            className={`flex items-center px-6 py-3 text-gray-600 ${
              pathname === "/admin/leads"
                ? "bg-purple-50 border-r-4 border-purple-500"
                : "hover:bg-gray-50"
            }`}
          >
            <FiUsers className="h-5 w-5" />
            <span className="mx-4">Leads</span>
          </li>
        </Link>

        <Link href="/admin/leads/new">
          <li
            className={`flex items-center px-6 py-3 text-gray-600 ${
              pathname === "/admin/leads/new"
                ? "bg-purple-50 border-r-4 border-purple-500"
                : "hover:bg-gray-50"
            }`}
          >
            <FiPlusCircle className="h-5 w-5" />
            <span className="mx-4">Add Lead</span>
          </li>
        </Link>
        {/* href="/admin/settings" */}
        <Link href="/">
          <li
            className={`flex items-center px-6 py-3 text-gray-600 ${
              pathname === "/admin/settings"
                ? "bg-purple-50 border-r-4 border-purple-500"
                : "hover:bg-gray-50"
            }`}
          >
            <FiSettings className="h-5 w-5" />
            <span className="mx-4">Settings</span>
          </li>
        </Link>
      </nav>

      <div className="absolute bottom-0 w-64 p-6">
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          <FiLogOut className="h-5 w-5" />
          <span className="mx-4">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
