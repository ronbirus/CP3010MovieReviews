import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

export function LeaveReview(props) {

    const movieTitle = useRef();

    const submit = (event) => {
        event.preventDefault();
        const title = movieTitle.current.value;
        /*const movieData = [];
        props.movies.forEach( movie => {
            movieData.push(movie);
        })
        
        movieData.push({"title": title})*/
        props.movies.push({"title": title});
        props.setMovies(props.movies);


        alert(title);
        movieTitle.current.value = "";
    }

    return (
        <>
        <Link to="/">Home</Link>
        <form method="post" action="/api/review" enctype="multipart/form-data" >
            <input 
            name="title"
            ref = {movieTitle}
            type = "text"/>
            <input type="file" name="movie_poster" />
            <input type="submit" value="Submit" />
        </form> 
        </>
)};






