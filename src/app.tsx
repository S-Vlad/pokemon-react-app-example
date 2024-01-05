import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet } from 'react-router-dom';

import SnackBarManager from 'components/snack-bar-manager';

import './app.css';

const App = () => (
  <>
    <SnackBarManager />
    <ReactQueryDevtools initialIsOpen={false} />

    <main>
      <Outlet />
    </main>
  </>
);

export default App;
