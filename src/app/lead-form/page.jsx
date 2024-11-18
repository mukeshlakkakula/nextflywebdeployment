"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useLeadManagement } from "@/hooks/useLeadManagement";
import LeadForm from "@/components/LeadForm";
import LeadPopup from "@/components/LeadPopup";
import SuccessModal from "@/components/SuccessModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import EarlyBirdButton from "@/components/EarlyBirdButton";
import Feature from "@/components/Features";
import OfferPopup from "@/components/OfferPopup";
import { sendEmail } from "@/utils/emailService";
import Head from "next/head";
import { useMetaPixel } from "@/utils/useMetaPixel";

const LeadPage = () => {
  const {
    isDiscountEligible,
    remainingSlots,
    loading,
    error: leadError,
    saveLead,
  } = useLeadManagement();

  const {
    trackEvent,
    trackCustomEvent,
    trackFormEvent,
    trackButtonClick,
    trackSectionView,
    trackScrollDepth,
    trackOfferInteraction,
    standardEvents,
    customEvents,
  } = useMetaPixel();
  // States
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  const [showLeadPopup, setShowLeadPopup] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: [],
    message: "",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [discountCode, setDiscountCode] = useState(null);
  const [error, setError] = useState(null);
  const formRef = useRef(null);

  // Track initial page load and form impression
  useEffect(() => {
    // Track page view
    trackEvent(standardEvents.PAGE_VIEW);

    // Track form impression
    trackFormEvent("impression", {
      formName: "Lead Capture Form ReACHEDß",
      location: window.href,
    });

    // Setup scroll tracking
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100
      );
      if (scrollPercent % 25 === 0) {
        // Track at 25%, 50%, 75%, 100%
        trackScrollDepth(scrollPercent);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation Variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
      },
    },
  };

  const fadeInUpVariant = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Content Data
  const features = [
    {
      icon: "💡",
      title: "Innovative Solutions",
      description:
        "Cutting-edge technology solutions tailored to your business needs",
    },
    {
      icon: "🚀",
      title: "Fast Delivery",
      description: "Quick turnaround times without compromising on quality",
    },
    {
      icon: "🛡️",
      title: "Secure & Scalable",
      description: "Built with security and scalability in mind from day one",
    },
    {
      icon: "🤝",
      title: "Dedicated Support",
      description: "24/7 support and maintenance for your peace of mind",
    },
  ];

  const TechnologySection = () => {
    const technologies = [
      {
        icon: "⚡",
        name: "Next.js",
        description: "For lightning-fast performance",
        color: "#913bfe",
        delay: 0.2,
      },
      {
        icon: "🛡️",
        name: "React Native",
        description: "Cross-platform mobile apps",
        color: "#7b32d7",
        delay: 0.4,
      },
      {
        icon: "🚀",
        name: "Node.js",
        description: "Scalable backend solutions",
        color: "#6b24c9",
        delay: 0.6,
      },
      {
        icon: "☁️",
        name: "AWS Cloud",
        description: "Enterprise-grade infrastructure",
        color: "#5a1bb8",
        delay: 0.8,
      },
    ];

    return (
      <motion.section
        variants={sectionVariants}
        className="py-24 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#913bfe]/5 to-transparent" />

        {/* Floating Tech Icons Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#913bfe]/10 text-2xl"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: ["-100%", "100%"],
                rotate: [0, 360],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
                delay: -Math.random() * 20,
              }}
            >
              {["⚡", "🛡️", "🚀", "☁️"][Math.floor(Math.random() * 4)]}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative">
          {/* Section Title */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-gradient-to-r from-[#913bfe] via-white to-[#7b32d7] text-transparent bg-clip-text">
                Cutting-Edge Technologies
              </span>
              <motion.div
                className="h-1 bg-gradient-to-r from-[#913bfe] to-[#7b32d7] mt-2"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1 }}
              />
            </motion.h2>
          </motion.div>

          {/* Tech Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: tech.delay }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 30px ${tech.color}40`,
                }}
                className="relative group"
              >
                {/* Card Content */}
                <div className="bg-[#1a1a2e]/80 backdrop-blur-xl p-8 rounded-2xl border border-[#913bfe]/20 h-full transform transition-all duration-300 group-hover:border-[#913bfe]/50">
                  {/* Icon Container */}
                  <motion.div
                    className="w-16 h-16 mx-auto mb-6 relative"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#913bfe] to-[#7b32d7] rounded-full opacity-20 blur-lg" />
                    <div className="relative bg-gradient-to-r from-[#913bfe] to-[#7b32d7] rounded-full flex items-center justify-center text-3xl aspect-square">
                      {tech.icon}
                    </div>
                  </motion.div>

                  {/* Text Content */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#913bfe] transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    {tech.description}
                  </p>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 border-2 border-[#913bfe] rounded-2xl opacity-0 group-hover:opacity-100"
                    initial={false}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    );
  };

  // You'll need to add this to your CSS
  const styles = `
    .bg-grid-pattern {
      background-image: radial-gradient(#913bfe 1px, transparent 1px);
      background-size: 30px 30px;
    }
  `;

  const StartProjectButton = ({ onClick }) => (
    <motion.div
      className="flex justify-center items-center my-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={onClick}
        className="relative group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-[#913bfe]/60 to-[#7b32d7]/60 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="relative bg-gradient-to-r from-[#913bfe] to-[#7b32d7] text-white px-8 py-4 rounded-full shadow-lg overflow-hidden"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute top-0 -left-4 w-24 h-full bg-white/20 skew-x-[20deg]"
            animate={{
              x: [-100, 200],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />

          <div className="relative flex items-center gap-3">
            <span className="text-lg font-bold tracking-wide">
              Start Your Project
            </span>
            <motion.svg
              className="w-6 h-6"
              animate={{ x: [0, 5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </motion.svg>
          </div>
        </motion.div>
      </motion.button>
    </motion.div>
  );

  const FloatingButtons = ({ handleEarlyBirdClick, formRef }) => {
    return (
      <>
        <WhatsAppButton />
        <EarlyBirdButton onClick={handleEarlyBirdClick} />
      </>
    );
  };

  const RecentWorksSection = () => {
    return (
      <motion.section
        variants={sectionVariants}
        className="pt-8 md:pt-12 relative overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#913bfe]/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#7b32d7]/30 rounded-full blur-[120px]" />
        </div>

        {/* Shining Heading Container */}
        <motion.div
          className="text-center mb-8 md:mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Floating Elements */}
          <motion.div
            className="absolute -top-10 left-1/4 text-4xl"
            animate={{
              y: [-10, 10],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            💻
          </motion.div>

          <motion.div
            className="absolute -top-5 right-1/4 text-4xl"
            animate={{
              y: [-15, 15],
              rotate: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            🚀
          </motion.div>

          {/* Main Heading */}
          <div className="relative inline-block">
            <motion.h2
              className="text-5xl md:text-7xl font-bold"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative inline-block px-2 py-1">
                {/* Gradient Text */}
                <span className="relative z-10 bg-gradient-to-r from-[#913bfe] via-white to-[#7b32d7] text-transparent bg-clip-text">
                  Our Recent Works
                </span>

                {/* Multiple Shine Effects */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[20deg]"
                  animate={{
                    x: [-200, 400],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                  animate={{
                    x: [400, -200],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    delay: 1,
                  }}
                />

                {/* Animated Border */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[3px] w-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <div className="h-full w-full bg-gradient-to-r from-[#913bfe] via-white to-[#7b32d7]">
                    <motion.div
                      className="h-full w-[30%] bg-white"
                      animate={{
                        x: [-100, 400],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                  </div>
                </motion.div>
              </span>
            </motion.h2>
          </div>

          {/* Subtitle with typing effect */}
          <motion.p
            className="text-gray-300 mt-6 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Transforming ideas into digital excellence
          </motion.p>
        </motion.div>

        {/* Features Content with enhanced animation */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 "
        >
          <Feature isAsOtherCompoenet={true} />
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute bottom-10 left-10 w-20 h-20 border-2 border-[#913bfe]/30 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-20 right-20 w-16 h-16 border-2 border-[#7b32d7]/30 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.section>
    );
  };

  const WhyChooseUs = () => {
    const reasons = [
      {
        icon: "🚀",
        title: "Cutting-Edge Tech Stack",
        description:
          "We harness Next.js, React, Node.js and cutting-edge technologies to build blazing-fast applications that stay ahead of the curve",
        stats: "40% faster load times",
        gradient: "from-[#913bfe] to-[#7b32d7]",
        delay: 0.2,
      },
      {
        icon: "⚡",
        title: "Premium Performance",
        description:
          "Custom-engineered solutions that outperform WordPress by 5x. No bloated code, just pure performance optimization",
        stats: "99.9% uptime guaranteed",
        gradient: "from-[#7b32d7] to-[#6b24c9]",
        delay: 0.4,
      },
      {
        icon: "📈",
        title: "Future-Ready Architecture",
        description:
          "Scalable infrastructure that grows with you. From startup to enterprise, our solutions adapt to your evolving needs",
        stats: "10x scaling capacity",
        gradient: "from-[#6b24c9] to-[#5a1bb8]",
        delay: 0.6,
      },
      {
        icon: "🛡️",
        title: "Fort Knox Security",
        description:
          "Bank-grade security protocols with real-time threat monitoring and automatic vulnerability patching",
        stats: "Zero security breaches",
        gradient: "from-[#5a1bb8] to-[#913bfe]",
        delay: 0.8,
      },
    ];

    return (
      <motion.section
        variants={sectionVariants}
        className="py-24 relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#1a1a2e] opacity-95" />
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
              backgroundSize: ["100% 100%", "200% 200%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage:
                "radial-gradient(circle at center, #913bfe 0%, transparent 50%)",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-5xl md:text-6xl font-bold mb-6 relative inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-gradient-to-r from-[#913bfe] via-white to-[#7b32d7] text-transparent bg-clip-text">
                Why Choose FlyYourTech?
              </span>
              {/* Animated Underline */}
              <motion.div
                className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-[#913bfe] to-[#7b32d7]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1 }}
              />
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-2xl mx-auto mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Experience the perfect blend of innovation, performance, and
              reliability
            </motion.p>
          </motion.div>

          {/* Reasons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: reason.delay }}
                className="relative group"
              >
                {/* Card */}
                <motion.div
                  whileHover={{
                    y: -10,
                    boxShadow: `0 10px 30px -10px ${reason.gradient
                      .split(" ")[1]
                      .slice(4)}80`,
                  }}
                  className="h-full bg-[#1a1a2e]/80 backdrop-blur-xl rounded-2xl p-8 border border-[#913bfe]/20 relative overflow-hidden"
                >
                  {/* Icon Container */}
                  <motion.div
                    className="w-20 h-20 mb-6 relative"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${reason.gradient} rounded-2xl opacity-20 blur-lg`}
                    />
                    <div
                      className={`relative bg-gradient-to-r ${reason.gradient} rounded-2xl flex items-center justify-center text-4xl`}
                    >
                      {reason.icon}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#913bfe] transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-gray-300 mb-4 group-hover:text-white transition-colors">
                    {reason.description}
                  </p>

                  {/* Stats Badge */}
                  <motion.div
                    className={`inline-block bg-gradient-to-r ${reason.gradient} px-4 py-2 rounded-full text-white text-sm font-semibold`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {reason.stats}
                  </motion.div>

                  {/* Hover Border Effect */}
                  <motion.div
                    className="absolute inset-0 border-2 border-[#913bfe] rounded-2xl opacity-0 group-hover:opacity-100"
                    initial={false}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              onClick={() =>
                formRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#913bfe] to-[#7b32d7] px-8 py-4 rounded-full text-white font-bold text-lg"
            >
              Start Your Journey With Us
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    );
  };

  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We offer web development, mobile app development, UI/UX design, cloud services, AI solutions, and blockchain development.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary based on complexity. A simple website might take 4-6 weeks, while a complex application could take 3-6 months.",
    },
    {
      question: "What is your pricing model?",
      answer:
        "We offer flexible pricing models including fixed-price projects and time & material arrangements. Contact us for a custom quote.",
    },
    {
      question: "Do you provide post-launch support?",
      answer:
        "Yes, we offer comprehensive maintenance and support packages to ensure your solution runs smoothly.",
    },
  ];

  // Handlers
  const handleEarlyBirdClick = () => {
    if (isDiscountEligible) {
      setShowOfferPopup(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#913bfe", "#7b32d7", "#ffffff"],
      });
    } else {
      setShowLeadPopup(true);
    }
  };

  const handleOfferSubmit = () => {
    setShowOfferPopup(false);
    // Smooth scroll to form
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    // Optional: Add highlight animation
    formRef.current?.classList.add("highlight-form");
    setTimeout(() => {
      formRef.current?.classList.remove("highlight-form");
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      trackEvent("Lead", {
        form_name: "leadpage_main_form",
        value: formData.budget,
        currency: "INR",
        services: formData.services,
      });

      const result = await saveLead(formData);

      if (result.success) {
        confetti({
          particleCount: 100,
          spread: 70,
          colors: ["#913bfe", "#7b32d7", "#ffffff"],
        });
        setDiscountCode(result.data.discountCode);
        setShowSuccess(true);
        resetForm();
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err.message);
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      services: [],
      message: "",
      budget: "",
    });
  };

  return (
    <>
      <Head>
        <title>Get Started | FlyYourTech - Transform Your Digital Vision</title>
        <meta
          name="description"
          content="Start your digital transformation journey with FlyYourTech. Get expert consultation and innovative solutions for your business needs."
        />
        <meta
          name="keywords"
          content="digital transformation, web development, mobile apps, IT consulting, technology solutions"
        />
        <link rel="canonical" href="https://flyyourtech.com/lead" />
      </Head>

      <motion.div
        className="min-h-screen bg-gradient-to-b from-[#0c0d2c] via-[#151642] to-[#1a1a2e]"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        {/* Early Bird Banner */}
        <AnimatePresence>
          {isDiscountEligible && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-r from-[#913bfe] to-[#7b32d7] text-white py-3 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-white/10"
                animate={{
                  x: ["0%", "100%"],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <div className="container mx-auto px-4 text-center relative">
                <span className="inline-block animate-bounce mr-2">🎉</span>
                <motion.span
                  className="font-semibold"
                  whileHover={{ scale: 1.05 }}
                >
                  Early Bird Offer! Get 10% OFF - Only {remainingSlots} spots
                  left!
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <motion.div
            variants={sectionVariants}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              whileInView={{
                backgroundPosition: ["0%", "100%"],
                backgroundImage:
                  "linear-gradient(90deg, #913bfe, #ffffff, #913bfe)",
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Transform Your Digital Vision Into Reality
            </motion.h1>
            <motion.p
              variants={fadeInUpVariant}
              className="text-xl text-gray-300"
            >
              Join hundreds of successful businesses who trust us with their
              digital transformation
            </motion.p>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={sectionVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { number: "100+", label: "Happy Clients", icon: "😊" },
              { number: "98%", label: "Success Rate", icon: "📈" },
              { number: "24/7", label: "Support", icon: "🌟" },
              { number: "50+", label: "Countries", icon: "🌎" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUpVariant}
                whileHover={{ scale: 1.05 }}
                className="bg-[#1a1a2e]/50 p-6 rounded-xl text-center border border-[#913bfe]/20 hover:border-[#913bfe]/50 transition-colors"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Start Project button - centered at bottom */}
          <StartProjectButton
            onClick={() =>
              formRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          />

          {/* Features Section */}
          <motion.div variants={sectionVariants}>
            <RecentWorksSection />
          </motion.div>

          {/* Start Project button - centered at bottom */}
          <StartProjectButton
            onClick={() =>
              formRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          />
          {/* Add Technology Section */}
          <TechnologySection />

          {/* Add Why Choose Us Section */}
          <WhyChooseUs />

          {/* Form Section */}
          <motion.div
            ref={formRef}
            variants={sectionVariants}
            className="max-w-4xl mx-auto mt-10"
          >
            <motion.div
              variants={fadeInUpVariant}
              className="bg-[#1a1a2e]/50  rounded-xl shadow-lg border border-[#913bfe]/20"
            >
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg mb-6"
                >
                  {error}
                </motion.div>
              )}

              <LeadForm
                isPopup={true}
                formData={formData}
                setFormData={setFormData}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                isDiscountEligible={isDiscountEligible}
              />
            </motion.div>
          </motion.div>

          {/* FAQ Section */}
          <motion.section variants={sectionVariants} className="py-16">
            <motion.h2
              variants={fadeInUpVariant}
              className="text-3xl font-bold text-white text-center mb-12"
            >
              Frequently Asked Questions
            </motion.h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUpVariant}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#1a1a2e]/50 rounded-xl p-6 border border-[#913bfe]/20 hover:border-[#913bfe]/50 transition-all"
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Floating Buttons */}
        <FloatingButtons
          handleEarlyBirdClick={handleEarlyBirdClick}
          formRef={formRef}
        />
        {/* Popups */}
        <OfferPopup
          isOpen={showOfferPopup}
          onClose={() => setShowOfferPopup(false)}
          onSubmit={handleOfferSubmit}
          isSubmitting={isSubmitting}
          remainingSlots={remainingSlots}
        />

        <AnimatePresence>
          {showSuccess && (
            <SuccessModal
              discountCode={discountCode}
              onClose={() => setShowSuccess(false)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default LeadPage;
