import React, { useState, useEffect, useRef } from "react";
import Pricing from "./EcommercePricing";
import PricingMobileApp from "./PricingMobileApp";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import CustomSolutions from "./CustomSolutionsDropDowm";

const PricingDropDown = () => {
  const [openIndex, setOpenIndex] = useState(1);
  const [activeSection, setActiveSection] = useState(null);
  const sectionRefs = useRef({});
  const containerRef = useRef(null);

  // Intersection Observer setup
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
        rootMargin: "-20% 0px -20% 0px"
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
    
    // Smooth scroll with a slight delay to allow animation to start
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
    },
    {
      id: 2,
      title: "Need an App Solution?",
      subtitle: "Transform your business with our mobile app development packages",
      content: <PricingMobileApp />,
    }
  ];

  return (
    <div ref={containerRef} className="max-w-screen-xl mx-auto p-4 pt-24 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Our Packages
        </h1>
        <p className="text-gray-300 text-lg">
          Choose the perfect solution for your business needs
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
            className="bg-purple-900/30 rounded-lg overflow-hidden"
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
                  animate={{ 
                    height: "auto", 
                    opacity: 1,
                    transition: { 
                      height: { duration: 0.4 },
                      opacity: { duration: 0.3, delay: 0.1 }
                    }
                  }}
                  exit={{ 
                    height: 0, 
                    opacity: 0,
                    transition: { 
                      height: { duration: 0.4 },
                      opacity: { duration: 0.2 }
                    }
                  }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0">
                    {content}
                  </div>
                </motion.div>
              )}

              
            </AnimatePresence>

            
          </motion.div>

          
        ))}
      </div>

      <div className="flex justify-center">
 <a href="/contact">
 <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-white text-purple-900 mt-5 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
  >
    Get in Touch
  </motion.button>
 </a>
</div>

    </div>
  );
};

export default PricingDropDown;