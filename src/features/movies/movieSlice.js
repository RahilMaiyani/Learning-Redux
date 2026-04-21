import { createSlice } from "@reduxjs/toolkit";
import { movieData } from "./movieThunk";

// const initialState = {
//     movies : [
//         {id : 1, name : "Inception"},
//         {id : 2, name : "Interstellar"},
//         {id : 3, name : "Project Hail Mary"},
//     ],
// }

const movieSlice = createSlice({
    name : "movies",
    initialState : {
        movies : [],
        isLoading : false,
        error : null
    },
    reducers : {
        // addMovie : (state, action) => {
        //     const lastMovie = state.movies[state.movies.length - 1];
        //     const newMovie = {
        //         id  : lastMovie ? lastMovie.id + 1 : 1,
        //         name  : action.payload
        //     }
        //     state.movies.push(newMovie);
        // },
        // removeMovie : (state, action) => {
        //     state.movies = state.movies.filter( m => m.id != action.payload)
        // }

        resetMovies : (state) => {
            state.movies = [];
        },
        removeMovie : (state, action) => {
            state.movies = state.movies.filter(m => m["#IMDB_ID"] != action.payload)
        }


    },
    extraReducers : (builder) => {
        builder.addCase(movieData.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(movieData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.movies = action.payload.movies.description;
            console.log(state.movies)
        })
        .addCase(movieData.rejected, (state) => {
            state.isLoading = false
            state.error = "Error fetching movies"
        })
    }
})

export const { resetMovies, removeMovie } = movieSlice.actions;
export default movieSlice.reducer;