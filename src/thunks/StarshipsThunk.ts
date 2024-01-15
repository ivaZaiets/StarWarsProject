import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getStarshipsThunk = createAsyncThunk(
  'starshps/getStarships',
  async () => {
    const response = await axios.get("https://swapi.dev/api/starships/");
    return response.data;
  }
);

