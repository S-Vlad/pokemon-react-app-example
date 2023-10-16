import { configureStore } from '@reduxjs/toolkit';

import app from './app/app-slice';
import pokemons from './pokemons/pokemons-slice';

export const store = configureStore({
  reducer: {
    app,
    pokemons,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
