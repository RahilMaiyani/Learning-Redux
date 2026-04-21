// import { useSelector, useDispatch } from "react-redux";
// import { removeMovie } from "../../features/movies/movieSlice";


// function MovieList() {
//     const movies = useSelector((state) => state.movies.movies);
//     const dispatch = useDispatch();

//     return(
//         <>
//             {movies ?
//              <>
//                 {movies.map((m) => (
//                     <div key={m.id} className="my-1">
//                     <p key={m.id}>
//                         {m.name} {" "}
//                         <button key={m.id}
//                         className="bg-red-400 text-white rounded-full w-20"
//                         onClick={() => dispatch(removeMovie(m.id))}>Delete</button>
//                     </p>
//                     </div>
//                 ))
//                 }

//              </>
//             :
//             <>
//                 <p>No movies</p>
//             </>
//             }
        
        
//         </>
//     )
// }

// export default MovieList;