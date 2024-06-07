import React from "react";
import CircularRating from "./CircularRating";

function MovieTopics({ movie }) {
  const topics = [
    {
      title: "",
      content: <CircularRating rating={movie.vote_average} size={70} />,
    },
    {
      title: "Diretor",
      content:
        movie.credits.crew.find((member) => member.job === "Director")?.name ||
        "Desconhecido",
    },
    {
      title: "Lançamento",
      content: `${movie.release_date.slice(8, 10)}/${movie.release_date.slice(
        5,
        7
      )}/${movie.release_date.slice(0, 4)}` || "Desconhecido",
    },
    {
      title: "Duração",
      content: `${movie.runtime} minutos` || "Desconhecido",
    },
    {
      title: "Gêneros",
      content: movie.genres
        ? movie.genres.map((genre) => (
            <span className="inline-flex bg-primary-800 text-white rounded-full mr-1 mt-1 px-2">
              {genre.name}
            </span>
          ))
        : "Desconhecido",
    },
    {
      title: "Produção",
      content: movie.production_companies
        .map((company) => company.name)
        .join(", ") || "Desconhecido",
    },
    {
      title: "Título Original",
      content: movie.original_title || "Desconhecido",
    },
    {
      title: "Orçamento",
      content: "$ " + movie.budget.toLocaleString( {
        style: "currency",
      }) || "Desconhecido",
    },
    {
      title: "Receita",
      content: "$ " + movie.revenue.toLocaleString( {
        style: "currency",
      }) || "Desconhecido",
    },
  ];

  return (
    <div className=" p-4 text-white  h-auto z-20 mx-auto rounded-lg bg-[#21233146] text-sm">
      <ul className="">
        {topics.map((topic, index) => (
          <li key={index} className="mb-4">
            <h3 className="text-lg font-semibold">{topic.title}</h3>
            <p>{topic.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieTopics;
