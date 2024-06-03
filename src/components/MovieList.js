import React, { useState, useRef, useEffect } from "react";
import useFetchMovies from "../hooks/useFetchMovies";
import MovieCard from "./MovieCard";
import Tooltip from "./Tooltip";

function MovieList({ fetchFunction, query }) {
  const { movies, loading, error } = useFetchMovies(fetchFunction, query);
  const [scrollX, setScrollX] = useState(0);
  const containerRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(null);

  const scrollLeft = () => {
    setScrollX((prev) => Math.max(prev - 500, 0));
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const maxScroll =
        containerRef.current.scrollWidth - containerRef.current.clientWidth;
      setScrollX((prev) => Math.min(prev + 500, maxScroll));
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollX;
    }
  }, [scrollX]);

  return (
    <div className="relative mx-auto px-4 py-2 overflow-hidden">
      {loading ? (
        <div>Carregando...</div>
      ) : error ? (
        <div>Error ao carregar filmes: {error.message}</div>
      ) : (
        <>
          <div className="relative">
            <div
              ref={containerRef}
              className="flex no-scrollbar transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${scrollX}px)` }}
            >
              {movies.map((movie) => (
                <div className="relative flex-shrink-0 lg:m-3 md:m-1.5 " key={movie.id}
                onMouseEnter={() => setShowTooltip(movie.id)}
                onMouseLeave={() => setShowTooltip(null)}
                >
                  <div className="group">
                  <MovieCard movie={movie} />
                  {showTooltip === movie.id && <Tooltip movieId={movie.id} onMouseEnter={() => setShowTooltip(null)}/>}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-lg"
            >
              &lt;
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-lg"
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MovieList;
