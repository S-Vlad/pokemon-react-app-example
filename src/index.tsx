import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import FallbackComponent from 'components/fallback-component.tsx';

import App from './app.tsx';
import { AppProviders } from './app-provider.tsx';

const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AppProviders>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <App />
      </ErrorBoundary>
    </AppProviders>
  </QueryClientProvider>,
);
