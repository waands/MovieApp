import React from "react";
import {
  getBestMovies,
  getNowPlayingMovies,
  getPopularMovies,
  getUpcomingMovies,
} from "../services/tmdbApi";
import MovieList from "../components/MovieList";

function Home() {
  return (
    <div className="mt-6">
      <h1 className="text-xl font-bold text-headline">Populares Agora</h1>
      <MovieList
        className="z-10"
        fetchFunction={getPopularMovies}
        query={null}
      />

      <h1 className="text-xl font-bold text-headline">Mais Bem Avaliados</h1>
      <MovieList fetchFunction={getBestMovies} query={null} />

      <h1 className="text-xl font-bold text-headline">Filmes em Cartaz</h1>
      <MovieList fetchFunction={getNowPlayingMovies} query={null} />

      <h1 className="text-xl font-bold text-headline">Filmes por Vir</h1>
      <MovieList fetchFunction={getUpcomingMovies} query={null} />
    </div>
  );
}

export default Home;
