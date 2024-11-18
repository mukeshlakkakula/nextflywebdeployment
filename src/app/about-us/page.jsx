"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  IoArrowForward,
  IoLocationOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import { BsPeople, BsCodeSlash, BsGraphUpArrow } from "react-icons/bs";
import { IoRocketOutline } from "react-icons/io5";
import Image from "next/image";
// import logo from "../public/IMG_20240817_131018-removebg.png";
import ContactNavbar from "@/components/ContactNavbar";
import Head from "next/head";

// Stats Card Component
const StatCard = ({ icon: Icon, number, label }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="bg-purple-900/30 p-8 rounded-lg hover:bg-purple-800/40 transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <Icon className="text-purple-400 text-4xl" />
        <h3 className="text-3xl font-bold text-white">{number}</h3>
        <p className="text-gray-300">{label}</p>
      </div>
    </motion.div>
  );
};

// Main About Us Component
const AboutUs = () => {
  const stats = [
    { number: "100+", label: "Clients Worldwide", icon: BsPeople },
    { number: "200+", label: "Projects Completed", icon: BsCodeSlash },
    { number: "95%", label: "Client Satisfaction", icon: BsGraphUpArrow },
    { number: "10+", label: "Team Members", icon: IoRocketOutline },
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <div className="bg-[#0B1120] min-h-screen">
      <Head>
        <title>
          About FlyYourTech (FYT) | Fly Your Tech | Leading Technology Solutions
          Provider
        </title>
        <meta
          name="description"
          content="Discover FlyYourTech (FYT) - Your premier technology partner. Whether you know us as Fly Your Tech, FlyYourTech, or simply FYT, we deliver exceptional web development, mobile apps, blockchain, and AI/ML solutions that transform businesses."
        />
        <meta
          name="keywords"
          content="FlyYourTech, Fly Your Tech, FYT, fly your tech, flyyourtech, fyt tech, fly-your-tech, fly tech, FYTech, F.Y.T, fly your technology, tech solutions MP, software company MP, web development, app development, blockchain solutions, AI development, IT services India, software development company, technology partner India, digital transformation services, Indian tech company, startup technology partner, IT consulting MP, web developers India, mobile app company, blockchain experts India, AI consultants MP"
        />
        <meta
          property="og:site_name"
          content="FlyYourTech | Fly Your Tech | FYT"
        />
      </Head>
      <ContactNavbar />

      <div className="max-w-screen-xl pl-8 py-6 relative z-30">
        <div className="flex items-center gap-1">
          <Link href="/" className="text-white hover:text-[#913bfe]">
            Home
          </Link>
          <IoArrowForward className="text-white mt-1" />
          <span className="text-white">About Us</span>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            About FLY Your Tech
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We are a team of passionate developers and designers committed to
            transforming your digital vision into reality. Our expertise spans
            across web development, mobile applications, and cutting-edge
            technology solutions.
          </p>{" "}
          <span className="text-lg md:mt-12 tracking-tight text-white dark:text-gray-300 sm:text-center hover:cursor-pointer hover:underline">
            <br /> GST ID : 23DEOPG6721R1ZX
          </span>{" "}
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Mission Section */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <div className="bg-purple-900/30 p-8 rounded-lg">
            <p className="text-gray-300 text-lg leading-relaxed">
              At FLY Your Tech, our mission is to deliver innovative digital
              solutions that empower businesses to thrive in the modern digital
              landscape. We combine technical expertise with creative thinking
              to create solutions that drive real business value.
            </p>
          </div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Expert Team",
                description:
                  "Our team comprises skilled professionals with deep expertise in various technologies.",
              },
              {
                title: "Quality Assurance",
                description:
                  "We maintain high standards of quality in every project we undertake.",
              },
              {
                title: "Timely Delivery",
                description:
                  "We understand the importance of deadlines and ensure timely project completion.",
              },
              {
                title: "Customer Support",
                description:
                  "We provide dedicated support to ensure your complete satisfaction.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-purple-900/30 p-6 rounded-lg"
              >
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <Link href="/contact">
          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-12 rounded-lg"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Let's work together to bring your vision to life with our
              expertise and innovation.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
