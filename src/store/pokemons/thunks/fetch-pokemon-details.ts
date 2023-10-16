import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { endpoints } from 'api/endpoints';
import { Pokemon } from 'api/types/pokemon';
import { showSnackbar } from 'store/app/app-slice';

export const fetchPokemonDetails = createAsyncThunk<Pokemon, string, { rejectValue: string }>(
  'pokemons/fetchPokemonDetails',
  async (id, thunkAPI) => {
    try {
      const { stats, ...otherResponse } = await endpoints.pokemon.get(id, thunkAPI.signal);

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
    } catch (e) {
      const message = 'failed to fetch pokemon';

      if (e instanceof AxiosError && e.name !== 'CanceledError') {
        thunkAPI.dispatch(showSnackbar({ message }));
      }

      return thunkAPI.rejectWithValue(message);
    }
  },
);
