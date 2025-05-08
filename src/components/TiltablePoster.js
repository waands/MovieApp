import React, { useState, useRef } from "react";

function TiltablePoster({ imageUrl, altText, movieTitle }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Intensidade do efeito (quanto maior, mais inclina)
  const MAX_ROTATION = 10; // Graus

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const { width, height, left, top } = card.getBoundingClientRect();

    // Posição do mouse relativa ao centro do card
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    // Posição do mouse do centro (-0.5 a 0.5)
    const xPct = mouseX / width - 0.5; // -0.5 (esquerda) a 0.5 (direita)
    const yPct = mouseY / height - 0.5; // -0.5 (topo) a 0.5 (base)

    // Calcular rotação - invertemos yPct para um efeito mais natural (mouse no topo, card inclina para "trás" no topo)
    const rotateY = xPct * MAX_ROTATION * 2; // Multiplicamos por 2 porque o range de xPct é 1 (de -0.5 a 0.5)
    const rotateX = -yPct * MAX_ROTATION * 2;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    // Retorna suavemente à posição original
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full cursor-pointer" // Ajuste w-full e h-full conforme necessário ou passe props de tamanho
      style={{
        transformStyle: "preserve-3d", // Importante para que as rotações 3D funcionem
        // Perspective pode ser no pai direto do elemento que gira ou nele mesmo se for o "mundo 3D"
        perspective: "2000px", // Quão "profundo" o efeito 3D parece
      }}
    >
      <div
        className="w-full h-full rounded-lg overflow-hidden shadow-xl transition-transform duration-100 ease-out" // O card interno que realmente gira
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(20px)`, // translateZ(20px) adiciona um leve "pop"
          // Adicione um translateZ menor se não quiser o "pop", ou remova-o
          // transition: 'transform 0.05s linear', // Transição rápida para o movimento
          // A transition-transform duration-100 ease-out acima é para o onMouseLeave
        }}
      >
        <img
          className="w-full h-full object-cover"
          src={imageUrl}
          alt={altText}
        />
        {/* Opcional: Adicionar um brilho/reflexo que se move com o mouse */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${
              (rotate.y / (MAX_ROTATION * 2) + 0.5) * 100
            }% ${
              (-rotate.x / (MAX_ROTATION * 2) + 0.5) * 100
            }%, rgba(255,255,255,0.3), transparent 50%)`,
            mixBlendMode: "overlay", // Ou 'soft-light', experimente
            pointerEvents: "none", // Para não interferir no mouseMove do card
          }}
        />
      </div>
      {/* Opcional: Adicionar texto ou outros elementos que se movem de forma diferente dentro do card 3D */}
      {/*
      <div
        className="absolute bottom-4 left-4 text-white text-shadow-lg"
        style={{
          transform: `translateZ(50px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`, // Efeito de profundidade maior para o texto
          pointerEvents: 'none',
        }}
      >
        {movieTitle}
      </div>
      */}
    </div>
  );
}

export default TiltablePoster;
