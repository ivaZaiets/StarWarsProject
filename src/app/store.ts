import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import moviesReducer from '../components/features/movies/MoviesSlice';
import charactersReducer from '../components/features/characters/CharactersSlice';
import starshipsReducer from '../components/features/starships/StarshipsSlice';
import speciesReducer from '../components/features/species/SpeciesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    characters: charactersReducer,
    starships: starshipsReducer,
    species: speciesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
