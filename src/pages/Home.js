import React from 'react';
import { getBestMovies, getNowPlayingMovies, getPopularMovies, getUpcomingMovies } from '../services/tmdbApi';
import MovieList from '../components/MovieList';


function Home() {

  return (
    <div className='mt-6'>
      <h1 className='text-xl font-bold '>Populares Agora</h1>
      <MovieList fetchFunction={getPopularMovies} query={null} />
      
      <h1 className='text-xl font-bold '>Mais Bem Avaliados</h1>
      <MovieList fetchFunction={getBestMovies} query={null} />

      <h1 className='text-xl font-bold '>Filmes em Cartaz</h1>
      <MovieList fetchFunction={getNowPlayingMovies} query={null} />

      <h1 className='text-xl font-bold '>Filmes por Vir</h1>
      <MovieList fetchFunction={getUpcomingMovies} query={null} />
    </div>
  );
};

export default Home;