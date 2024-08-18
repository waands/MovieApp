import React from "react";
import useFetchMoviesDetails from "../hooks/useFetchMoviesDetails";

function Tooltip({ movieId, onMouseEnter, position }) {
  const { movie } = useFetchMoviesDetails(movieId);


  const director = movie.credits ? movie.credits.crew.find(member => member.job === "Director")?.name : null;


  return (
    //se tiver espaço na tela, o tooltip aparece do lado direito do card
    //se não, ele aparece do lado esquerdo
    //a classe "left-full" faz o tooltip aparecer do lado direito
    //a classe "right-full" faz o tooltip aparecer do lado esquerdo
    <div >
      
    <div
      className={`tooltip ${position === 'right' ? 'left-full ml-3' : 'right-full mr-3'}  absolute z-50 top-1/2 -translate-y-1/2 transform mb-2 p-2 w-64 text-sm text-white bg-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 `}
      onMouseEnter={onMouseEnter}
    >
      <p className="line-clamp-3 mb-2">{movie.overview}</p>


      <p className="mb-2"><strong>Diretor: </strong>{director || ""}</p>
      
      <p className="mb-2">
        <strong>Lançamento:</strong> {movie.release_date}
      </p>
      <span className="text-sm text-left mb-2">
        <span className="inline-block w-2 h-2 rounded-full bg-secondary mr-1"></span>
        {movie.runtime} min
      </span>
      <p className="mb-2"></p>

      {movie.genres
        ? movie.genres.map((genre) => (
            <span className="inline-flex bg-primary-800 text-white rounded-full m-1 px-2">
              {genre.name}
            </span>
          ))
        : null}
    </div>
    </div>
  );
}

export default Tooltip;
