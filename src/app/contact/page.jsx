"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";
import Head from "next/head";

// Brevo API Key
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const Contact = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Access query parameters using router.query
  const selectedType = searchParams.get("typeplan");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    plan: selectedType || "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
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
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
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

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      return await response.json();
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };

  const sendEmails = async () => {
    try {
      const currentTime = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "full",
        timeStyle: "long",
      });

      const ownerEmailData = {
        sender: {
          name: "Lead Notification",
          email: "noreply@flyyourtech.com",
        },
        to: [
          {
            email: "flyyourtech@gmail.com",
            name: "Abhay Gupta",
          },
        ],
        subject: `New Contact Request from ${formData.name}`,
        htmlContent: `<div>/* Email content here */</div>`,
      };

      const userEmailData = {
        sender: {
          name: "FlyYourTech",
          email: "noreply@flyyourtech.com",
        },
        to: [
          {
            email: formData.email,
            name: formData.name,
          },
        ],
        subject: "Thank you for reaching out to FlyYourTech",
        htmlContent: `<div>/* Email content here */</div>`,
      };

      await Promise.all([sendEmail(ownerEmailData), sendEmail(userEmailData)]);
      return true;
    } catch (error) {
      console.error("Error sending emails:", error);
      return false;
    }
  };

  console.log("emailApi", apiKey);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);

      try {
        const emailsSent = await sendEmails();

        if (emailsSent) {
          setSubmitted(true);
          setFormData({
            name: "",
            phone: "",
            email: "",
            message: "",
            plan: "",
          });
          setTimeout(() => {
            router.push("/");
          }, 5000);
        } else {
          setErrors({
            submit: "There was an error submitting the form. Please try again.",
          });
        }
      } catch (error) {
        setErrors({
          submit: "There was an error submitting the form. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Head>
        <title>Contact FlyYourTech | Your Technology Innovation Partner</title>
        <meta
          name="description"
          content="Connect with FlyYourTech for innovative digital solutions."
        />
        <meta property="og:site_name" content="FlyYourTech" />
        <meta property="og:title" content="Contact FlyYourTech" />
        <meta
          property="og:description"
          content="Transform your business with FlyYourTech."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flyyourtech.com/contact" />
      </Head>

      <section className="w-full min-h-screen flex flex-col justify-between relative bg-[#05103d]">
        {/* Breadcrumb */}
        <div className="max-w-screen-xl pl-8 py-6 relative z-30">
          <div className="flex items-center gap-1">
            <Link href="/" className="text-white hover:text-[#913bfe]">
              Home
            </Link>
            <IoIosArrowForward className="text-white mt-1" />
            <span className="text-white">Contact</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-screen-xl mx-auto w-full px-4 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Contact Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl font-bold text-white mb-4">
                  Contact Us
                </h1>
                {selectedType && (
                  <p className="text-xl font-bold text-white">
                    Selected Plan: {selectedType}
                  </p>
                )}
              </div>

              {/* Contact Information Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#0a1956] p-6 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <IoTimeOutline size={30} className="text-[#913bfe]" />
                    <div>
                      <p className="text-white font-medium">Working Hours</p>
                      <p className="text-gray-300">10AM - 11:30PM</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0a1956] p-6 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <IoLocationOutline size={30} className="text-[#913bfe]" />
                    <div>
                      <p className="text-white font-medium">Location</p>
                      <p className="text-gray-300">(M.P), INDIA</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0a1956] p-6 rounded-lg">
                  <a
                    href="tel:+917470391011"
                    className="flex items-center gap-4"
                  >
                    <MdOutlinePhone size={30} className="text-[#913bfe]" />
                    <div>
                      <p className="text-white font-medium">Phone</p>
                      <p className="text-gray-300">+917470391011</p>
                    </div>
                  </a>
                </div>

                {/* Social Links */}
                <div className="bg-[#0a1956] p-6 rounded-lg">
                  <div className="flex items-center gap-6">
                    <a
                      href="https://www.facebook.com/profile.php?id=61564327175573"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#913bfe] hover:text-white transition-colors"
                    >
                      <FaLinkedinIn size={30} />
                    </a>
                    <a
                      href="https://www.instagram.com/flyyourtech/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#913bfe] hover:text-white transition-colors"
                    >
                      <FaInstagram size={30} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="relative">
              <AnimatePresence>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-[#0a1956] p-8 rounded-lg text-center"
                  >
                    <svg
                      className="w-16 h-16 text-green-500 mx-auto mb-4"
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
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-300">We'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className="bg-[#0a1956] p-8 rounded-lg space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg bg-[#1a2156] text-white placeholder-gray-400 border ${
                            errors.name ? "border-red-500" : "border-[#2a3166]"
                          } focus:border-[#913bfe] focus:ring-1 focus:ring-[#913bfe] transition-colors`}
                          placeholder="John Doe"
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
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg bg-[#1a2156] text-white placeholder-gray-400 border ${
                            errors.phone ? "border-red-500" : "border-[#2a3166]"
                          } focus:border-[#913bfe] focus:ring-1 focus:ring-[#913bfe] transition-colors`}
                          placeholder="+91 XXXXXXXXXX"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg bg-[#1a2156] text-white placeholder-gray-400 border ${
                          errors.email ? "border-red-500" : "border-[#2a3166]"
                        } focus:border-[#913bfe] focus:ring-1 focus:ring-[#913bfe] transition-colors`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className={`w-full px-4 py-3 rounded-lg bg-[#1a2156] text-white placeholder-gray-400 border ${
                          errors.message ? "border-red-500" : "border-[#2a3166]"
                        } focus:border-[#913bfe] focus:ring-1 focus:ring-[#913bfe] transition-colors`}
                        placeholder="Tell us about your project..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {errors.submit && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        {errors.submit}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full bg-gradient-to-r from-[#913bfe] to-[#7b32d7] text-white font-semibold py-3 px-6 rounded-lg 
                    hover:from-[#7b32d7] hover:to-[#913bfe] transition-all duration-300 
                    transform hover:scale-[1.02] active:scale-[0.98] 
                    ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
                    >
                      {loading ? (
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
                          Sending...
                        </div>
                      ) : (
                        "Send Message"
                      )}
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      By submitting this form, you agree to our Terms of Service
                      and Privacy Policy
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -right-8 -bottom-8 z-0 opacity-30"
                animate={{
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src="https://techy-xi.vercel.app/assets/img/shape/line-round-1.svg"
                  alt="decoration"
                  className="w-24 h-24"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <img
          src="https://techy-xi.vercel.app/assets/img/page-title/img-01.png"
          className="absolute bottom-0 left-0 z-0 opacity-30"
          alt="background decoration"
        />
        <img
          src="https://techy-xi.vercel.app/assets/img/shape/star-2.svg"
          className="absolute z-0 opacity-30 top-40 right-20"
          alt="star decoration"
        />
        <img
          src="https://techy-xi.vercel.app/assets/img/shape/star-5b.svg"
          className="absolute z-0 opacity-30 top-80 left-20"
          alt="star decoration"
        />
      </section>
    </>
  );
};

export default Contact;
