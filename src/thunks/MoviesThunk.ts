import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMoviesThunk = createAsyncThunk(
  'movies/getMovies',
  async () => {
    const response = await axios.get("https://swapi.dev/api/films");
    return response.data;
  }
);

