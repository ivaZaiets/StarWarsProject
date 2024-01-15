import { createSlice } from '@reduxjs/toolkit';
import { Character } from '../../../types/Character';
import { getAllCharactersThunk } from '../../../thunks/AllCharactersThunk';

export interface CharactersState {
  characters: Character[],
  allCharacters: Character[],
  url: string,
}

const initialState: CharactersState = {
  characters: [],
  allCharacters: [],
  url: 'https://swapi.dev/api/people'
};

const CharactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCharactersThunk.fulfilled, (state, action) => {
      return {
        ...state,
        allCharacters: action.payload,
        characters: action.payload.slice(0, 82),
        url: ''
      };
    });
  },
});

export default CharactersSlice.reducer;
