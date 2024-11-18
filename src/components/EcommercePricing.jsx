"use client";

import React, { useState, useEffect, useRef } from "react";
import { IoIosCheckmark } from "react-icons/io";
import Link from "next/link";
import { motion } from "framer-motion";

const Pricing = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
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
      className="flex flex-col max-w-screen-2xl mx-auto justify-center items-center lg:min-h-screen p-6"
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
      <div className="grid grid-cols-1  md:grid-cols-2 justify-items-center lg:grid-cols-3 gap-8">
        {/* Starter eCommerce Package */}
        <div className="bg-purple-700 hover:scale-105 transition-all ease-in-out duration-1000 hover:cursor-pointer text-white rounded-lg p-3 py-7 shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">Basic eCommerce Package</h2>
            <p className="text-3xl font-bold">₹7,999</p>
            <ul className="space-y-2 mb-6 mt-4">
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Up to 100 Product Listings
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Single Payment Gateway (Razorpay)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Basic eCommerce Functionality
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Related Products Section
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> User Management (Email Login)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Static Categories on Home Page
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Contact Page (Basic Form & Info)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Admin Panel for Managing Products
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Mobile-Responsive & App-like
                Experience
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> SEO-Optimized Pages
              </li>
              {/* <li className="flex items-center">
              <IoIosCheckmark size={32} /> Free Hosting for 1 Year
            </li> */}
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> SSL Certificate for Secure
                Transactions
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Basic Home Screen Customization
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Social Media Integration
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Built in Next.js – Scalable for
                Future Growth
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Delivery Timeline: 10 days
              </li>
            </ul>
          </div>
          <Link href={`/contact?typeplan=ecommerce Basic`} className="mt-4">
            <button className="w-full py-2 bg-white text-purple-700 rounded-lg font-semibold">
              Get Basic
            </button>
          </Link>
        </div>

        {/* Standard eCommerce Package */}
        <div className="bg-purple-700 hover:scale-105 transition-all ease-in-out duration-1000 hover:cursor-pointer text-white rounded-lg p-3 py-7 shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4">
              Standard eCommerce Package
            </h2>
            <p className="text-3xl font-bold">₹14,999</p>
            <ul className="space-y-2 mb-6 mt-4">
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Everything in the Basic Package,
                plus:
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Free Hosting for 1 Year + Free
                Domain
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Unlimited Product Listings
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Single Payment Gateway (Razorpay)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Invoice System for Customer Orders
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Complete eCommerce Functionality
                (Cart, Checkout, Coupons)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Customizable Home Screen (Banners,
                Categories, Featured Products)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Email Alerts for Order Updates
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Advanced User Management (Account &
                Order History)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Automated Inventory Management
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> SEO Optimization & Google Analytics
                Integration
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Product Reviews and Ratings
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Discount Coupons & Offers
                Management
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Bonus: Automated Email Marketing
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Delivery Timeline: 15 days
              </li>
            </ul>
          </div>
          <Link href={`/contact?typeplan=ecommerce Standard`} className="mt-4">
            <button className="w-full py-2 bg-white text-purple-700 rounded-lg font-semibold">
              Get Standard
            </button>
          </Link>
        </div>

        {/* Premium eCommerce Package */}
        <div className="bg-purple-700 hover:scale-105 transition-all ease-in-out duration-1000 hover:cursor-pointer text-white rounded-lg p-3 py-7 shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4">
              Premium eCommerce Package
            </h2>
            <p className="text-3xl font-bold">₹21,999</p>
            <ul className="space-y-2 mb-6 mt-4">
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Everything in the Standard Package,
                plus:
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Free Custom Addon of Your Choice
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Unlimited Product Listings &
                Categories
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Full Customization (Design &
                Functionality)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Multiple Payment Gateways
                (Razorpay, Paytm, Stripe, etc.)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Multiple Currencies Support (Up to
                3)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Complete eCommerce Suite (Cart,
                Checkout, Wishlist, Gift Cards)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Advanced Admin Panel (Orders,
                Inventory, Reports)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Abandoned Cart Recovery Options
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Advanced Shipping & Tax Automation
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Mobile-Responsive & App-like
                Experience
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Google Analytics & SEO Optimization
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Delivery Timeline: 25 days
              </li>
            </ul>
          </div>
          <Link href={`/contact?typeplan=ecommerce Premium`} className="mt-4">
            <button className="w-full py-2 bg-white text-purple-700 rounded-lg font-semibold">
              Get Premium
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
