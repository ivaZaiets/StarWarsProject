import { createSlice } from '@reduxjs/toolkit';
import { getMoviesThunk } from '../../../thunks/MoviesThunk';
import { Movie } from '../../../types/Movie';

export interface MoviesState {
  movies: Movie[];
}

const initialState: MoviesState = {
  movies: [],
};

const MoviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMoviesThunk.fulfilled, (state, action) => {
      return {
        ...state,
        movies: action.payload.results,
      };
    });
  },
});

export default MoviesSlice.reducer;
export const { actions } = MoviesSlice;
