import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

function About() {
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
      className="max-w-screen-xl p-3 py-12 flex-col lg:flex-row gap-10 overflow-hidden flex justify-center items-center text-white mx-auto  "
    >
      <motion.div
        className=" lg:w-[60%]  "
        initial={{ x: "50vw", opacity: 0 }} // Initial state with opacity 0 (invisible)
        animate={{ x: inView ? 0 : "-20vw", opacity: inView ? 1 : 0 }} // Animate opacity to 1 when in view
        transition={{ type: "spring", stiffness: 30, damping: 10 }}
      >
        <div className="flex w-full   items-end justify-center lg:justify-end">
          <div className="flex items-center justify-center border rounded-full h-36 bg-white w-36">
            <img
              className="h-32  animate-spin-slow"
              src="https://techy-xi.vercel.app/assets/img/shape/mask-text.svg"
              alt=""
            />
            <div className=" h-24 w-24 flex items-center justify-center absolute border rounded-full ">
              <img
                src="https://techy-xi.vercel.app/assets/img/shape/star-11a.svg"
                alt=""
              />
            </div>
          </div>
        </div>
        <img
          className="  "
          src="https://techy-xi.vercel.app/assets/img/about/about-1.png"
          alt=""
        />
      </motion.div>

      <motion.div
        className="lg:w-[50%] flex-col flex justify-start  gap-7 "
        initial={{ x: "50vw", opacity: 0 }} // Initial state with opacity 0 (invisible)
        animate={{ x: inView ? 0 : "100vw", opacity: inView ? 1 : 0 }} // Animate opacity to 1 when in view
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
      >
        <div className="pb-">
          <p className=" text-3xl  font-extrabold ">
            About Our Techy Innovative IT{" "}
          </p>
          <p className=" text-3xl  font-extrabold ">Agency & Solutions</p>
        </div>
        <div className="flex-col border-b  pb-5  flex ">
          <span className=" text-[#989eaf] leading-none  text-lg">
            FlyYourTech delivers cutting-edge IT solutions that drive business
            success.
          </span>
          <span className=" text-[#989eaf] mt-2 leading-none text-lg">
            We specialize in custom, scalable technology with a focus on
            transparency and impact.
          </span>
          {/* <span className=" text-[#989eaf]  text-lg">
            leverage backward other.
          </span> */}
        </div>
        <div className="flex  pl-6 items-center gap-3 bg-white w-full h-20 rounded-md">
          <div className=" bg-[#e7eaf0] rounded-full border w-14 h-14  ">
            <img
              src="https://techy-xi.vercel.app/assets/img/icon/icon-1a.svg"
              alt=""
            />
          </div>
          <div>
            <span className="text-black  font-[570px] font-display text-xl">
              Money Back Guarantee
            </span>
          </div>
        </div>
        <div className="flex gap-3 items-center pl-6 bg-white w-full h-20 rounded-md">
          <div className=" bg-[#e7eaf0] rounded-full border w-14 h-14  ">
            <img
              src="https://techy-xi.vercel.app/assets/img/icon/icon-2a.svg"
              alt=""
            />
          </div>
          <div>
            <span className="text-black font-[570px] font-display text-xl">
              24/7 Online Support
            </span>
          </div>
        </div>
        <div className="mt-6">
          <Link to="contact" smooth={true} duration={1000}>
            <button className="text-white uppercase hover:bg-black  font-semibold  bg-[#913bfe] px-8  rounded-md py-4 text-md">
              more details
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default About;
