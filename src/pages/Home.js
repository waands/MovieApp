import React from 'react';
import useFetchMovies from '../hooks/useFetchMovies';
import { getPopularMovies } from '../services/tmdbApi';


function Home() {
  const {movies, loading, error} = useFetchMovies(getPopularMovies);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Error ao carregar filmes: {error.message}</div>


  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {movies.map(movie => (
        <img className="w-40 mx-50" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
      ))}
    </div>
  );
};

export default Home;