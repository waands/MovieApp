import React from "react";
import useFetchMoviesDetails from "../hooks/useFetchMoviesDetails";
import CircularRating from "./CircularRating";

function Tooltip({ movieId, onMouseEnter }) {
  const { movie } = useFetchMoviesDetails(movieId);
  console.log(movie.genres);

  return (
    <div
      className="absolute z-50 left-full top-1/2 transform -translate-y-1/2 mb-2 p-2 w-64 text-sm text-white bg-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-3"
      onMouseEnter={onMouseEnter}
    >
      <p className="line-clamp-3 mb-2">{movie.overview}</p>
      <p className="mb-2">
        <strong>Lançamento:</strong> {movie.release_date}
      </p>
      <span className="text-sm text-left mb-2">
        <span className="inline-block w-2 h-2 rounded-full bg-secondary mr-1"></span>
        {movie.runtime} min
      </span>
      <p className="mb-2"></p>

      {movie.genres
        ? movie.genres.map((genre) => (
            <span className="inline-flex bg-primary-800 text-white rounded-full m-1 px-2">
              {genre.name}
            </span>
          ))
        : null}
    </div>
  );
}

export default Tooltip;
