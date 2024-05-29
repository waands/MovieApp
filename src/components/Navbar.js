import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';


function Navbar() {
  return (
    <div className='font-sans'>
      <nav className="flex justify-between items-center py-4">
        <div className='ml-6 max-w-20'>
          <img src="https://via.placeholder.com/150" alt="logo" />
        </div>
        <div>
          <ul className="flex">
            <li className="mr-6">
              <Link className="hover:text-primary hover:underline" to="/">Home</Link>
            </li>
            <li className="mr-6">
              <Link className="hover:text-primary hover:underline" to="/explore">Explore</Link>
            </li>
            <li className="mr-6">
              <Link className="hover:text-primary hover:underline" to="/genre">Genre</Link>
            </li>
            <li className="mr-6">
              <Link className="hover:text-primary hover:underline" to="/movies">Movies</Link>
            </li>
            <li>
              <SearchBar />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
