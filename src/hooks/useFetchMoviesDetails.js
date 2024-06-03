import { useState, useEffect } from "react";
import tmdbApi from "../services/tmdbApi";

const useFetchMoviesDetails = (movieId) => {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await tmdbApi.get(`/movie/${movieId}`);
        //console.log("data", response.data);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovies();
    }
  }, [movieId]);
  return { movie, loading, error };
};

export default useFetchMoviesDetails;
