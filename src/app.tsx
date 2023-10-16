import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import SnackBarManager from 'components/snack-bar-manager';
import { POKEMON_DETAILS, MAIN } from 'constants/routes';

import PokemonDetails from 'navigation/pokemon-details';
import MainPage from 'navigation/main';
import NotFound from 'navigation/not-found';

import './app.css';

function App() {
  return (
    <>
      <CssBaseline enableColorScheme />
      <SnackBarManager />

      <main>
        <Routes>
          <Route path={MAIN} element={<MainPage />} />
          <Route path={`${POKEMON_DETAILS}/:name`} element={<PokemonDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;