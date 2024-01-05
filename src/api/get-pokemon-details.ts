import { useQuery, QueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import type { Params } from 'react-router-dom';

import { PokemonResponse } from 'api/types';

const CHARACTER_URL = 'https://pokeapi.co/api/v2/pokemon';

const getPokemonDetails = async (id: string) => {
  const url = `${CHARACTER_URL}/${id}`;

  const response: AxiosResponse<PokemonResponse> = await axios.get(url);

  const { stats, ...otherResponse } = response.data;
  const result = {
    id: otherResponse.id,
    height: otherResponse.height,
    name: otherResponse.name,
    sprites: { front_default: otherResponse.sprites.other['official-artwork'].front_default },
    stats: {
      hp: stats[0].base_stat,
      attack: stats[1].base_stat,
      defense: stats[2].base_stat,
      'special-attack': stats[3].base_stat,
      'special-defense': stats[4].base_stat,
      speed: stats[5].base_stat,
    },
    types: otherResponse.types.map((i) => i.type.name),
    weight: otherResponse.weight,
  };

  return result;
};

const pokemonQuery = (name: string) => ({
  queryKey: ['pokemon', name],
  queryFn: () => getPokemonDetails(name),
  staleTime: Infinity,
});

export const loader =
  (queryClient: QueryClient) =>
  ({ params }: { params: Params<'name'> }) => {
    const query = pokemonQuery(params.name as string);

    return queryClient.ensureQueryData(query);
  };

export const usePokemonDetails = (name: string) => useQuery(pokemonQuery(name));
