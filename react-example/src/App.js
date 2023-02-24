import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import {LeaveReview} from './Form';
import { Routes, Route, Link } from 'react-router-dom';

function MovieList(props) {
  return (
    <>
    <Link to="/review">Review</Link>
    <ul>
      {
        props.fav_movies.map(movie => <li>{movie.title}</li>)
      }
    </ul>
    </>
  )
}


function App() {
  
  let [movies, setMovies] = useState(null);

  useEffect( () => {
    console.log("Loading Data");
    //load my movie data from json
      fetch("/api/movies")
      .then( response => response.json() )
      .then( setMovies )
      .catch( e => console.log(e.message))
  }, [])

  if( movies == null ) {
    return <h1>Loading...</h1>;
  }
  console.log(movies);

  return (
    <Routes>
      <Route path="/" element={<MovieList fav_movies={(movies)} />} /> 
      <Route path="/review" element={<LeaveReview movies={movies} setMovies={setMovies}/>} />  
    </Routes>
  )

}

export default App;
