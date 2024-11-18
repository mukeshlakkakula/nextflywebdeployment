"use client";

import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { Link as ScrollLink } from "react-scroll"; // For smooth scrolling
import Link from "next/link"; // For page routing
import Image from "next/image"; // For optimized images
import logo from "../Assest/Images/IMG_20240817_131018-removebg.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlemenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="font-display w-full lg:pt-3 dark:bg-gray-900">
      <div className="max-w-screen-2xl flex gap-5 lg:gap-0 flex-wrap items-center justify-between mx-auto lg:p-4">
        <ScrollLink
          to="home"
          className="flex items-center gap-0 hover:cursor-pointer rtl:space-x-reverse"
          smooth={true} // Ensures smooth scroll to section within the same page
        >
          <div className="flex items-center gap-0">
            <Image
              src={logo}
              alt="logo"
              width={72}
              height={56}
              className="object-contain h-14"
            />
            <span className="text-white text-xl"> FLY Your Tech</span>
          </div>
        </ScrollLink>

        <div className="flex md:hidden md:order-2 md:gap-4">
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center w-10 h-10 justify-center text-sm text-white border rounded-full md:hidden"
            aria-controls="navbar-cta"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <IoIosMenu className="w-5 h-5" />
          </button>
        </div>

        <div
          id="navbar-cta"
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <ScrollLink
                to="home"
                onClick={handlemenu}
                smooth={true}
                duration={500}
                className="block py-2 px-3 md:p-0 uppercase text-white hover:bg-gray-100 hover:text-black lg:hover:bg-[#050c36] lg:hover:text-white rounded md:bg-transparent cursor-pointer"
              >
                Home
              </ScrollLink>
            </li>
            <li>
              <Link href="/about-us" passHref>
                <span
                  onClick={handlemenu}
                  className="block py-2 px-3 md:p-0 uppercase text-white hover:bg-gray-100 hover:text-black lg:hover:bg-[#050c36] lg:hover:text-white rounded md:bg-transparent cursor-pointer"
                >
                  About
                </span>
              </Link>
            </li>
            <li>
              <ScrollLink
                to="OurServices"
                smooth={true}
                duration={1000}
                onClick={handlemenu}
                className="block hover:cursor-pointer py-2 px-3 md:p-0 uppercase  rounded hover:bg-gray-100 hover:text-black lg:hover:bg-[#050c36] lg:hover:text-white md:hover:bg-transparent  text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Our Services
              </ScrollLink>
            </li>
            <li>
              <Link href="/ourportfolio" passHref>
                <span
                  onClick={handlemenu}
                  className="block py-2 px-3 md:p-0 uppercase text-white hover:bg-gray-100 hover:text-black lg:hover:bg-[#050c36] lg:hover:text-white rounded md:bg-transparent cursor-pointer"
                >
                  Our Portfolio
                </span>
              </Link>
            </li>
            <li>
              <ScrollLink
                to="Feature"
                smooth={true}
                duration={1000}
                onClick={handlemenu}
                className="block hover:cursor-pointer py-2 px-3 md:p-0 uppercase  rounded hover:bg-gray-100 hover:text-black lg:hover:bg-[#050c36] lg:hover:text-white md:hover:bg-transparent  text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Recent Works
              </ScrollLink>
            </li>
            <li>
              <Link href="/our-packages" passHref>
                <span
                  onClick={handlemenu}
                  className="block py-2 px-3 md:p-0 uppercase text-white hover:bg-gray-100 hover:text-black lg:hover:bg-[#050c36] lg:hover:text-white rounded md:bg-transparent cursor-pointer"
                >
                  Our Solutions
                </span>
              </Link>
            </li>
            <li>
              <Link href="/contact" passHref>
                <span
                  onClick={handlemenu}
                  className="block py-2 px-3 md:p-0 uppercase text-white hover:bg-gray-100 hover:text-black lg:hover:bg-[#050c36] lg:hover:text-white rounded md:bg-transparent cursor-pointer"
                >
                  Contact
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
