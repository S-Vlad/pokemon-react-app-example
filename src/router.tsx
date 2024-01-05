import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { queryClient } from 'api/react-query';
import { POKEMON_DETAILS, MAIN } from 'constants/routes';

import App from './app';
import { loader as pokemonLoader } from './api/get-pokemon-details';
import { loader as pokemonsLoader } from './api/get-pokemons';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={MAIN} element={<App />}>
      <Route index lazy={() => import('./navigation/main')} loader={pokemonsLoader(queryClient)} />
      <Route
        path={`${POKEMON_DETAILS}/:name`}
        lazy={() => import('./navigation/pokemon-details')}
        loader={pokemonLoader(queryClient)}
      />
      <Route path='*' lazy={() => import('./navigation/not-found')} />
    </Route>,
  ),
);

export const Router = () => <RouterProvider router={router} />;
