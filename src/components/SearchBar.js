import useFetchMovies from "../hooks/useFetchMovies";
import { searchMovies } from "../services/tmdbApi";
import { useState } from "react";

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const {movies, loading, error} = useFetchMovies(searchMovies, query);

    const handleInputChange = (e) => {
        setQuery(e.target.value);   
        //console.log("query", e.target.value); 
    }


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
          <li className="p-2  hover:bg-secondary" key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
