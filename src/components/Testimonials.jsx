import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import TestimonialsCoursel from "./TestimonialsCoursel";

function Testimonials() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2 } // Trigger when at least 10% of the element is visible
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

  return (
    <section
      ref={sectionRef}
      className="lg:py-24   flex gap-24 lg:gap-32 flex-col items-center justify-center "
    >
      <div className="bg-[#913bfe] p-6 lg:py-0 gap-3 flex flex-col md:flex-row items-center justify-center lg:justify-evenly lg:gap-32 px-12  lg:w-[90%] lg:h-80">
        {/* <div className="flex flex-col justify-center items-center gap-3 lg:gap-5 ">
          <span className="flex text-3xl lg:text-5xl font-display  font-extrabold text-white items-center ">
            <CountUp className=" tracking-tighter  " end={276} /> k
          </span>
          <hr className="w-[20%]  border-black border-2 " />
          <span className="text-white text-xl lg:text-2xl font-semibold font-display  tracking-wide ">
            Worldwide Students
          </span>
        </div> */}
        <div className="flex flex-col justify-center items-center gap-3 lg:gap-5 ">
          <span className="flex text-3xl lg:text-5xl font-display  font-extrabold text-white items-center ">
            <CountUp className=" tracking-tighter  " end={5} /> +
          </span>
          <hr className="w-[20%]  border-black border-2 " />
          <span className="text-white text-xl lg:text-2xl font-semibold font-display  tracking-wide ">
            Year's Experience
          </span>
        </div>
        <div className="flex flex-col justify-center items-center gap-3 lg:gap-5 ">
          <span className="flex text-3xl lg:text-5xl font-display  font-extrabold text-white items-center ">
            <CountUp className=" tracking-tighter  " end={200} /> +
          </span>
          <hr className="w-[20%]  border-black border-2 " />
          <span className="text-white text-xl lg:text-2xl font-semibold font-display  tracking-wide ">
            Projects
          </span>
        </div>
        <div className="flex flex-col justify-center items-center gap-3 lg:gap-5 ">
          <span className="flex text-3xl lg:text-5xl font-display  font-extrabold text-white items-center ">
            <CountUp className=" tracking-tighter  " end={300} /> +
          </span>
          <hr className="w-[20%]  border-black border-2 " />
          <span className="text-white text-xl lg:text-2xl font-semibold font-display  tracking-wide ">
            Beautiful Review
          </span>
        </div>
      </div>

      <motion.div
        initial={{ y: "+10vw", opacity: 0.5 }}
        animate={{ y: inView ? 0 : "+10vw", opacity: inView ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 20, damping: 10 }}
        className="lg:w-[90%]  flex gap-6 flex-col items-center justify-center"
      >
        <div>
          <span className="text-white text-3xl lg:text-4xl font-extrabold font-display">
            Testimonials
          </span>
        </div>
        <div className="flex flex-col p-3  items-center lg:justify-center">
          <span className="text-[#a4a6cd] text-center text-lg font-semibold">
            We are thrilled with the results! The team delivered transparent,
            high-quality solutions that exceeded our expectations.
          </span>
          <span className="text-[#a4a6cd] text-center text-lg font-semibold">
            Their commitment to excellence and ability to leverage both internal
            and organic sources set them apart from the competition.
          </span>
        </div>
      </motion.div>
      <hr className="w-[80%]  border-[#1b224e] " />
      <TestimonialsCoursel />
    </section>
  );
}

export default Testimonials;
