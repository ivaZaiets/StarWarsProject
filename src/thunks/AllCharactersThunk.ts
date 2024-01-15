import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Character } from '../types/Character';

export const getAllCharactersThunk = createAsyncThunk(
  'characters/getAllCharacters',
  async (url: string) => {
    let allCharacters: Character[] = [];
    let nextUrl = url;

    let idCounter = 1;

    function generateUniqueId() {
      return idCounter++;
    }

    while (nextUrl) {
      const response = await axios.get(nextUrl);
      const charactersWithId = response.data.results.map((character: Character) => ({
        ...character,
        id: generateUniqueId(),
      }));
      allCharacters = [...allCharacters, ...charactersWithId];
      nextUrl = response.data.next;
    }

    return allCharacters;
  }
);
