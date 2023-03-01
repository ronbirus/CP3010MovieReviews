import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import {LeaveReview} from './Form';
import { Routes, Route, Link } from 'react-router-dom';

function MovieList(props) {
  const removeItem = async (title) => {
   
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("title", title);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    try {
      let response = await fetch("/api/removeMovie", requestOptions)
      if( response.status == 200 ) {
        props.setMovies( props.fav_movies.filter( movieElement => movieElement.title != title));
      }

    }
    catch (e) {
      console.log('error', e)
    }
    
    }
  
  
  return (
    <>
    <Link to="/review">Review</Link>
    <ul>
      {
        props.fav_movies.map(movie => {
        return <li>
          <h3>{movie.title}</h3>
          <img src={movie.poster} alt={movie.poster}/>
          <button onClick={ () => removeItem(movie.title)  }>Remove</button> 
        </li>
        }
      )
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
      <Route path="/" element={<MovieList fav_movies={(movies)} setMovies={setMovies}/>} /> 
      <Route path="/review" element={<LeaveReview movies={movies} setMovies={setMovies}/>} />  
    </Routes>
  )

}

export default App;
