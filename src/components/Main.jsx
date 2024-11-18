"use client";

import React from "react";
// import { Link } from "react-scroll";
import Link from "next/link"; // For page routing
function Main() {
  return (
    <section className="lg:max-w-screen-2xl relative mx-auto pt-40 lg:pt-56 pb-20  flex flex-col items-center justify-center  ">
      <div className=" absolute z-0  flex lg:items-center  lg:justify-between  lg:px-32  lg:h-[100%] lg:w-[100%]   ">
        <div className="flex  left-48 z-10 lg:z-0 relative flex-col  items-end justify-end pt-20 h-[100%] w-[20%]  ">
          <span className=" text-[#161e43] text-[50px] lg:text-[110px]  tracking-[2rem] uppercase  font-semibold font-display font  w-32 h-96 -rotate-90 ">
            techy
          </span>
        </div>
        <div className="pt-10 lg:h-[90%] z-0 w-[70%]  relative flex items-center flex-col   ">
          <img
            src="https://techy-xi.vercel.app/assets/img/shape/star-2.svg"
            alt=""
          />
          <img
            src="https://techy-xi.vercel.app/assets/img/shape/line-round-1.svg"
            alt=""
          />
        </div>
        <div className=" hidden md:block ">
          <img
            src="https://techy-xi.vercel.app/assets/img/shape/star-1.svg"
            alt=""
          />
        </div>
      </div>
      <div className=" text-center  z-20  ">
        <p className=" text-white pt-12  font-display font-bold lg:text-9xl text-6xl tracking-tighter">
          We’re a
        </p>
        <p className=" text-white leading-tight  font-display font-bold lg:text-9xl text-6xl tracking-tighter ">
          innovative IT
        </p>
        <p className=" text-white  font-display font-bold lg:text-9xl text-6xl tracking-tighter">
          Solutions
        </p>
      </div>
      <div className="mt-10 z-30  relative ">
        <Link href="/lead-form">
          <button className="text-white hover:bg-black   bg-[#913bfe] px-8  rounded-md py-2 text-lg">
            GET STARTED NOW
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Main;
