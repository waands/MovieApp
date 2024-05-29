import React from 'react'
import MovieDetail from './pages/MovieDetail'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from '@mui/material'

function App() {
  return (
    <Router>
      <div>
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