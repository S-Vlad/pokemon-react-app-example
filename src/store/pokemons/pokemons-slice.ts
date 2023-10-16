import { createSlice } from '@reduxjs/toolkit';

import { Pokemon, PokemonShort } from 'api/types/pokemon';

import { addFetchPokemons } from './extra-reducers/add-fetch-pokemons';
import { addFetchPokemonDetails } from './extra-reducers/add-fetch-pokemon-details';

export type PokemonsState = {
  charsByName: { [key: string]: Pokemon };
  count: number;
  // error?: string;
  list: PokemonShort[];
  loadingKeys: string[];
  next: string | null;
  previous: string | null;
};

const initialState: PokemonsState = {
  charsByName: {},
  count: 0,
  // error: undefined,
  list: [],
  loadingKeys: [],
  next: null,
  previous: null,
};

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addFetchPokemons(builder);
    addFetchPokemonDetails(builder);
  },
});

export default pokemonsSlice.reducer;
