import React, { useState, useRef, useEffect } from "react";
import useFetchMovies from "../hooks/useFetchMovies";
import MovieCard from "./MovieCard";
import Tooltip from "./Tooltip";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";


function MovieList({ fetchFunction, query }) {
  const { movies, loading, error } = useFetchMovies(fetchFunction, query);
  const [scrollX, setScrollX] = useState(0);
  const containerRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(null);
  const [cardPosition, setCardPosition] = useState({ left: 0, top: 0 });

  const handleMouseEnter = (movieId, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCardPosition({ top: rect.top, left: rect.left });
    setShowTooltip(movieId);
  };

  const scrollLeft = () => {
    setScrollX((prev) => Math.max(prev - 925, 0));
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const maxScroll =
        containerRef.current.scrollWidth - containerRef.current.clientWidth;
      setScrollX((prev) => Math.min(prev + 925, maxScroll));
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollX;
    }
  }, [scrollX]);

  return (
    <div className="relative mx-auto px-4 py-2 overflow-hidden ">
      {error ? (
        <div>Error ao carregar filmes: {error.message}</div>
      ) : (
        <>
          <div className="relative">
            <div
              ref={containerRef}
              className={`flex ${window.innerWidth < 640 ? 'overflow-x-auto' : 'no-scrollbar'} transition-transform duration-200 ease-in-out`}
              style={{ transform: `translateX(-${scrollX}px)` }}
            >
              {movies.map((movie) => (
                <div
                  className="relative flex-shrink-0 lg:m-3 md:m-1.5 m-1"
                  key={movie.id}
                  onMouseEnter={(event) => handleMouseEnter(movie.id, event)}
                  onMouseLeave={() => setShowTooltip(null)}
                >
                  <div className="group">
                    <MovieCard movie={movie} />
                    {showTooltip === movie.id && (
                      <Tooltip
                        movieId={movie.id}
                        onMouseEnter={() => setShowTooltip(null)}
                        position={
                          cardPosition.left > window.innerWidth / 1.7
                            ? "left"
                            : "right"
                        }
                      />
                    )}
                  </div>
                </div>
              )) }
            </div>
            <button
              onClick={scrollLeft}
              className="absolute -left-2 top-1/2 transform -translate-y-1/2 -translate-x-2 text-gray-500 hover:bg-gradient-to-r from-[#303243b4]  from-15% to-transparent to-85% p-3 h-full rounded-r-full  hover:text-gray-200  hover:font-extrabold"
            >
              <MdOutlineArrowLeft className="pr-2 scale-150" size={25} />
            </button>
            <button
              onClick={scrollRight}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:bg-gradient-to-l from-[#303243b4] from-15% to-transparent to-85% p-3 h-full rounded-l-full  hover:text-gray-200  hover:font-extrabold"
            >
              <MdOutlineArrowRight className="pl-2 scale-150" size={25} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MovieList;
