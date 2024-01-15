import { createSlice } from '@reduxjs/toolkit';
import { getSpeciesThunk } from '../../../thunks/SpeciesThunk';
import { Specie } from '../../../types/Specie';

export interface SpeciesState {
  species: Specie[];
}

const initialState: SpeciesState = {
  species: [],
};

const SpeciesSlice = createSlice({
  name: 'species',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSpeciesThunk.fulfilled, (state, action) => {
      return {
        ...state,
        starships: action.payload.results,
      };
    });
  },
});

export default SpeciesSlice.reducer;
