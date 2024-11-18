"use client";
import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link"; // Updated import for Next.js
import Head from "next/head";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

// Lazy load components
const ProjectGrid = lazy(() => import("@/components/ProjectGrid"));
const ContactNavbar = lazy(() => import("@/components/ContactNavbar"));

const OurWork = () => {
  const { ref: sectionRef, inView } = useIntersectionObserver({
    threshold: 0.1,
  });

  const headingVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  return (
    <>
      <Head>
        <title>
          Portfolio | FlyYourTech (FYT) | Showcasing Digital Excellence
        </title>
        <meta
          name="description"
          content="Explore FlyYourTech's (Fly Your Tech/FYT) innovative portfolio featuring 200+ successful projects in web development, mobile apps, blockchain, and AI solutions. Discover how we transform businesses through technology."
        />
        <meta
          name="keywords"
          content="FlyYourTech portfolio, Fly Your Tech projects, FYT case studies, flyyourtech work, web development portfolio, mobile app showcase, blockchain projects, AI solutions, FYT success stories, tech portfolio MP, software projects India, digital transformation cases, React projects, Node.js portfolio, full-stack development, UI/UX showcase, enterprise solutions portfolio, startup projects, Indian tech portfolio, development case studies, IT success stories, custom software portfolio, technology innovation showcase"
        />
        {/* Open Graph, Twitter, and other meta tags omitted for brevity */}
      </Head>

      <section ref={sectionRef} className="bg-[#050c36] p-3">
        <Suspense fallback={<div className="h-16 bg-[#050c36]" />}>
          <ContactNavbar />
        </Suspense>

        <div className="text-white min-h-screen p-5 md:p-10">
          <div className="max-w-7xl mx-auto">
            <header className="mb-12">
              <motion.h1
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={headingVariants}
                className="text-xl sm:text-3xl md:text-4xl font-bold text-center"
              >
                OUR PORTFOLIO
              </motion.h1>

              <p className="text-white text-justify md:text-start text-sm sm:text-md md:text-lg mt-4">
                At Fly Your Tech, we are committed to delivering exceptional
                services across web development, app development, and
                cutting-edge technology solutions.
              </p>
            </header>

            <nav className="flex mb-6 items-center gap-1">
              <Link href="/" className="text-white hover:text-[#913bfe]">
                Home
              </Link>
              <IoIosArrowForward className="text-white mt-1" />
              <span className="text-white">Our Portfolio</span>
            </nav>

            <Suspense
              fallback={
                <div className="h-96 bg-[#0c0d2c] animate-pulse rounded-lg" />
              }
            >
              <ProjectGrid />
            </Suspense>
          </div>
        </div>

        <footer className="max-w-screen-xl h-32 w-full mx-auto border-t border-[#242656] p-4 gap-5 flex-wrap flex items-center justify-center lg:justify-between">
          <span className="text-lg tracking-tight text-white dark:text-gray-300">
            <Link href="/">Fly Your Tech©2024</Link>, All Rights Reserved.
          </span>
          <div className="flex lg:mt-6 mb-3 sm:justify-center lg:space-x-5 space-x-10">
            <SocialLink
              href="https://www.instagram.com/flyyourtech/"
              icon={FaInstagram}
              label="Instagram"
            />
            <SocialLink
              href="https://www.linkedin.com/company/flyyourtech/"
              icon={FaLinkedinIn}
              label="LinkedIn"
            />
          </div>
        </footer>
      </section>
    </>
  );
};

// Extracted Social Link component
const SocialLink = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    className="text-white p-3 hover:bg-[#913bfe] rounded-md border-[#1d254c] border-2 dark:hover:text-white"
  >
    <Icon className="cursor-pointer" size={22} />
    <span className="sr-only">{label} page</span>
  </a>
);

export default OurWork;
