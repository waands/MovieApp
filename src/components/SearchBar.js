import useFetchMovies from "../hooks/useFetchMovies";
import { searchMovies } from "../services/tmdbApi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const {movies, loading, error} = useFetchMovies(searchMovies, query);

    const handleInputChange = (e) => {
        setQuery(e.target.value);   
        //console.log("query", e.target.value); 
    }

    const location = useLocation();

    useEffect(() => {
        setQuery('');
    }, [location]);


  return (
    <div>
      <input
        type="text"
        value={query}
        placeholder="Search for a movie"
        onChange={handleInputChange}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul className="absolute z-10 bg-gray">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`}>
          <li className="p-2  hover:bg-secondary" key={movie.id}>
             {movie.title}
            </li>
            </Link>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
