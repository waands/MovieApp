import React, { useEffect, useState } from 'react'


function Movie() {

    const[movieList, setMovieList] = useState([])

    const getMovie = () => {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=fbbdd30f4c6c1a4ab23ac7e7ac397785')
        .then(res => res.json())
        .then(json => setMovieList(json.results))
    }

    useEffect(() => {
        getMovie()
    },[])



  return (
    <div className='flex flex-wrap'>
        {movieList.map((movie) =>(
            <img className="w-40 mx-50" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
        ))}
    </div>
  )
}

export default Movie