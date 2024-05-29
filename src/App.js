import React from 'react'
import Movie from './pages/Movie'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { BrowserRouter as Router } from 'react-router-dom'
import { Container } from '@mui/material'

function App() {
  return (
    <Router>
    <div>
      <Container>
      <Navbar/>
      <Home/>
      </Container>
    </div>
    </Router>
  )
}

export default App