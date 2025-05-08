import React from "react";
import { useParams } from "react-router-dom";
import useFetchMoviesDetails from "../hooks/useFetchMoviesDetails";
import MovieTopics from "../components/MovieTopics";
import ActorList from "../components/ActorList";
import TiltablePoster from "../components/TiltablePoster";

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
    <div
      className="
      relative
      overflow-visible   /* deixa vazar */
      min-h-screen
      bg-gradient-to-b from-[#303243] to-[#15151D]
      text-headline
    "
    >
      {/* 3) Backdrop “vazando” e rolando junto */}
      <div
        className="
        absolute
        inset-x-0
        left-1/2
        -translate-x-1/2
        -top-20      
        h-[100vh]     
        overflow-visible
        z-0      
        w-screen "
      >
        <img
          className="
          absolute
          inset-0        
          w-screen
          h-1/3
          object-cover
          object-center
          brightness-50
          saturate-50
        "
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
        />
      </div>
      <div className="z-20 relative flex flex-col md:flex-row p-10 lg:p-20">
        <div className="flex-shrink-0 mb-10 md:mb-0 md:mr-10 w-full md:w-1/4">
          {" "}
          {/* Pequena margem interna para o poster não colar nas bordas do fundo */}
          <TiltablePoster
            imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            altText={movie.title}
            movieTitle={movie.title} // Passa o título se for usar o texto com efeito 3D opcional
          />
        </div>
        <div
          className={`text-headline flex flex-col justify-center w-full md:w-2/3`}
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-1">{movie.title}</h1>

          {movie.tagline ? (
            <span className="text-paragraph text-sm mb-4">
              "{movie.tagline}"
            </span>
          ) : (
            ""
          )}

          <p className="mb-4 font-medium">{movie.overview}</p>
        </div>
      </div>
      <div className="z-20 relative flex flex-col md:flex-row p-10 lg:p-20 md:-mt-12 lg:-mt-28">
        <div className="flex-shrink-0 mb-10 md:mb-0 md:mr-10 w-full md:w-1/4">
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
