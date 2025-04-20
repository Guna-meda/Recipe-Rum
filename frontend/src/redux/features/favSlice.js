import { createSlice } from '@reduxjs/toolkit';

const favSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addToFavo: (state, action) => {
      const exists = state.find((item) => item.id === action.payload.id);
      if (!exists) state.push(action.payload);
    },
    removeFavo: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    setFavorites: (state, action) => {
      return action.payload; 
    },
  },
});

export const { addToFavo, removeFavo,setFavorites } = favSlice.actions;
export default favSlice.reducer;
