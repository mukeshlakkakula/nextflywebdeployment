"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoIosCheckmark } from "react-icons/io";
import Link from "next/link";
import { motion } from "framer-motion";

const CustomSolutions = () => {
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
        Custom Technology Solutions
      </motion.h1>
      <motion.p
        initial="hidden"
        animate="visible"
        variants={headingVariants}
        className="text-lg text-white mb-12 text-center"
      >
        Tailored solutions leveraging cutting-edge technologies to meet your
        specific needs
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center lg:grid-cols-3 gap-8">
        {/* Web Development Solutions */}
        <div className="bg-purple-700 hover:scale-105 transition-all ease-in-out duration-1000 hover:cursor-pointer text-white rounded-lg p-3 py-7 shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Web Development Solutions
            </h2>
            <ul className="space-y-2 mb-6 mt-4">
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> React.js & Next.js Applications
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Full-Stack Development
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Progressive Web Apps (PWA)
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Real-time Applications
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> CMS Development
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> API Development & Integration
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Cloud-Native Solutions
              </li>
            </ul>
          </div>
          <Link href="/contact?solution=web" className="mt-4">
            <button className="w-full py-2 bg-white text-purple-700 rounded-lg font-semibold">
              Discuss Your Project
            </button>
          </Link>
        </div>

        {/* Mobile Development Solutions */}
        <div className="bg-purple-700 hover:scale-105 transition-all ease-in-out duration-1000 hover:cursor-pointer text-white rounded-lg p-3 py-7 shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4">
              Mobile Development Solutions
            </h2>
            <ul className="space-y-2 mb-6 mt-4">
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Native iOS Development
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Native Android Development
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Cross-Platform Applications
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> React Native Development
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Mobile App UI/UX Design
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> App Performance Optimization
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Mobile Backend Services
              </li>
            </ul>
          </div>
          <Link href="/contact?solution=mobile" className="mt-4">
            <button className="w-full py-2 bg-white text-purple-700 rounded-lg font-semibold">
              Discuss Your Project
            </button>
          </Link>
        </div>

        {/* Enterprise Solutions */}
        <div className="bg-purple-700 hover:scale-105 transition-all ease-in-out duration-1000 hover:cursor-pointer text-white rounded-lg p-3 py-7 shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4">Enterprise Solutions</h2>
            <ul className="space-y-2 mb-6 mt-4">
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Custom ERP Systems
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> CRM Solutions
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Business Process Automation
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Data Analytics & BI
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Cloud Infrastructure
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Legacy System Modernization
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Enterprise Security Solutions
              </li>
            </ul>
          </div>
          <Link href="/contact?solution=enterprise" className="mt-4">
            <button className="w-full py-2 bg-white text-purple-700 rounded-lg font-semibold">
              Discuss Your Project
            </button>
          </Link>
        </div>

        {/* Emerging Technologies */}
        <div className="bg-purple-700 hover:scale-105 transition-all ease-in-out duration-1000 hover:cursor-pointer text-white rounded-lg p-3 py-7 shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4">Emerging Technologies</h2>
            <ul className="space-y-2 mb-6 mt-4">
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> AI & Machine Learning
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Blockchain Development
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> IoT Solutions
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> AR/VR Applications
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Edge Computing
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Computer Vision
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Natural Language Processing
              </li>
            </ul>
          </div>
          <Link href="/contact?solution=emerging" className="mt-4">
            <button className="w-full py-2 bg-white text-purple-700 rounded-lg font-semibold">
              Discuss Your Project
            </button>
          </Link>
        </div>

        {/* DevOps & Cloud */}
        <div className="bg-purple-700 hover:scale-105 transition-all ease-in-out duration-1000 hover:cursor-pointer text-white rounded-lg p-3 py-7 shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4">DevOps & Cloud Solutions</h2>
            <ul className="space-y-2 mb-6 mt-4">
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> CI/CD Implementation
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Cloud Migration
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Infrastructure as Code
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Kubernetes Orchestration
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Microservices Architecture
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Cloud Cost Optimization
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> DevSecOps Integration
              </li>
            </ul>
          </div>
          <Link href="/contact?solution=devops" className="mt-4">
            <button className="w-full py-2 bg-white text-purple-700 rounded-lg font-semibold">
              Discuss Your Project
            </button>
          </Link>
        </div>

        {/* Consulting & Strategy */}
        <div className="bg-purple-700 hover:scale-105 transition-all ease-in-out duration-1000 hover:cursor-pointer text-white rounded-lg p-3 py-7 shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4">Consulting & Strategy</h2>
            <ul className="space-y-2 mb-6 mt-4">
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Technical Architecture Design
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Digital Transformation
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Technology Stack Selection
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Security Assessment
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Performance Optimization
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Scalability Planning
              </li>
              <li className="flex items-center">
                <IoIosCheckmark size={32} /> Technology Roadmap
              </li>
            </ul>
          </div>
          <Link href="/contact?solution=consulting" className="mt-4">
            <button className="w-full py-2 bg-white text-purple-700 rounded-lg font-semibold">
              Discuss Your Project
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomSolutions;
