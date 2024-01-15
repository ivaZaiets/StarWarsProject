import { createSlice } from '@reduxjs/toolkit';
import { Starship } from '../../../types/Starship';
import { getStarshipsThunk } from '../../../thunks/StarshipsThunk';

export interface StarshipsState {
  starships: Starship[];
}

const initialState: StarshipsState = {
  starships: [],
};

const StarshipsSlice = createSlice({
  name: 'starships',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStarshipsThunk.fulfilled, (state, action) => {
      return {
        ...state,
        starships: action.payload.results,
      };
    });
  },
});

export default StarshipsSlice.reducer;
