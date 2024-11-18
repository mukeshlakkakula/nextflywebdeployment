"use client";

import React, { useState, useEffect, useRef } from "react";
import { IoIosCheckmark } from "react-icons/io";
import Link from "next/link";
import { motion } from "framer-motion";

const PricingMobileApp = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const headingVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      ref={sectionRef}
      className="flex flex-col max-w-screen-2xl mx-auto justify-center items-center min-h-screen p-6"
    >
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={headingVariants}
        className="text-4xl font-bold text-white mb-4"
      >
        Turning Your Ideas into Reality
      </motion.h1>
      <motion.p
        initial="hidden"
        animate="visible"
        variants={headingVariants}
        className="text-lg text-white mb-12"
      >
        Choose the plan that's right for you and start bringing your vision to
        life.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Basic App Package */}
        <div className="bg-purple-700 hover:scale-105 transition-all ease-in-out duration-1000 hover:cursor-pointer text-white rounded-lg p-3 py-7 shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">Basic App Package</h2>
            <p className="text-3xl font-bold">₹9,999</p>
            <ul className="space-y-2 mb-6 mt-4">
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Custom-designed app with a focus on
                local aesthetics
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Android app development
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Simple navigation and user-friendly
                UI/UX design
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Integration with existing eCommerce
                website or basic product catalog
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Basic payment gateway integration
                (Paytm, Razorpay, UPI)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Push notifications for promotional
                offers
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Basic analytics integration (Google
                Analytics for Firebase)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Local Language Support (Hindi or
                other regional languages)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> 1 Month of Free Support
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Submission to Google Play Store
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Basic App Launch Consultation
              </li>
            </ul>
          </div>
          <Link href={`/contact?typeplan=app Basic`} className="mt-4">
            <button className="w-full py-2 bg-white text-purple-700 rounded-lg font-semibold">
              Get Basic
            </button>
          </Link>
        </div>

        {/* Growth App Package */}
        <div className="bg-purple-700 hover:scale-105 transition-all ease-in-out duration-1000 hover:cursor-pointer text-white rounded-lg p-3 py-7 shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4">Growth App Package</h2>
            <p className="text-3xl font-bold">₹14,999</p>
            <ul className="space-y-2 mb-6 mt-4">
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Everything in the Basic Package,
                plus:
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Up to 10 screens with enhanced
                UI/UX design tailored for Indian users
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Advanced navigation with custom
                menu options
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> User registration and login with
                social media integration (Facebook, Google login)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> In-app purchases (for digital
                products or services)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Referral Program Integration to
                encourage user growth
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Custom analytics dashboard with
                insights specific to Indian market trends
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> 3 Months of Free Support
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Local Marketing Strategy
                Consultation for app launch
              </li>
            </ul>
          </div>
          <Link href={`/contact?typeplan=app Growth`} className="mt-4">
            <button className="w-full py-2 bg-white text-purple-700 rounded-lg font-semibold">
              Get Growth
            </button>
          </Link>
        </div>

        {/* Scaling App Package */}
        <div className="bg-purple-700 hover:scale-105 transition-all ease-in-out duration-1000 hover:cursor-pointer text-white rounded-lg p-3 py-7 shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4">Scaling App Package</h2>
            <p className="text-3xl font-bold">₹19,999</p>
            <ul className="space-y-2 mb-6 mt-4">
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Everything in the Growth Package,
                plus:
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Up to 15 screens with advanced,
                culturally relevant UI/UX design
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Cross-platform development (Android
                & iOS)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Integration with advanced eCommerce
                features
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Custom API integration
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Advanced push notifications
                targeting specific user segments
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Personalized user experience based
                on regional behavior
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Regional SEO Optimization to
                improve app visibility in local markets
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> 6 Months of Free Support
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Comprehensive Training on App
                Management
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Discount on Future App Updates
              </li>
            </ul>
          </div>
          <Link href={`/contact?typeplan=app Scaling`} className="mt-4">
            <button className="w-full py-2 bg-white text-purple-700 rounded-lg font-semibold">
              Get Scaling
            </button>
          </Link>
        </div>

        {/* Premium App Package */}
        <div className="bg-purple-700 hover:scale-105 transition-all ease-in-out duration-1000 hover:cursor-pointer text-white rounded-lg p-3 py-7 shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4">Premium App Package</h2>
            <p className="text-3xl font-bold">₹29,999</p>
            <ul className="space-y-2 mb-6 mt-4">
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Everything in the Scaling Package,
                plus:
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Unlimited screens with premium
                UI/UX tailored to different Indian demographics
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Multi-platform support (Android,
                iOS, Web)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Enterprise-grade features (custom
                CRM, advanced analytics)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> AI-driven features (chatbots,
                personalized recommendations)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Localized content and in-app
                marketing campaigns
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Dedicated project manager and 24/7
                support
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Priority App Store Optimization and
                Marketing Consultation
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> 1 Year of Free Support
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={28} /> Ongoing App Performance Monitoring
                and Optimization
              </li>
            </ul>
          </div>
          <Link href={`/contact?typeplan=app Premium`} className="mt-4">
            <button className="w-full py-2 bg-white text-purple-700 rounded-lg font-semibold">
              Get Premium
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingMobileApp;
