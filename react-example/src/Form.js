import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

export function LeaveReview(props) {

    const movieTitle = useRef();

    const submit = (event) => {
        event.preventDefault();
        const movieData = [];
        props.movies.forEach( movie => {
            movieData.push(movie);
        })
        const title = movieTitle.current.value;
        movieData.push({"title": title})
        props.setMovies(movieData);


        alert(title);
        movieTitle.current.value = "";
    }

    return (
        <>
        <Link to="/">Home</Link>
        <form method="post" action="/api/review" >
            <input 
            name="title"
            ref = {movieTitle}
            type = "text"/>
            <input type="submit" value="Submit" />
        </form> 
        </>
)};






