import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchMoviesDetails from '../hooks/useFetchMoviesDetails';

const MovieDetailPage = () => {
  const { id } = useParams();
  const { movie, loading, error } = useFetchMoviesDetails(id);

  console.log("movie fdasfuoasdhnfku");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!movie) return <p>No movie found</p>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
    </div>
  );
};

export default MovieDetailPage;
