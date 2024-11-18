import React, { useEffect, useRef, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { IoCodeSlash, IoGitPullRequestOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import Image from "next/image";
import icon3 from "../Assest/Images/icon-10a.png";
import icon4 from "../Assest/Images/icon-11a.png";
import icon5 from "../Assest/Images/icon-12a.png";
import { MdConnectWithoutContact } from "react-icons/md";
import { TbDeviceDesktopCog } from "react-icons/tb";
import { RiFolderReceivedFill } from "react-icons/ri";

function HowWork() {
  const cardData = [
    {
      title: "Contact Us",
      description: ["Reach out to us with your project idea."],
      // url: icon1,
    },
    {
      title: "Explain Requirements",
      description: ["Discuss your needs in detail with our team."],
      // url: icon6,
    },
    {
      title: "Get Quotes",
      description: ["Receive a detailed quote and project proposal."],
      url: icon3,
    },
  ];

  const cardData1 = [
    {
      title: "Get Designs Ready",
      description: ["Review and refine design concepts with our designers."],
      url: icon4,
    },
    {
      title: "Approve It",
      description: ["Approve the final design to move forward."],
      url: icon5,
    },
    {
      title: "Development Starts",
      description: ["Our team begins developing your project."],
      // url: icon7,
    },
    {
      title: "Receive Project",
      description: [
        "Get the completed project along with all necessary documentation.",
      ],
      // url: icon5,
    },

    // Add more objects here as needed
  ];

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

  const [hovertext, setHoverText] = useState(false);
  const [hovertextNext, setHoverTextNext] = useState(false);

  return (
    <section
      ref={sectionRef}
      className="max-w-screen-xl py-20 p-3   lg:py-32 mx-auto"
    >
      <div className="flex items-center justify-center xl:items-start xl:justify-normal flex-wrap gap-6 flex-col">
        <div>
          <span className=" text-white text-3xl font-display font-extrabold">
            How It Works
          </span>
        </div>

        <motion.div
          initial={{ x: "-20vw", opacity: 0 }}
          animate={{ x: inView ? 0 : "-20vw", opacity: inView ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 30, damping: 20 }}
          className="flex flex-col text-center lg:text-start text-xl font-display tracking-tighter font-medium text-[#727993]"
        >
          <span>
            Dramatically supply transparent backward deliverables before
          </span>
          <span>caward comp internal or "organic" sources.</span>
        </motion.div>

        <motion.div className="grid w-full lg:w-fit lg:mt-8 grid-cols-1 relative  md:grid-cols-2 xl:grid-cols-3 gap-8 ">
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              initial={{ y: "+10vw", opacity: 0.5 }}
              animate={{ y: inView ? 0 : "+10vw", opacity: inView ? 1 : 0 }}
              transition={{
                type: "spring",
                stiffness: 30,
                damping: 10,
                delay: index * 0.2, // Delay based on the index
              }}
              onMouseEnter={() => setHoverText(!hovertext)}
              onMouseLeave={() => setHoverText(!hovertext)}
              className={` relative gap-6 p-4  lg:w-96  lg:h-96 flex flex-col justify-center bg-[#05103d]  shadow-xl  group overflow-hidden`}
            >
              <div className="relative flex flex-col gap-8 z-10">
                <div className="border relative flex items-center justify-center overflow-hidden  border-[#2f3b65] mb-4 rounded-full h-32 w-32">
                  <div className="absolute inset-0 bg-[#913bfe] text-white left-full group-hover:left-0 transition-all duration-500 ease-in-out"></div>
                  <div className="relative">
                    {card.url ? (
                      <Image className="relative z-10" src={card.url} alt="" />
                    ) : null}
                    {index === 0 && (
                      <MdConnectWithoutContact
                        size={34}
                        className=" text-white relative z-10 "
                      />
                    )}
                    {index === 1 && (
                      <IoGitPullRequestOutline
                        size={34}
                        className=" text-white relative z-10 "
                      />
                    )}
                  </div>
                </div>
                <div>
                  <span className=" hover:text-[#913bfe] hover:cursor-pointer hover:underline underline-[#913bfe] text-white text-2xl font-display tracking-tight font-extrabold">
                    {card.title}
                  </span>
                </div>
              </div>
              <div className="flex mt- flex-col gap-8 relative z-10">
                <div className="flex flex-col font-display">
                  {card.description.map((desc, descIndex) => (
                    <span
                      key={descIndex}
                      className={`${
                        hovertext ? "text-white" : "text-[#686e8e]"
                      } text-lg`}
                    >
                      {desc}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="grid w-full lg:w-fit lg:mt-8 grid-cols-1 relative  md:grid-cols-2 xl:grid-cols-3 gap-8">
          {cardData1.map((card, index) => (
            <div key={index}>
              <motion.div
                key={index}
                initial={{ y: "+10vw", opacity: 0.5 }}
                animate={{ y: inView ? 0 : "+30vw", opacity: inView ? 1 : 0 }}
                transition={{
                  type: "spring",
                  stiffness: 30,
                  damping: 10,
                  delay: 0.7 + index * 0.2,
                }}
                onMouseEnter={() => setHoverTextNext(!hovertextNext)}
                onMouseLeave={() => setHoverTextNext(!hovertextNext)}
                className={` relative gap-6 p-4 lg:w-96  lg:h-96 flex flex-col justify-center bg-[#05103d]  shadow-xl  group overflow-hidden`}
              >
                <div className="relative flex flex-col gap-8 z-10">
                  <div className="border relative flex items-center justify-center overflow-hidden  border-[#2f3b65] mb-4 rounded-full h-32 w-32">
                    <div className="absolute inset-0 bg-[#913bfe] text-white left-full group-hover:left-0 transition-all duration-500 ease-in-out"></div>
                    {card.url ? (
                      <Image className="relative z-10" src={card.url} alt="" />
                    ) : null}

                    {index === 2 && (
                      <TbDeviceDesktopCog
                        size={34}
                        className=" text-white relative z-10 "
                      />
                    )}
                    {index === 3 && (
                      <RiFolderReceivedFill
                        size={34}
                        className=" text-white relative z-10 "
                      />
                    )}
                  </div>
                  <div>
                    <span className="hover:text-[#913bfe] hover:cursor-pointer hover:underline text-white text-2xl font-display tracking-tight font-extrabold">
                      {card.title}
                    </span>
                  </div>
                </div>
                <div className="flex mt-4 flex-col gap-8 relative z-10">
                  <div className="flex flex-col font-display">
                    {card.description.map((desc, descIndex) => (
                      <span
                        key={descIndex}
                        className={`${
                          hovertextNext ? "text-white" : "text-[#686e8e]"
                        } text-lg`}
                      >
                        {desc}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute right-20 bottom-10"
                animate={{
                  y: [0, 50, 0],
                }}
                transition={{
                  duration: 5,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                <img
                  src="https://techy-xi.vercel.app/assets/img/shape/line-round-1.svg"
                  alt=""
                />
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default HowWork;
