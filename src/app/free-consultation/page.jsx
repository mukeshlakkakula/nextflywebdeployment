"use client";
// pages/free-consultation.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import LeadPopup from "@/components/LeadPopup";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const FreeConsultation = () => {
  return (
    <>
      <Head>
        <title>
          Free Tech Consultation | FlyYourTech (FYT) | Expert Guidance for Your
          Project
        </title>
        <meta
          name="description"
          content="Book a free consultation with FlyYourTech's (Fly Your Tech/FYT) expert team. Get personalized guidance for web development, mobile apps, blockchain, and AI solutions. Transform your ideas into reality with our professional tech consultation."
        />
        <meta
          name="keywords"
          content="FlyYourTech consultation, Fly Your Tech free consultation, FYT expert guidance, flyyourtech advisory, tech project planning, free IT consultation, web development consultation, mobile app consultation, blockchain advisory, AI ML consultation, software development planning, tech strategy session, digital transformation consultation, IT project guidance, free tech advice, development consultation MP, tech consulting India, software architecture planning, project scoping session, technical feasibility analysis"
        />

        {/* Open Graph Tags */}
        <meta
          property="og:site_name"
          content="FlyYourTech | Fly Your Tech | FYT"
        />
        <meta
          property="og:title"
          content="Free Tech Consultation | FlyYourTech (Fly Your Tech) | Expert Guidance"
        />
        <meta
          property="og:description"
          content="Get expert guidance for your tech project with FlyYourTech's free consultation. Our experienced team will help plan your web, mobile, blockchain, or AI solution."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://flyyourtech.com/consultation"
        />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Free Tech Consultation with FlyYourTech Experts"
        />
        <meta
          name="twitter:description"
          content="Transform your tech ideas into reality. Book a free consultation with FlyYourTech's expert team for professional guidance and project planning."
        />

        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow, max-snippet:-1" />
        <meta name="author" content="FlyYourTech" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="3 days" />
        <meta name="geo.region" content="IN-MP" />
        <meta name="geo.placename" content="Madhya Pradesh" />
        <meta name="geo.position" content="22.9734;78.6569" />
        <meta name="ICBM" content="22.9734, 78.6569" />
        <link rel="canonical" href="https://flyyourtech.com/consultation" />

        {/* Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "FlyYourTech Free Tech Consultation",
            "alternateName": [
              "Fly Your Tech Consultation",
              "FYT Advisory",
              "flyyourtech consultation"
            ],
            "serviceType": "Technology Consultation",
            "provider": {
              "@type": "Organization",
              "name": "FlyYourTech",
              "url": "https://flyyourtech.com",
              "logo": "https://flyyourtech.com/logo.png"
            },
            "description": "Free technology consultation service for web development, mobile apps, blockchain, and AI/ML solutions",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock",
              "description": "Free 30-minute consultation with tech experts"
            },
            "serviceOutput": {
              "@type": "Thing",
              "name": "Technology Strategy and Project Plan",
              "description": "Detailed project assessment, technical recommendations, and implementation roadmap"
            },
            "areaServed": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "22.9734",
                "longitude": "78.6569"
              }
            },
            "availableChannel": {
              "@type": "ServiceChannel",
              "serviceUrl": "https://flyyourtech.com/free-consultation",
              "availableLanguage": ["en", "hi"]
            },
            "hoursAvailable": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "10:00",
              "closes": "23:30"
            }
          }
        `,
          }}
        />
      </Head>

      <section className="w-full min-h-screen bg-[#05103d] relative overflow-hidden">
        {/* Breadcrumb */}
        <div className="max-w-screen-xl pl-8 py-6 relative z-30">
          <div className="flex items-center gap-1">
            <Link href="/" passHref className="text-white hover:text-[#913bfe]">
              {" "}
              Home
            </Link>
            <IoIosArrowForward className="text-white mt-1" />
            <span className="text-white">Free Consultation</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-12 pb-20 relative z-10">
          <div className="text-center mb-12">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Free Consultation
            </motion.h1>
            <motion.p
              className="text-lg text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Book a free consultation with our experts and discover how we can
              help transform your business digitally.
            </motion.p>
          </div>

          {/* Lead Popup */}
          <LeadPopup formType="consultation" showInstantly={true} />
        </div>

        {/* Background Animations */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-40 left-20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-40 h-40 bg-[#913bfe] rounded-full blur-3xl opacity-20" />
          </motion.div>
          <motion.div
            className="absolute bottom-40 right-20"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-60 h-60 bg-[#7b32d7] rounded-full blur-3xl opacity-20" />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FreeConsultation;
