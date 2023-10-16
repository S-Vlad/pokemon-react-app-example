import axios, { AxiosResponse } from 'axios';

import { PokemonResponse, PokemonsResponse } from 'api/types/pokemon';

const CHARACTER_URL = 'https://pokeapi.co/api/v2/pokemon';
const LIMIT_COUNT = 1017;

export const endpoints = {
  pokemon: {
    get: async (id: string, signal: AbortSignal) => {
      const url = `${CHARACTER_URL}/${id}`;
      const response: AxiosResponse<PokemonResponse> = await axios.get(url, { signal });

      return response.data;
    },
  },
  pokemons: {
    get: async (signal: AbortSignal) => {
      const url = `${CHARACTER_URL}?limit=${LIMIT_COUNT}`;
      const response: AxiosResponse<PokemonsResponse> = await axios.get(url, { signal });

      return response.data;
    },
  },
};
