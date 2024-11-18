"use client";
// pages/admin/login.jsx
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiAlertCircle } from "react-icons/fi";

const Login = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if the user is already logged in (simulate context behavior)
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("adminAuth")) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (
        credentials.email === "admin@flyyourtech.com" &&
        credentials.password === "admin123"
      ) {
        localStorage.setItem("adminAuth", "true");
        localStorage.setItem(
          "adminUser",
          JSON.stringify({
            email: credentials.email,
            role: "admin",
          })
        );
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#1a2156] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1a2156] p-8 rounded-xl shadow-xl w-full max-w-md relative overflow-hidden"
      >
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Login to access your dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-white text-sm font-medium block mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2a3166] text-white border border-[#913bfe]/20 focus:border-[#913bfe] focus:ring-1 focus:ring-[#913bfe] transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-white text-sm font-medium block mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2a3166] text-white border border-[#913bfe]/20 focus:border-[#913bfe] focus:ring-1 focus:ring-[#913bfe] transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 text-red-500 bg-red-500/10 p-3 rounded-lg"
              >
                <FiAlertCircle />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`
              w-full bg-[#913bfe] text-white py-3 rounded-lg font-medium
              transform transition-all duration-200
              ${
                isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-[#913bfe]/90 hover:scale-[1.02]"
              }
            `}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
