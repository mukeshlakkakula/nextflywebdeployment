import { useState } from "react";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import logo from "../Assest/Images/IMG_20240817_131018-removebg.png"; // Update path if needed

function ContactNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="z-20 relative">
      <div className="max-w-screen-2xl lg:px-12 pt-6 flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" passHref>
          <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
            <div className="flex items-center gap-0">
              <Image
                src={logo}
                alt="logo"
                width={72}
                height={56}
                className="object-contain h-14"
              />
              <span className="text-white text-xl">FLY Your Tech</span>
            </div>
          </div>
        </Link>
        <button
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          className="items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-solid-bg"
          aria-expanded={isOpen}
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${isOpen ? "block" : "hidden"} w-full lg:block md:w-auto`}
          id="navbar-solid-bg"
        >
          <ul className="flex flex-col font-medium mt-4 rounded-lg md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li className="flex gap-2 items-center lg:border-r-2 pr-12">
              <IoTimeOutline size={40} className="text-white mt-2" />
              <div className="flex text-white flex-col">
                <span className="block py-2 px-3 md:p-0 rounded">Time</span>
                <span className="font-extrabold">10AM - 11:30PM</span>
              </div>
            </li>
            <li className="flex gap-2 text-white items-center lg:border-r-2 pr-12">
              <IoLocationOutline size={40} className="text-white mt-2" />
              <div className="flex flex-col">
                <span className="block py-2 px-3 md:p-0 text-white rounded">
                  Location
                </span>
                <span className="font-extrabold">(M.P), INDIA</span>
              </div>
            </li>
            <li className="flex gap-2 text-white items-center">
              <a href="tel:+91 747 706 6373" className="flex gap-2">
                <MdOutlinePhone
                  size={40}
                  className="text-white mt-2 hover:cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="block py-2 px-3 hover:cursor-pointer md:p-0 text-white rounded">
                    Phone
                  </span>
                  <span className="font-extrabold">+917470391011</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default ContactNavbar;
