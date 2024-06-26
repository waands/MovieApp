import { useState, useEffect } from "react";

const useFetchMovies = (fetchFunction, query) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchFunction(query);
        setMovies(data);
        setError(null);
        setLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (fetchFunction) {
      fetchMovies();
    }
  }, [fetchFunction, query]);
  return { movies, loading, error };
};

export default useFetchMovies;
