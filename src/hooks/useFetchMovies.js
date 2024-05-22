import { useState, useEffect } from "react";
import { getPopularMovies } from "../services/tmdbApi";

const useFetchMovies = (fetchFunction) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchFunction();
        setMovies(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);
  return { movies, loading, error };
};

export default useFetchMovies;
