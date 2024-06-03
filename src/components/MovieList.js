import React from "react";
import useFetchMovies from "../hooks/useFetchMovies";
import MovieCard from "./MovieCard";


function MovieList({ fetchFunction, query }) {
  const { movies, loading, error } = useFetchMovies(fetchFunction, query);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Error ao carregar filmes: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="flex flex-wrap justify-center">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie}/>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
