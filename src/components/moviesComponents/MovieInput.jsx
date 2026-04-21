// import { useDispatch } from "react-redux";
// import { useState } from "react";
// import { addMovie } from "../../features/movies/movieSlice";

// function MovieInput() {
//     const [movieName, setMovieName ] = useState("");
//     const dispatch = useDispatch();
//     const handleSubmit = () => {
//         if(movieName) {
//             dispatch(addMovie(movieName));
//             setMovieName("")
//         }
//         else {console.log("Enter valid name.");}
//     }

//     return(
//         <>
//             <input type="text" value={movieName}  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 onChange={(e) => setMovieName(e.target.value)} /> {" "}

//             <button onClick={handleSubmit} className="bg-green-400 text-2xl p-2 m-2 text-white rounded-full w-44 ring-2 ring-green-400 hover:bg-green-200 transition">
//                 Add
//             </button>
//         </>
//     )
// }

// export default MovieInput;