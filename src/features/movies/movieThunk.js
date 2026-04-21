import { createAsyncThunk } from "@reduxjs/toolkit";

export const movieData = createAsyncThunk("movies", async () => {
    const moviesDataResponse = await fetch("https://imdb.iamidiotareyoutoo.com/search?q=ave ");

    const movies = await moviesDataResponse.json();
    // console.log(moviesDataResponse)
    // console.log(movies)
    return { movies }
});