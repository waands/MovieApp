import useFetchMovies from "../hooks/useFetchMovies";
import { searchMovies } from "../services/tmdbApi";
import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const { movies, loading, error } = useFetchMovies(searchMovies, query);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const location = useLocation();

  useEffect(() => {
    setQuery("");
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsClicked(false);
      }
    };

    if (isClicked) {
      inputRef.current.focus();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isClicked]);

  const handleSearchIconClick = () => {
    setIsClicked(true);

  };

  return (
    <div ref={containerRef} className="relative inline-block w-72">
      {!isClicked ? (
        <button
          className="pt-1 transition-all text-gray-500 duration-300 ml-64 hover:text-white"
          onClick={handleSearchIconClick}
        >
          <IoSearch size={20} />
        </button>
      ) : (
        <div className="relative">
          <input
            type="text"
            value={query}
            placeholder="Search"
            onChange={handleInputChange}
            ref={inputRef}
            className="bg-gray-300 text-black px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-all duration-300 w-72"
          />
          {error && <p className="text-red-500">{error.message}</p>}
          <ul className="absolute left-0 right-0 z-50 mt-2 bg-gray-800">
            {movies.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <li className="p-2 hover:bg-secondary text-white text-sm">
                  <div className="flex inline-flex">
                    {movie.poster_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className="w-15 h-20 mr-2 items-center"
                      />
                    )}
                    {movie.title}
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
