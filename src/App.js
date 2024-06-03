import React from 'react'
import MovieDetail from './pages/MovieDetail'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from '@mui/material'

//lg:bg-[#ffffff] lg:bg-none
function App() {
  return (
    <Router>
      <div className="bg-gradient-to-b from-[#303243] from-65% to-[#15151D] text-white">
        
        <Container>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </Container>
      </div>
    </Router>
  )
}

export default App