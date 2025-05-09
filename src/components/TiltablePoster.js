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
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    // Calcula a rotação com base na posição do mouse
    const rotateY = xPct * MAX_ROTATION * 2;
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
      className="relative w-full h-full cursor-pointer object-cover"
      style={{
        transformStyle: "preserve-3d",
        perspective: "2000px", // Quão "profundo" o efeito 3D parece
      }}
    >
      <div
        className="w-full h-full rounded-lg overflow-hidden shadow-xl transition-transform duration-100 ease-out" // O card interno que realmente gira
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(20px)`,
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
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}

export default TiltablePoster;
