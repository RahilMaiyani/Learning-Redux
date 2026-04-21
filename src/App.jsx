import { useSelector } from "react-redux"
import DecrementButton from "./components/counterComponents/DecrementButton"
import IncrementButton  from "./components/counterComponents/IncrementButton"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { movieData } from "./features/movies/movieThunk"
import { resetMovies, removeMovie } from "./features/movies/movieSlice"
// import MovieInput from "./components/moviesComponents/MovieInput"
// import MovieList from "./components/moviesComponents/MovieList"


function App() {
  const value = useSelector((state) => state.counter.value )
  const errorMessage = useSelector((state) => state.counter.err)
  const moviesData = useSelector(state => state.movies);
  // console.log(moviesData)
  const dispatch = useDispatch();
  
  useEffect(() => {
      if (moviesData.movies.length === 0) {
        dispatch(movieData());
      }
    }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full bg-gray-50 py-10 px-4">
        {!errorMessage ? 
        <p className="m-3 p-3 text-6xl font-bold text-center text-black">{value}</p>
        : 
        <p className="m-3 p-3 text-3xl font-bold text-center text-red-500">{errorMessage}</p>
      }
      <div className="flex justify-center gap-8 w-full mb-10">
          <IncrementButton />
          <DecrementButton /> 
      </div>

      {/* <div className="mt-10 flex justify-center">
        <MovieInput />
      </div>
      
      <div className="mt-2 flex-col justify-items-center">
        <MovieList />
      </div> */}
      {console.log(moviesData)}
      
      <div className="w-full max-w-2xl flex flex-col items-center">
        <button 
          onClick={() => dispatch(resetMovies())}  
          className="mb-8 p-3 px-10 text-xl font-bold bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all"
        >
          Clear Watchlist
        </button>

        <div className="w-full space-y-4">
          {moviesData.movies.map((m) => (
            <div key={m["#IMDB_ID"]} className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-hover hover:shadow-md">
              <div className="flex flex-col pr-4">
                <p className="font-extrabold text-xl text-gray-900">
                  {m["#TITLE"]} <span className="text-gray-400 font-medium">({m["#YEAR"]})</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                   <span className="font-semibold text-gray-400">Cast:</span> {m["#ACTORS"]}
                </p>
              </div>
              
              <button 
                onClick={() => dispatch(removeMovie(m["#IMDB_ID"]))} 
                className="shrink-0 p-3 px-6 text-sm font-black bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App