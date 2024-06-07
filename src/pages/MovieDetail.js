import React from "react";
import { useParams } from "react-router-dom";
import useFetchMoviesDetails from "../hooks/useFetchMoviesDetails";
import MovieTopics from "../components/MovieTopics";
import ActorList from "../components/ActorList";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { movie, loading, error } = useFetchMoviesDetails(id);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!movie) return <p>No movie found</p>;

  const actors = movie.credits.cast.filter(
    (actor) => actor.profile_path !== null
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#303243] from-65% to-[#15151D]  overflow-hidden">
      <div className="relative w-full h-100">
        <img
          className="absolute inset-0 w-full h-100 blur-3xl brightness-50 saturate-50"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      <div className="z-20 relative flex flex-col md:flex-row p-10 lg:p-20 ">
        <div className="flex-shrink-0 mb-10 md:mb-0 md:mr-10 w-full md:w-1/3">
          <img
            className="rounded-lg shadow-lg lg:w-full md:w-11/12 h-auto z-20 mx-auto"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="text-white flex flex-col justify-center w-full md:w-2/3">
          <h1 className="text-3xl md:text-5xl font-bold mb-1">{movie.title}</h1>

          {movie.tagline ? (
            <span className="text-gray-300 text-sm mb-4">
              "{movie.tagline}"
            </span>
          ) : (
            ""
          )}

          <p className="mb-4">{movie.overview}</p>
        </div>
      </div>
      <div className="z-20 relative flex flex-col md:flex-row p-10 lg:p-20 md:-mt-12 lg:-mt-28">
        <div className="flex-shrink-0 mb-10 md:mb-0 md:mr-10 w-full md:w-1/3">
          <MovieTopics movie={movie} />
        </div>
        <div className="flex flex-col w-full md:w-2/3">
          <div className="flex flex-col mb-4">
            <h3 className="text-2xl font-bold text-white mb-2">Atores</h3>
            <ActorList actors={actors} />
          </div>

          <div className="flex flex-col mb-4 md:m-4">
            {movie.videos && movie.videos.results[0] ? (
              <>
                <h3 className="text-2xl font-bold text-white mb-4">Trailer</h3>
                <iframe
                  className="w-full h-96 rounded-lg mr-6"
                  src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                  title={movie.title}
                  allowFullScreen
                ></iframe>
              </>
            ) : (
              <h3 className="text-2xl font-bold text-white mb-4">
                Trailer não disponível
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
