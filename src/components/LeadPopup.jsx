import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// API Key and configuration
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

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

const technologies = [
  "React",
  "Node.js",
  "Python",
  "React Native",
  "Flutter",
  "Angular",
  "Vue.js",
  "PHP",
  "Laravel",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "AWS",
  "Firebase",
  "Docker",
  "Kubernetes",
];

const LeadPopup = ({ formType = "general", showInstantly = false }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(showInstantly);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    services: [],
    technologies: [],
    message: "",
    formType,
  });

  useEffect(() => {
    if (!showInstantly) {
      const timer = setTimeout(() => {
        if (!localStorage.getItem("hasSeenPopup")) {
          setIsOpen(true);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showInstantly]);

  useEffect(() => {
    if (submitted) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer); // Clear interval just before navigation
            router.push("/");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer); // Clear interval on cleanup
    }
  }, [submitted, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCheckboxChange = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!/^\d{10}$/.test(formData.phone.trim()))
      newErrors.phone = "Invalid phone number";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (formData.services.length === 0)
      newErrors.services = "Please select at least one service";
    return newErrors;
  };

  const getFormTitle = () => {
    switch (formType) {
      case "quote":
        return {
          title: "🚀 Get Your Free Quote",
          subtitle: "Get a detailed quote for your project requirements",
        };
      case "consultation":
        return {
          title: "💡 Book Your Free Consultation",
          subtitle: "Schedule a free consultation with our experts",
        };
      default:
        return {
          title: "'🚀 Let's Skyrocket Your Project!'",
          subtitle:
            "Get a free consultation and special discount on your project",
        };
    }
  };

  const sendEmail = async (emailData) => {
    try {
      const response = await fetch("https://api.sendinblue.com/v3/smtp/email", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify(emailData),
      });
      if (!response.ok) throw new Error("Failed to send email");
      return await response.json();
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };

  const sendEmails = async () => {
    const currentTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "long",
    });

    const ownerEmailData = {
      sender: { name: "Lead Notification", email: "noreply@flyyourtech.com" },
      to: [{ email: "flyyourtech@gmail.com", name: "Abhay Gupta" }],
      subject: `New ${
        formType.charAt(0).toUpperCase() + formType.slice(1)
      } Request - ${formData.name}`,
      htmlContent: `
        <div>
          <h2>New ${formType} Request</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Submission Time:</strong> ${currentTime}</p>
          <p><strong>Services Required:</strong> ${formData.services.join(
            ", "
          )}</p>
          <p><strong>Technologies:</strong> ${formData.technologies.join(
            ", "
          )}</p>
        </div>`,
    };

    const userEmailData = {
      sender: { name: "FlyYourTech", email: "noreply@flyyourtech.com" },
      to: [{ email: formData.email, name: formData.name }],
      subject: `Your ${
        formType === "quote" ? "Quote" : "Consultation"
      } Request Received`,
      htmlContent: `<div><p>Thank you for your request, ${formData.name}.</p></div>`,
    };

    await Promise.all([sendEmail(ownerEmailData), sendEmail(userEmailData)]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await sendEmails();
        setSubmitted(true);
      } catch (error) {
        console.error("Error:", error);
      }
      setIsSubmitting(false);
    } else {
      setErrors(newErrors);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenPopup", "true");
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-[#0c1445] rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="p-6 sm:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-8"
                >
                  <div className="mb-4">
                    <svg
                      className="w-16 h-16 text-green-500 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-300 mb-4">
                    We'll get back to you soon.
                  </p>
                  <p className="text-gray-400">
                    Redirecting in {countdown} seconds...
                  </p>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {formType === "quote"
                      ? "💰 Get Your Free Quote"
                      : formType === "consultation"
                      ? "💡 Book Free Consultation"
                      : "🚀 Let's Skyrocket Your Project!"}
                  </h2>
                  <p className="text-gray-300 mb-6">
                    {formType === "quote"
                      ? "Get a detailed quote for your project requirements"
                      : formType === "consultation"
                      ? "Schedule a free consultation with our experts"
                      : "Get a free consultation and special discount on your project"}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg bg-[#1a2156] text-white placeholder-gray-400 border ${
                            errors.name ? "border-red-500" : "border-[#2a3166]"
                          } focus:border-[#913bfe] focus:ring-1 focus:ring-[#913bfe] transition-colors`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+91 XXXXXXXXXX"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg bg-[#1a2156] text-white placeholder-gray-400 border ${
                            errors.phone ? "border-red-500" : "border-[#2a3166]"
                          } focus:border-[#913bfe] focus:ring-1 focus:ring-[#913bfe] transition-colors`}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg bg-[#1a2156] text-white placeholder-gray-400 border ${
                            errors.email ? "border-red-500" : "border-[#2a3166]"
                          } focus:border-[#913bfe] focus:ring-1 focus:ring-[#913bfe] transition-colors`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-semibold mb-3">
                        Services Required
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {services.map((service) => (
                          <label
                            key={service}
                            className="flex items-center space-x-2 cursor-pointer group hover:bg-[#2a3166] p-2 rounded-lg transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={formData.services.includes(service)}
                              onChange={() =>
                                handleCheckboxChange("services", service)
                              }
                              className="form-checkbox h-4 w-4 text-[#913bfe] border-gray-500 rounded focus:ring-[#913bfe]"
                            />
                            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                              {service}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.services && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.services}
                        </p>
                      )}
                    </div>

                    <div>
                      <h3 className="text-white font-semibold mb-3">
                        Preferred Technologies (Optional)
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {technologies.map((tech) => (
                          <label
                            key={tech}
                            className="flex items-center space-x-2 cursor-pointer group hover:bg-[#2a3166] p-2 rounded-lg transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={formData.technologies.includes(tech)}
                              onChange={() =>
                                handleCheckboxChange("technologies", tech)
                              }
                              className="form-checkbox h-4 w-4 text-[#913bfe] border-gray-500 rounded focus:ring-[#913bfe]"
                            />
                            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                              {tech}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {errors.submit && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        {errors.submit}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-gradient-to-r from-[#913bfe] to-[#7b32d7] text-white py-3 px-6 rounded-lg font-semibold 
                      hover:from-[#7b32d7] hover:to-[#913bfe] transition-all duration-300 transform hover:scale-[1.02] 
                      ${
                        isSubmitting
                          ? "opacity-75 cursor-not-allowed"
                          : "hover:shadow-lg active:scale-[0.98]"
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
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
                        </div>
                      ) : formType === "quote" ? (
                        "Get Free Quote"
                      ) : formType === "consultation" ? (
                        "Book Consultation"
                      ) : (
                        "Get Free Consultation"
                      )}
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      By submitting this form, you agree to our Terms of Service
                      and Privacy Policy
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadPopup;
