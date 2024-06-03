import React from "react";
import { useParams } from "react-router-dom";
import useFetchMoviesDetails from "../hooks/useFetchMoviesDetails";
import CircularRating from '../components/CircularRating';


const MovieDetailPage = () => {
  const { id } = useParams();
  const { movie, loading, error } = useFetchMoviesDetails(id);

  //console.log("movie", movie);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!movie) return <p>No movie found</p>;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#303243] from-65% to-[#15151D]  overflow-hidden">
      <div className="relative w-full h-100">
        <img
          className="absolute inset-0 w-full h-100 blur-3xl brightness-50 saturate-50"
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
          //style={{WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)' }}    
        />  
        <div className="absolute w-full h-full bg-slate-100 opacity-50 color-blue"></div>
      </div>

      <div className="z-20 relative flex flex-col md:flex-row p-10 md:p-20">
        <div className="flex-shrink-0 mb-10 md:mb-0 md:mr-10 w-full md:w-1/3">
          <img
            className="rounded-lg shadow-lg w-full h-auto z-20"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="text-white flex flex-col justify-center w-ful md:w-2/3">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{movie.title}</h1>
          <p className="mb-4">{movie.overview}</p>
          <p className="mb-2">
            <strong>Data de Lançamento: </strong>
            {movie.release_date}
          </p>
          <div className="flex items-center">
          <p>
            <strong>Nota: </strong>
            <CircularRating rating={movie.vote_average} size={70} />
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
