import React from "react";
import useFetchMoviesDetails from "../hooks/useFetchMoviesDetails";
import { Link } from "react-router-dom";

function MovieCard(movies) {
  console.log("movies", movies.movie);
  const { movie, loading, error } = useFetchMoviesDetails(movies.movie.id);

  console.log("movie", movie);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!movie) return <p>No movie found</p>;

  return (
    <Link to={`/movie/${movie.id}`} className="m-6">   
    <div className="flex flex-col items-center w-40 md:w-48 lg:w-56 transition-transform duration-200 hover:-translate-y-4" >
      <div className="flex-shrink-0 w-full h-60 md:h-72 lg:h-80 relative">
        <img
          className="rounded-lg shadow-lg w-full h-full object-cover z-20"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <h1 className="text-md font-bold mt-2 truncate w-full">{movie.title}</h1>
      <div className="flex w-full justify-start space-x-8">
        <span className="text-sm text-gray-500">
          {movie.release_date.split("-")[0]}
        </span>
        <span className="text-sm text-left">
          <span className="inline-block w-2 h-2 rounded-full bg-secondary mr-1"></span>
          {movie.runtime} min
        </span>
      </div>
    </div>
    </Link>
  );
}

export default MovieCard;
