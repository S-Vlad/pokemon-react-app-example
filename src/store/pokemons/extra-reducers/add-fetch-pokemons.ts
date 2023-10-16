import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { PokemonsState } from '../pokemons-slice';
import { fetchPokemons } from '../thunks/fetch-pokemons';

export const POKEMONS_LOADING_KEY = 'pokemons-list';

export const addFetchPokemons = (builder: ActionReducerMapBuilder<PokemonsState>) => {
  builder.addCase(fetchPokemons.pending, (state) => {
    state.loadingKeys = [...state.loadingKeys, POKEMONS_LOADING_KEY];
  });
  builder.addCase(fetchPokemons.fulfilled, (state, action) => {
    const { payload } = action;

    state.count = payload.count;
    state.loadingKeys = state.loadingKeys.filter((itm) => itm !== POKEMONS_LOADING_KEY);
    state.next = payload.next;

    if (payload.previous) {
      state.list.push(...payload.results);
    } else {
      state.list = payload.results;
    }
  });
  builder.addCase(fetchPokemons.rejected, (state) => {
    state.loadingKeys = state.loadingKeys.filter((itm) => itm !== POKEMONS_LOADING_KEY);
    // state.error = action.payload;
  });
};
