import React from "react";

function ActorCard({ actor }) {
  return (
    <div
      key={actor.id}
      className="flex flex-col items-center w-full rounded-lg shadow-lg bg-[#212331]"
    >
      <img
        className="w-full h-full min-w-48 object-cover object-top rounded-t-lg shadow-lg max-h-72"
        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
        alt={actor.name}
      />
      <span className="text-center text-xs p-1 text-white mt-2 font-bold line-clamp-2">
        {actor.name.split(' ').slice(0, 2).join(' ')}
      </span>
      <div className="mt-auto text-center text-sm font-medium">
        <span className="text-center p-2 text-white line-clamp-2">{actor.character}</span>
      </div>
    </div>
  );
}

export default ActorCard;
