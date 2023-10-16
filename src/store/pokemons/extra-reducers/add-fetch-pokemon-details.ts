import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { PokemonsState } from '../pokemons-slice';
import { fetchPokemonDetails } from '../thunks/fetch-pokemon-details';

export const POKEMON_LOADING_KEY = 'pokemon-item';

export const addFetchPokemonDetails = (builder: ActionReducerMapBuilder<PokemonsState>) => {
  builder.addCase(fetchPokemonDetails.pending, (state) => {
    state.loadingKeys = [...state.loadingKeys, POKEMON_LOADING_KEY];
  });
  builder.addCase(fetchPokemonDetails.fulfilled, (state, action) => {
    state.loadingKeys = state.loadingKeys.filter((itm) => itm !== POKEMON_LOADING_KEY);
    state.charsByName[action.payload.name] = action.payload;
  });
  builder.addCase(fetchPokemonDetails.rejected, (state) => {
    state.loadingKeys = state.loadingKeys.filter((itm) => itm !== POKEMON_LOADING_KEY);
    // state.error = action.payload;
  });
};
