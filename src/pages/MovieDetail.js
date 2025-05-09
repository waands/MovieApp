import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useFetchMoviesDetails from "../hooks/useFetchMoviesDetails";
import MovieTopics from "../components/MovieTopics";
import ActorList from "../components/ActorList";
import TiltablePoster from "../components/TiltablePoster";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { movie, loading, error } = useFetchMoviesDetails(id);

  // refs para medir altura do poster e do texto
  const posterRef = useRef(null);
  const textRef = useRef(null);

  // estado para controlar o "Leia mais"
  const [posterHeight, setPosterHeight] = useState(0);
  const [needsTruncate, setNeedsTruncate] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // medir altura do poster sempre que mudar de filme OU redimensionar
  useEffect(() => {
    const measure = () => {
      if (posterRef.current) {
        setPosterHeight(posterRef.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [movie.poster_path]);

  // verificar se o texto precisa de truncamento
  useEffect(() => {
    if (textRef.current && posterHeight > 0) {
      const fullHeight = textRef.current.scrollHeight;
      setNeedsTruncate(fullHeight > posterHeight / 3);
    }
  }, [movie.overview, posterHeight]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!movie) return <p>No movie found</p>;

  const actors = movie.credits.cast.filter(
    (actor) => actor.profile_path !== null
  );

  return (
    <div
      className="
      relative
      xl:overflow-visible   /* deixa vazar */
      min-h-screen
      bg-gradient-to-b from-[#303243] to-[#15151D]
      text-headline
      
    "
    >
      <div
        className="
        absolute
        inset-x-0
        left-1/2
        -translate-x-1/2
        -top-20      
        h-[100vh]     
        overflow-visible
        md:overflow-x-hidden
        z-0      
        w-screen 
        xl:blur-0 md:blur-0 
        hidden
        md:block"
      >
        <img
          className="
          absolute
          inset-0        
          w-screen
          xl:h-1/3
          object-cover
          object-center
          brightness-[0.3]
          saturate-[0.3]
          xl:brightness-[0.5]
          xl:saturate-[0.5]
          md:h-1/2
          xl:pb-0
          xl:blur-0
          sm:blur-sm
          lg:pb-[12vh]
          sm:pb-[12vh]
          
        "
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
        />
      </div>
      <div
        className="
        md:hidden     
        block
        absolute
        inset-x-0
        left-1/2
        -translate-x-1/2
        -top-20    
        w-[calc(100%-5px)]
        h-[calc(100%+100px)]    
        overflow-hidden
        z-0      
        w-screen 
      "
      >
        <img
          className="
          absolute
          inset-0
          w-screen
          h-full
          object-fill
          object-center
          brightness-[0.45]
          saturate-[0.45]
          sm:blur-3xl          
          
        "
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="z-20 relative flex flex-col md:flex-row p-10 lg:p-20 md:-mt-0 lg:-mt-12">
        <div
          className="flex-shrink-0 mb-10 md:mb-0 md:mr-10 w-full md:w-1/5 aspect-[2/3] md:self-start"
          ref={posterRef}
        >
          {/* Pequena margem interna para o poster não colar nas bordas do fundo */}
          <div className="hidden md:block">
            <TiltablePoster
              imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              altText={movie.title}
              movieTitle={movie.title}
              onLoad={() => {
                if (posterRef.current) {
                  setPosterHeight(
                    posterRef.current.getBoundingClientRect().height
                  );
                }
              }}
            />
          </div>
          <img
            onLoad={() => {
              if (posterRef.current) {
                setPosterHeight(
                  posterRef.current.getBoundingClientRect().height
                );
              }
            }}
            className="md:hidden block w-full h-full object-cover rounded-lg shadow-lg"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div
          className={`text-headline flex flex-col justify-center w-full md:w-2/3 xl:pt-[20vh]`}
          // Adiciona um padding superior para o texto não colar no poster
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-1">{movie.title}</h1>

          {movie.tagline ? (
            <span className="text-paragraph text-sm mb-4">
              "{movie.tagline}"
            </span>
          ) : (
            ""
          )}

          <div className="relative mb-6 ">
            {" "}
            {/* Container da sinopse */}
            <div
              ref={textRef}
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                // Se posterHeight ainda não foi medido ou é muito pequeno,
                // podemos usar um fallback razoável para a altura truncada.
                // Ou garantir que não aplique maxHeight se posterHeight for 0.
                maxHeight:
                  isExpanded || posterHeight === 0 // se posterHeight for 0, não restrinja
                    ? textRef.current
                      ? `${textRef.current.scrollHeight}px`
                      : "none" // Altura total do conteúdo ou 'none' se ref não pronta
                    : `${posterHeight / 6}px`,
              }}
            >
              <p className="text-sm md:text-base font-medium leading-relaxed text-slate-200">
                {" "}
                {/* Cor do texto exemplo */}
                {movie.overview || "Sinopse não disponível."}
              </p>
            </div>
            {/* Lógica do Botão "Leia mais" / "Leia menos" e Gradiente */}
            {/* Renderiza o botão apenas se for necessário truncar */}
            {needsTruncate && (
              <div className="relative">
                {" "}
                {/* Envolve gradiente e botão para posicionamento */}
                {/* Gradiente de Fade (somente quando NÃO expandido) */}
                {!isExpanded && (
                  <div
                    className="absolute -top-16 sm:-top-20 bottom-0 left-0 w-full h-20 sm:h-24 pointer-events-none"
                    style={{
                      // Substitua '#303243' pela cor de fundo REAL da área da sinopse
                      // Se for o `bg-gradient-to-b from-[#303243] to-[#15151D]` do pai, pode ser um desafio
                      // Uma cor sólida como '#222430' (intermediária do seu gradiente) pode funcionar
                      // Idealmente, o container IMEDIATO da sinopse teria um fundo sólido ou o gradiente terminaria antes dele.
                      // Vamos assumir que o fundo atrás da sinopse se aproxima de '#303243' ou do tom mais escuro do seu gradiente.
                      background: `linear-gradient(to bottom, transparent 0%, rgba(48, 50, 67, 0) 10%, rgba(48, 50, 67, 0.8) 60%, #303243 95%)`,
                      // Ou, se o fundo for mais para #15151D nessa altura:
                      // background: `linear-gradient(to bottom, transparent 0%, rgba(21, 21, 29, 0) 10%, rgba(21, 21, 29, 0.8) 60%, #15151D 95%)`,
                    }}
                    aria-hidden="true"
                  />
                )}
                {/* Botão Centralizado */}
                <div className={`flex justify-center `}>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)} // Alterna o estado
                    className="px-5 py-2 text-xs sm:text-sm font-semibold text-slate-100 
                               bg-slate-700/60 hover:bg-slate-600/80 backdrop-blur-sm 
                               rounded-full focus:outline-none focus:ring-2 focus:ring-slate-500 
                               transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    {isExpanded ? "Leia menos" : "Leia mais"}
                  </button>
                </div>
              </div>
            )}
            {/* Se não precisa truncar, mas temos overview, garante algum espaço abaixo */}
            {!needsTruncate && movie.overview && <div className="pb-2"></div>}
          </div>
        </div>
      </div>
      <div className="z-20 relative flex flex-col md:flex-row p-10 lg:p-20 md:-mt-12 lg:-mt-28">
        <div className="flex-shrink-0 mb-10 md:mb-0 md:mr-10 w-full md:w-1/5">
          <MovieTopics movie={movie} />
        </div>
        <div className="flex flex-col w-full md:w-4/5">
          <div className="flex flex-col mb-4">
            <h3 className="text-2xl font-bold text-white mb-2">Atores</h3>
            <ActorList actors={actors} />
          </div>

          <div className="flex flex-col mb-4 md:m-4">
            {movie.videos && movie.videos.results[0] ? (
              <>
                <h3 className="text-2xl font-bold text-white mb-4">Trailer</h3>
                <iframe
                  className="w-full aspect-video rounded-lg"
                  src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                  title={movie.title}
                  allowFullScreen
                ></iframe>
              </>
            ) : (
              <h3 className="text-2xl font-bold text-white mb-4">
                Trailer não disponível
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
