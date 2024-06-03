import React, { useState } from "react";
import useFetchMoviesDetails from "../hooks/useFetchMoviesDetails";
import { Link } from "react-router-dom";
import Tooltip from "./Tooltip";

function MovieCard({ movie }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { movie: fetchedMovie, loading, error } = useFetchMoviesDetails(movie.id);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!fetchedMovie) return <p>No movie found</p>;

  return (
    <Link 
      to={`/movie/${movie.id}`} 
      className="m-6 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative flex flex-col items-center w-28 md:w-36 lg:w-44 transition-transform duration-200 hover:-translate-y-4 group z-10">
        <div className="flex-shrink-0 w-full h-44 md:h-56 lg:h-64 relative z-10">
          <img
            className="rounded-lg shadow-lg w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/w500/${fetchedMovie.poster_path}`}
            alt={fetchedMovie.title}
          />
        </div>
        <h1 className="text-md font-bold mt-2 line-clamp-2 w-full h-12">
          {fetchedMovie.title}
        </h1>
        <div className="flex w-full justify-start space-x-8">
          <span className="text-sm text-gray-500">
            {fetchedMovie.release_date.split("-")[0]}
          </span>
        </div>
        
      </div>
    </Link>
  );
}

export default MovieCard;
