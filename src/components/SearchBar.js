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
  const [focusedMovie, setFocusedMovie] = useState(null);

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
    <div ref={containerRef} className="relative inline-block md:w-72 w-56">
      {!isClicked ? (
        <button
          className="pt-1 transition-all text-gray-500 duration-300 md:ml-64 hover:text-white sm:right-0"
          onClick={handleSearchIconClick}
        >
          <IoSearch size={20} />
        </button>
      ) : (
        <div className="relative sm:ml-10">
          <input
            type="text"
            value={query}
            placeholder="Search"
            onChange={handleInputChange}
            ref={inputRef}
            className="bg-gray-300 text-black px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-all duration-300 w-full"
          />
          {error && <p className="text-red-500">{error.message}</p>}
          <ul className="absolute left-0 right-0 z-50 mt-2 bg-[#212331] rounded-b-lg">
            {movies.map((movie) => {
              const director = movie.credits ? movie.credits.crew.find(member => member.job === "Director")?.name : null;
              return (
                <Link
                  to={`/movie/${movie.id}`}
                  key={movie.id}
                  onMouseEnter={() => setFocusedMovie(movie)}
                  onMouseLeave={() => setFocusedMovie(null)}
                >
                  <li
                    className={`hover:bg-primary-800 text-white text-sm ${
                      focusedMovie === movie ? "pt-1.5" : "pt-0"
                    }`}
                  >
                    <div className="flex inline-flex">
                      {movie.poster_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                          className={`mr-2 items-center ${
                            focusedMovie === movie ? "w-18 h-23" : "w-15 h-10"
                          }`}
                        />
                      )}
                      <div>
                        <span className="font-medium">{movie.title} </span>
                        
                      {focusedMovie === movie && (
                        <p className="italic mt-1">{movie.original_title}</p>
                      )}
                      ({movie.release_date.slice(0, 4)})
                      <span className="mb-2 block text-gray-500 text-xs">{director || ""}</span>
                      {focusedMovie === movie && (
                        <div className="mt-2">
                          <p>
                            Nota:{" "}
                            <strong>{movie.vote_average.toFixed(1)}</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              </Link>
            );})}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
