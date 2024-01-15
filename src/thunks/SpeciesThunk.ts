import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSpeciesThunk = createAsyncThunk(
  'species/getSpecies',
  async () => {
    const response = await axios.get("https://swapi.dev/api/species/");
    return response.data;
  }
);

