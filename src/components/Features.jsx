// Feature.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../Style/Style.css";
import Link from "next/link";
import ProjectsHomeCard from "./ProjectsHomeCard";
import projects from "../Data/project";

const Feature = ({ isAsOtherCompoenet = false }) => {
  const [inView, setInView] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 767, min: 264 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <section
      ref={sectionRef}
      className="max-w-screen-2xl  flex flex-col gap-16  lg:pt-10 mx-auto"
    >
      {!isAsOtherCompoenet ? (
        <div className="flex lg:pl-32 items-center lg:items-start lg:justify-normal justify-center gap-6 flex-col">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -20 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white text-3xl font-display font-extrabold"
          >
            Recent Projects
          </motion.h2>
          <motion.div
            initial={{ x: "-20vw", opacity: 0 }}
            animate={{ x: inView ? 0 : "-20vw", opacity: inView ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 30, damping: 20 }}
            className="flex flex-col text-xl font-display tracking-tighter font-medium text-[#727993]"
          >
            <span className="leading-tight text-center lg:text-start">
              Dramatically supply transparent backward deliverables before
            </span>
            <span className="leading-tight text-center lg:text-start">
              caward comp internal or "organic" sources.
            </span>
          </motion.div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="relative">
        <Carousel
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={3000}
          swipeable={true}
          draggable={true}
          infinite={true}
          partialVisible={false}
          beforeChange={(nextSlide) => setActiveSlide(nextSlide)}
          className="pb-12"
        >
          {projects[0].slice(0, 6).map((project, index) => (
            <ProjectsHomeCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </Carousel>

        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2">
          {projects[0].slice(0, 6).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeSlide ? "bg-[#913bfe] w-8" : "bg-gray-400"
              }`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>

      {!isAsOtherCompoenet ? (
        <div className="w-full flex items-center justify-center">
          <Link href="/ourportfolio">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white hover:bg-black z-20 bg-[#913bfe] px-8 rounded-md py-3 text-lg font-medium transition-all duration-300 flex items-center gap-2"
            >
              View More Projects
              <svg
                className="w-4 h-4"
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
              </svg>
            </motion.button>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </section>
  );
};

export default Feature;
