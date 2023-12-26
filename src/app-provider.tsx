import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from 'store/index.ts';

export const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <SnackbarProvider>
            <HelmetProvider>
              <CssBaseline enableColorScheme />

              {children}
            </HelmetProvider>
          </SnackbarProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

type Props = {
  children: React.ReactNode;
};
