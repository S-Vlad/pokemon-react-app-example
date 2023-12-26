import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from 'store/index.ts';

export const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <SnackbarProvider>
            <CssBaseline enableColorScheme />

            {children}
          </SnackbarProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

type Props = {
  children: React.ReactNode;
};
