import React from "react";
import MovieDetail from "./pages/MovieDetail";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { SkeletonTheme } from 'react-loading-skeleton';

//lg:bg-[#ffffff] lg:bg-none
function App() {
  return (
    <SkeletonTheme baseColor="#757575" highlightColor="#505050">
    <Router>
      <div className="bg-gradient-to-b from-[#303243] from-65% to-[#15151D] text-white overflow-auto">
        <Navbar />

        <Container className="overflow-x-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </Container>
      </div>
    </Router>
    </SkeletonTheme>
  );
}

export default App;
