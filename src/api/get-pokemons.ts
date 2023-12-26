import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

import { PokemonsResponse } from 'api/types';

const CHARACTER_URL = 'https://pokeapi.co/api/v2/pokemon';
const LIMIT_COUNT = 1017;
const url = `${CHARACTER_URL}?limit=${LIMIT_COUNT}`;

const getPokemons = async () => {
  const response: AxiosResponse<PokemonsResponse> = await axios.get(url);
  return response.data;
};

export const usePokemons = () =>
  useQuery({
    queryKey: ['pokemon'],
    queryFn: () => getPokemons(),
    staleTime: Infinity,
    gcTime: Infinity,
  });
