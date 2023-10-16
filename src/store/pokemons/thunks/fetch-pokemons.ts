import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { endpoints } from 'api/endpoints';
import { PokemonsResponse } from 'api/types/pokemon';
import { showSnackbar } from 'store/app/app-slice';

export const fetchPokemons = createAsyncThunk<PokemonsResponse, void, { rejectValue: string }>(
  'pokemons/fetchPokemons',
  async (_, thunkAPI) => {
    try {
      const response = await endpoints.pokemons.get(thunkAPI.signal);

      return response;
    } catch (e) {
      const message = 'failed to fetch pokemons';

      if (e instanceof AxiosError && e.name !== 'CanceledError') {
        thunkAPI.dispatch(showSnackbar({ message }));
      }

      return thunkAPI.rejectWithValue(message);
    }
  },
);
