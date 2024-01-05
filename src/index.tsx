import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { queryClient } from 'api/react-query';
import FallbackComponent from 'components/fallback-component.tsx';
import FetchOverlay from 'components/fetch-overlay';
import { store } from 'store/index.ts';

import { Router } from './router';

export const AppProviders: React.FC = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <SnackbarProvider>
          <HelmetProvider>
            <ErrorBoundary FallbackComponent={FallbackComponent}>
              <Suspense fallback={<FetchOverlay isFetching />}>
                <Router />
              </Suspense>
            </ErrorBoundary>
          </HelmetProvider>
        </SnackbarProvider>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AppProviders />
  </QueryClientProvider>,
);
