import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LeadForm = ({
  formData,
  setFormData,
  isSubmitting,
  onSubmit,
  isDiscountEligible,
  isPopup = false,
}) => {
  const [focusedField, setFocusedField] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const services = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Digital Marketing",
    "E-commerce Solutions",
    "Custom Software Development",
    "Cloud Services",
    "AI & ML Solutions",
  ];

  const budgetRanges = [
    "Less than 5,000",
    "5,000 - 10,000",
    "10,000 - 25,000",
    "25,000 - 50,000",
    "More than 50,000",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const formVariants = {
    hidden: {
      opacity: 0,
      y: isPopup ? 50 : 20,
      scale: isPopup ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        staggerChildren: 0.15,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
  };

  const inputVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
      },
    },
  };

  const serviceVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 20,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 150,
      },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(145, 59, 254, 0.15)",
      boxShadow: "0 0 20px rgba(145, 59, 254, 0.2)",
      transition: { duration: 0.3 },
    },
    tap: {
      scale: 0.95,
    },
  };

  const labelVariants = {
    initial: { y: 0, opacity: 0.7 },
    focus: {
      y: -25,
      opacity: 1,
      color: "#913bfe",
      scale: 0.85,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
      },
    },
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      className={`space-y-6 p-8 rounded-2xl relative overflow-hidden ${
        isPopup
          ? "bg-gradient-to-br from-[#1a1a2e]/95 to-[#2a2a4e]/95 backdrop-blur-lg"
          : "bg-gradient-to-br from-[#1a1a2e]/80 to-[#1a1a2e]"
      }`}
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Decorative Elements */}
      {isPopup && (
        <>
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-[#913bfe]/10 rounded-full -translate-y-1/2 translate-x-1/2"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-24 h-24 bg-[#913bfe]/10 rounded-full translate-y-1/2 -translate-x-1/2"
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </>
      )}

      {/* Form Header */}
      {isPopup && (
        <motion.div variants={inputVariants} className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Claim Your 10% Discount
          </h2>
          <p className="text-gray-400">
            Fill out the form below to get started with your project
          </p>
        </motion.div>
      )}

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <motion.div variants={inputVariants} className="relative">
          <motion.label
            variants={labelVariants}
            initial="initial"
            animate={
              focusedField === "name" || formData.name ? "focus" : "initial"
            }
            className="absolute left-3 text-gray-400 pointer-events-none"
          >
            Name *
          </motion.label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            required
            className="w-full bg-[#1a1a2e] text-white border border-[#913bfe]/20 rounded-lg p-3 focus:outline-none focus:border-[#913bfe] transition-all duration-300 hover:border-[#913bfe]/50"
          />
        </motion.div>

        {/* Email Field */}
        <motion.div variants={inputVariants} className="relative">
          <motion.label
            variants={labelVariants}
            initial="initial"
            animate={
              focusedField === "email" || formData.email ? "focus" : "initial"
            }
            className="absolute left-3 text-gray-400 pointer-events-none"
          >
            Email *
          </motion.label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            required
            className="w-full bg-[#1a1a2e] text-white border border-[#913bfe]/20 rounded-lg p-3 focus:outline-none focus:border-[#913bfe] transition-all duration-300 hover:border-[#913bfe]/50"
          />
        </motion.div>
      </div>

      {/* Phone Field */}
      <motion.div variants={inputVariants} className="relative">
        <motion.label
          variants={labelVariants}
          initial="initial"
          animate={
            focusedField === "phone" || formData.phone ? "focus" : "initial"
          }
          className="absolute left-3 text-gray-400 pointer-events-none"
        >
          Phone *
        </motion.label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onFocus={() => setFocusedField("phone")}
          onBlur={() => setFocusedField(null)}
          required
          className="w-full bg-[#1a1a2e] text-white border border-[#913bfe]/20 rounded-lg p-3 focus:outline-none focus:border-[#913bfe] transition-all duration-300 hover:border-[#913bfe]/50"
        />
      </motion.div>

      {/* Services Section */}
      <motion.div variants={inputVariants}>
        <label className="block text-white mb-4">Services Required *</label>

        {/* Selected Services Chips */}
        <div className="flex flex-wrap gap-2 mb-3">
          {formData.services.map((service) => (
            <motion.span
              key={service}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#913bfe]/20 text-white border border-[#913bfe]/30"
            >
              {service}
              <button
                type="button"
                onClick={() => handleServiceToggle(service)}
                className="ml-2 text-white/70 hover:text-white focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </motion.span>
          ))}
        </div>

        {isMobile ? (
          <div className="relative">
            <select
              name="services"
              value=""
              onChange={(e) => {
                if (e.target.value) {
                  handleServiceToggle(e.target.value);
                  e.target.value = ""; // Reset select after selection
                }
              }}
              className="w-full bg-[#1a1a2e] text-white border border-[#913bfe]/20 rounded-lg p-3 focus:outline-none focus:border-[#913bfe] transition-all duration-300 hover:border-[#913bfe]/50"
            >
              <option value="">Select services...</option>
              {services
                .filter((service) => !formData.services.includes(service))
                .map((service) => (
                  <option key={service} value={service} className="p-2">
                    {service}
                  </option>
                ))}
            </select>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <motion.label
                key={service}
                variants={serviceVariants}
                whileHover="hover"
                whileTap="tap"
                className={`flex items-center space-x-2 cursor-pointer p-3 rounded-lg border transition-all duration-300 ${
                  formData.services.includes(service)
                    ? "border-[#913bfe] bg-[#913bfe]/10"
                    : "border-[#913bfe]/20 hover:border-[#913bfe]/50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.services.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  className="form-checkbox text-[#913bfe] h-4 w-4"
                />
                <span className="text-gray-300 text-sm">{service}</span>
              </motion.label>
            ))}
          </div>
        )}

        {isMobile && formData.services.length === 0 && (
          <p className="text-sm text-gray-400 mt-2">
            Select services from the dropdown above
          </p>
        )}
      </motion.div>

      {/* Budget Range */}
      <motion.div variants={inputVariants} className="relative">
        <label className="block text-white mb-2">Budget Range</label>
        <select
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full bg-[#1a1a2e] text-white border border-[#913bfe]/20 rounded-lg p-3 focus:outline-none focus:border-[#913bfe] transition-all duration-300 hover:border-[#913bfe]/50"
        >
          <option value="">Select budget range</option>
          {budgetRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Message Field */}
      <motion.div variants={inputVariants} className="relative">
        <motion.label
          variants={labelVariants}
          initial="initial"
          animate={
            focusedField === "message" || formData.message ? "focus" : "initial"
          }
          className="absolute left-3 text-gray-400 pointer-events-none"
        >
          Message
        </motion.label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          onFocus={() => setFocusedField("message")}
          onBlur={() => setFocusedField(null)}
          rows="4"
          className="w-full bg-[#1a1a2e] text-white border border-[#913bfe]/20 rounded-lg p-3 focus:outline-none focus:border-[#913bfe] transition-all duration-300 hover:border-[#913bfe]/50"
        ></textarea>
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-gradient-to-r from-[#913bfe] to-[#7b32d7] text-white py-4 rounded-lg font-semibold
          relative overflow-hidden group
          ${
            isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:shadow-lg"
          }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="absolute inset-0 bg-white/10"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.5 }}
        />
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {isPopup
              ? "Claim Your 10% Discount Now"
              : `Get Started ${isDiscountEligible ? "(10% OFF)" : ""}`}
          </motion.span>
        )}
      </motion.button>

      {/* Terms Text */}
      <motion.p
        className="text-sm text-gray-400 text-center"
        variants={inputVariants}
      >
        By submitting this form, you agree to our Terms of Service and Privacy
        Policy
      </motion.p>
    </motion.form>
  );
};

export default LeadForm;
