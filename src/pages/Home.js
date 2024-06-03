import React from 'react';
import { getPopularMovies } from '../services/tmdbApi';
import MovieList from '../components/MovieList';


function Home() {

  return (
    <div className='mt-6'>
      <h1 className='text-xl font-bold '>Filmes Populares</h1>
      <MovieList fetchFunction={getPopularMovies} query={null} />
      
      <h1>Melhores Avaliados</h1>
      <MovieList fetchFunction={getPopularMovies} query={null} />
    </div>
  );
};

export default Home;