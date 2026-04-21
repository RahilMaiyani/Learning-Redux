# 🚀 Redux Toolkit Learning Lab

A dedicated sandbox for mastering **Redux Toolkit (RTK)**, **Asynchronous Thunks**, and **State Persistence**. This project focuses on the transition from basic state management to professional-grade data handling and UI synchronization.

## 🧠 Mastered Concepts & Architecture

### 1. The Global Store & Persistence
The store serves as the central warehouse. Using `redux-persist`, we sync the global state to `localStorage` to ensure data remains consistent across browser sessions and refreshes.

```javascript
// store/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/es/storage";
import counterReducer from '../features/counter/counterSlice';
import movieReducer from '../features/movies/movieSlice';

const rootReducer = combineReducers({
    counter: counterReducer,
    movies: movieReducer
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false // Necessary for Redux Persist actions
        })
});

export const persistor = persistStore(store);
```

### 2. Async Thunks (Handling The "Waiting Room")
Since APIs are asynchronous, we use Thunks to manage the delay between a request and a response. This allows us to handle loading, success, and error states gracefully.

```javascript
// features/movies/movieThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";

export const movieData = createAsyncThunk(
    "movies/fetchMovies",
    async () => {
        const response = await fetch("[https://imdb-api.com/API_ENDPOINT](https://imdb-api.com/API_ENDPOINT)");
        const data = await response.json();
        return data.movies.description; 
    }
);
```

### 3. Slices & ExtraReducers
Slices bundle our data and logic. We use `extraReducers` to listen to the three stages of our Thunk: `pending`, `fulfilled`, and `rejected`.

```javascript
// features/movies/movieSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { movieData } from "./movieThunk";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        movies: [],
        isLoading: false,
        isInitialized: false 
    },
    reducers: {
        resetMovies: (state) => {
            state.movies = [];
            // isInitialized stays true to prevent auto-refetch on refresh
        },
        removeMovie: (state, action) => {
            state.movies = state.movies.filter(m => m["#IMDB_ID"] !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(movieData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(movieData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.movies = action.payload;
                state.isInitialized = true; 
            })
            .addCase(movieData.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export const { resetMovies, removeMovie } = movieSlice.actions;
export default movieSlice.reducer;
```

### 4. Component Integration
Using `useSelector` to read and `useDispatch` to act. We utilize the `isInitialized` flag to ensure the API only triggers when necessary.

```javascript
// App.jsx
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { movieData } from "./features/movies/movieThunk";

function App() {
  const moviesData = useSelector(state => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
      // Prevents re-fetching if data was cleared or already exists
      if (!moviesData.isInitialized) {
        dispatch(movieData());
      }
    }, [dispatch, moviesData.isInitialized]);

  return (
    <div className="flex flex-col items-center min-h-screen py-10 bg-gray-50">
      {/* Centered UI using Tailwind Flexbox */}
    </div>
  );
}
```

## 🛠️ Essential Takeaways

* **Initialization Memory:** Using an `isInitialized` flag distinguishes between an "initial empty state" and a "user-cleared empty state." This prevents unwanted API calls after a user clicks "Clear" and refreshes.
* **State vs. Logic Persistence:** Redux Persist saves **data**, not code rules. If you change a counter's limit (e.g., from -3 to -7) in your slice, you must clear the browser's `LocalStorage` for the new logic to take effect.
* **Professional UI Centering:** Replaced hardcoded padding (like `pl-56`) with Tailwind's `flex flex-col items-center`. This ensures the UI remains perfectly centered on all screen sizes.
* **Serialization Middleware:** Modern Redux requires a `serializableCheck` override when using Persist to prevent console warnings regarding how the storage engine handles data.

## 📂 Project Structure
* `src/store/`: Store configuration and Persistence engine.
* `src/features/`: Redux Slices (Logic) and Async Thunks (API).
* `src/components/`: Atomic UI components.
* `src/App.jsx`: Main layout and side-effect orchestration.
```
