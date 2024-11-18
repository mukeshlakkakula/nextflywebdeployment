"use client";
import { useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import LeadPopup from "@/components/LeadPopup";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const GetQuote = () => {
  useEffect(() => {
    // Handle any Next.js-specific effects if needed here
  }, []);

  return (
    <>
      <Head>
        <title>Get a Quote | Fly Your Tech</title>
        <meta
          name="description"
          content="Get a customized quote for your web development, app development, or digital transformation project."
        />
        <meta
          name="keywords"
          content="quote, pricing, web development quote, app development cost, Fly Your Tech pricing"
        />
      </Head>

      <section className="w-full min-h-screen bg-[#05103d] relative overflow-hidden">
        {/* Breadcrumb */}
        <div className="max-w-screen-xl pl-8 py-6 relative z-30">
          <div className="flex items-center gap-1">
            <Link href="/" className="text-white hover:text-[#913bfe]">
              Home
            </Link>
            <IoIosArrowForward className="text-white mt-1" />
            <span className="text-white">Get Quote</span>
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
              Get a Custom Quote
            </motion.h1>
            <motion.p
              className="text-lg text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Let us help you bring your vision to life. Fill out the form below
              and we'll create a customized quote for your project.
            </motion.p>
          </div>

          {/* Lead Popup */}
          <LeadPopup formType="quote" showInstantly={true} />
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-40"
            animate={{
              y: [0, 50, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <img
              src="/assets/img/shape/star-2.svg"
              alt="decoration"
              className="w-12 h-12 opacity-20"
            />
          </motion.div>
          <motion.div
            className="absolute bottom-40 left-20"
            animate={{
              x: [0, 50, 0],
              rotate: [0, -360],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <img
              src="/assets/img/shape/star-5b.svg"
              alt="decoration"
              className="w-16 h-16 opacity-20"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default GetQuote;
