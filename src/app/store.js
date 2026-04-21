import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer} from 'redux-persist';
import storage from "redux-persist/es/storage"

import counterReducer from '../features/counter/counterSlice';
import movieReducer from '../features/movies/movieSlice';

const rootReducer = combineReducers({
    counter : counterReducer,
    movies : movieReducer
});

const persistConfig = {
    key : "root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// console.log("root reducer : ", rootReducer)
// console.log("persisted reducer : ", persistedReducer)

export const store = configureStore({
    reducer : persistedReducer,
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck : false
        }) 
});

export const persistor = persistStore(store);