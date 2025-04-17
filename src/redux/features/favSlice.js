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
  },
});

export const { addToFavo, removeFavo } = favSlice.actions;
export default favSlice.reducer;
