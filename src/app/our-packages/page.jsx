"use client";
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Pricing from "@/components/EcommercePricing";
import PricingMobileApp from "@/components/PricingMobileApp";
import CustomSolutions from "@/components/CustomSolutionsDropDowm";
import Link from "next/link";
import ContactNavbar from "@/components/ContactNavbar";
import { IoArrowForward } from "react-icons/io5";

const PricingPage = () => {
  const [openIndex, setOpenIndex] = useState(1);
  const [activeSection, setActiveSection] = useState(null);
  const sectionRefs = useRef({});
  const containerRef = useRef(null);

  // SEO Schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "FLY Your Tech Solutions",
    description:
      "Professional web development, mobile app, and custom software solutions",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "7999",
      highPrice: "49999",
      offerCount: "10",
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(parseInt(entry.target.dataset.section));
          }
        });
      },
      {
        threshold: 0.1,
        root: null,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
    setTimeout(() => {
      sectionRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const packages = [
    {
      id: 1,
      title: "Need an eCommerce website?",
      subtitle: "Start selling online with our customized eCommerce solutions",
      content: <Pricing />,
      seoTitle: "eCommerce Website Development Packages",
      seoDescription:
        "Professional eCommerce website development solutions with customizable packages to suit your business needs. Start selling online today.",
    },
    {
      id: 2,
      title: "Need an App Solution?",
      subtitle:
        "Transform your business with our mobile app development packages",
      content: <PricingMobileApp />,
      seoTitle: "Mobile App Development Solutions",
      seoDescription:
        "Custom mobile app development services for Android and iOS. Transform your business with our professional app development packages.",
    },
    {
      id: 3,
      title: "Need a Custom Solution?",
      subtitle: "Transform your business with our Custom development",
      content: <CustomSolutions />,
      seoTitle: "Custom Software Development Solutions",
      seoDescription:
        "Tailored software development solutions to meet your unique business requirements. Expert custom development services.",
    },
  ];

  return (
    <>
      <Head>
        <title>
          Pricing & Plans | FlyYourTech (FYT) | Affordable Tech Solutions
        </title>
        <meta
          name="description"
          content="Explore FlyYourTech's (Fly Your Tech/FYT) flexible pricing plans for web development, mobile apps, blockchain, and AI solutions. Transparent pricing, customizable packages, and expert development services starting from ₹25,000. Get enterprise-grade solutions within your budget."
        />
        <meta
          name="keywords"
          content="FlyYourTech pricing, Fly Your Tech packages, FYT plans, flyyourtech cost, web development pricing India, mobile app development cost, blockchain development packages, AI ML solution pricing, software development rates MP, IT services packages, website development plans, app development pricing, tech solutions cost, affordable web development, custom software pricing, enterprise solutions packages, startup friendly plans, SME tech packages, development services pricing, IT consulting rates"
        />
        <meta
          property="og:site_name"
          content="FlyYourTech | Fly Your Tech | FYT"
        />
        <meta
          property="og:title"
          content="FlyYourTech (FYT) Pricing | Affordable Technology Solutions"
        />
        <meta
          property="og:description"
          content="Discover transparent pricing for web development, mobile apps, blockchain & AI solutions. FlyYourTech offers flexible plans starting from ₹25,000. Enterprise solutions at SME-friendly prices."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="FlyYourTech Pricing | Professional Tech Solutions within Budget"
        />
        <meta
          name="twitter:description"
          content="Get premium tech solutions at competitive prices. FlyYourTech offers customizable packages for web, mobile, blockchain & AI development. Start your digital journey today!"
        />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Head>

      <div className="min-h-screen bg-[#0B1120]">
        <ContactNavbar />
        <div className="max-w-screen-xl pl-8 py-6 relative z-30">
          <div className="flex items-center gap-1">
            <Link href="/" className="text-white hover:text-[#913bfe]">
              Home
            </Link>
            <IoArrowForward className="text-white mt-1" />
            <span className="text-white">Our Solutions</span>
          </div>
        </div>

        <div ref={containerRef} className="max-w-screen-xl mx-auto p-4 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              Our Solutions & Packages
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Discover our comprehensive range of digital solutions designed to
              help your business thrive in the modern digital landscape. Choose
              the perfect package that aligns with your goals and budget.
            </p>
          </motion.div>
          <div className="space-y-6">
            {packages.map(({ id, title, subtitle, content }) => (
              <motion.div
                key={id}
                ref={(el) => (sectionRefs.current[id] = el)}
                data-section={id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-purple-900/30 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
              >
                <button
                  type="button"
                  className="w-full p-6 flex items-center justify-between text-white hover:bg-purple-800/20 transition-colors duration-300"
                  onClick={() => handleToggle(id)}
                  aria-expanded={openIndex === id}
                  aria-controls={`panel-${id}`}
                >
                  <div className="text-left">
                    <h2 className="text-xl font-semibold mb-1">{title}</h2>
                    <p className="text-gray-300 text-sm">{subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {openIndex === id ? "Close Package" : "View Package"}
                    </span>
                    {openIndex === id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === id && (
                    <motion.div
                      id={`panel-${id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 text-white"
                    >
                      {content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>{" "}
          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-12 rounded-lg  mt-10"
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
          {/* FAQ Section for SEO */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-8">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              {[
                {
                  q: "How do I choose the right package?",
                  a: "Consider your business needs, budget, and growth plans. Our team can help you evaluate the best option during consultation.",
                },
                {
                  q: "Can packages be customized?",
                  a: "Yes, all our packages can be tailored to meet your specific requirements. Contact us to discuss customization options.",
                },
                {
                  q: "What support is included?",
                  a: "All packages include dedicated support during development and post-launch maintenance periods.",
                },
                {
                  q: "How long do projects typically take?",
                  a: "Project timelines vary based on complexity. We provide detailed timelines during the initial consultation.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-purple-900/20 p-6 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                  <p className="text-gray-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PricingPage;
