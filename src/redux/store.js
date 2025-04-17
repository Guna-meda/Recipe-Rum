import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice';
import favoriteReducer from './features/favSlice';

export const store = configureStore({
  reducer : {
    auth:authReducer ,
    favorites: favoriteReducer,
  }
})