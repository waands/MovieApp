import React from "react";

function ActorCard({ actor }) {
  return (
    <div
      key={actor.id}
      className="flex flex-col items-center w-full rounded-lg shadow-lg bg-sec-background transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl group"
    >
      <img
        className="w-full h-full min-w-48 object-cover object-top rounded-t-lg shadow-lg max-h-72"
        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
        alt={actor.name}
      />
      <div className="p-2 sm:p-3 flex flex-col flex-grow">
        {/* Nome do Ator */}
        <h3 className="text-sm sm:text-md font-semibold text-center line-clamp-2 h-10 sm:h-12">
          {actor.name.split(" ").slice(0, 2).join(" ")}
        </h3>

        {actor.character && ( // Só mostra se houver nome de personagem
          <p className="mt-auto pt-1 text-center text-xs sm:text-sm text-slate-400 line-clamp-2 h-9 sm:h-10">
            {actor.character}
          </p>
        )}
      </div>
    </div>
  );
}

export default ActorCard;
