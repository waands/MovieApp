import React from "react";
import MovieDetail from "./pages/MovieDetail";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { SkeletonTheme } from "react-loading-skeleton";

//lg:bg-[#ffffff] lg:bg-none
function App() {
  return (
    <SkeletonTheme baseColor="#757575" highlightColor="#505050">
      <Router>
        <div className="relative bg-gradient-to-b from-[#303243] from-50% to-[#1F1D31] text-headline min-h-screen overflow-auto">
          {/* Camada de Ruído: posicionada absolutamente para cobrir, com opacidade */}
          <div className="absolute inset-0 bg-noise opacity-15 pointer-events-none z-0"></div>
          {/* Ajuste a opacidade */}
          <div className="relative z-10">
            {" "}
            {/* Conteúdo principal precisa de z-index */}
            <Navbar />
            <Container className="overflow-visible" maxWidth="xl">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
              </Routes>
            </Container>
          </div>
        </div>
      </Router>
    </SkeletonTheme>
  );
}

export default App;
