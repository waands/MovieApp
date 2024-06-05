import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar() {
  return (
    <div className="font-sans bg-[#212331]">
      <div className="2xl:mx-80 lg:mx-25 md:mx-20">
        <nav className="flex justify-between items-center py-4 md:min-h-20 relative">
          <div className="ml-6 max-w-14 lg:min-w-14">
            <img src="https://via.placeholder.com/150" alt="logo" />
          </div>
          <div className="flex justify-center flex-grow">
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
          <div className="absolute right-6 flex items-center ">
            <SearchBar />
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
