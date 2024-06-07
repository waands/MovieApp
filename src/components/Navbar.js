import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { IoTicket } from "react-icons/io5";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="font-sans bg-[#212331]">
      <div className="2xl:mx-80 lg:mx-25 md:mx-20">
        <nav className="flex justify-between items-center py-4 md:min-h-20 relative">
          <div className="ml-6 max-w-14 lg:min-w-14">
            <Link to="/">
              <IoTicket size="3em" alt="logo" color="#FF1F8A" />
            </Link>
          </div>
          <div className="hidden md:flex justify-center flex-grow">
            <ul className="flex -ml-8 text-gray-500 text-sm">
              <li className="transition-colors duration-300 hover:text-white">
                <Link className="px-6 py-6" to="/">
                  Home
                </Link>
              </li>
              <li className="transition-colors duration-300 hover:text-white">
                <Link className="px-6 py-6 " to="/explore">
                  Explore
                </Link>
              </li>
              <li className="transition-colors duration-300 hover:text-white">
                <Link className="px-6 py-6" to="/genre">
                  Genre
                </Link>
              </li>
              <li className="transition-colors duration-300 hover:text-white">
                <Link className="px-6 py-6" to="/movies">
                  Movies
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:hidden flex items-center ml-24 absolute">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {showMenu ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
          {showMenu && (
            <div className="absolute top-full md:hidden bg-[#212331] rounded-lg mt-2 shadow-md mr-6 z-10 ml-12">
              <ul className="py-2">
                <li>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/explore"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                  >
                    Explore
                  </Link>
                </li>
                <li>
                  <Link
                    to="/genre"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                  >
                    Genre
                  </Link>
                </li>
                <li>
                  <Link
                    to="/movies"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                  >
                    Movies
                  </Link>
                </li>
              </ul>
            </div>
          )}
          <div className="absolute right-6 flex items-center md:static md:flex">
            <SearchBar />
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
