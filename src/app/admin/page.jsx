"use client";
import React from "react";
// import Login from "@/admin/Login";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const Admin = () => {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("adminAuth")) {
      router.push("/adminlogin");
    }
  }, [router]);
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 p-4">
        Admin panel is Loading...
      </h1>
    </div>
  );
};

export default Admin;
