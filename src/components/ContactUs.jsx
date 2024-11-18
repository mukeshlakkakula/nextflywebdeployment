import React from "react";
import Link from "next/link";

function ContactUs() {
  return (
    <section className="max-w-screen-xl relative flex items-center justify-center mx-auto h-96  text-white">
      <div className="flex flex-col gap-12 font-display tracking-tighter">
        <div className="flex flex-col items-center justify-center">
          <span className=" text-xl md:text-4xl lg:text-5xl  font-bold ">
            Have a project in mind? Let’s get to
          </span>
          <span className=" text-xl md:text-4xl lg:text-5xl  font-bold">
            work.
          </span>
        </div>
        <div className="flex z-20 items-center justify-center">
          <Link href="/contact">
            <button className="text-white  uppercase hover:bg-black z-20  bg-[#913bfe] px-7  font-semibold rounded-md py-3 text-md">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
      <img
        src="https://techy-xi.vercel.app/assets/img/shape/line-round-3a.svg"
        className="animate-spin-slow absolute z-0 "
        alt=""
      />
    </section>
  );
}

export default ContactUs;
