import React from "react";
import ActorCard from "./ActorCard";

function ActorList({ actors }) {
  return (
    <div className="mx-auto px-4 py-2 overflow-x-auto scrollbar-hide" style={{ maxWidth: "100%" }}>
      <div className="flex space-x-3">
        {actors.map((actor) => (
          <ActorCard key={actor.id} actor={actor}/>
        ))}
      </div>
    </div>
  );
}

export default ActorList;
