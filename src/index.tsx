import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';

import App from './app.tsx';
import { AppProviders } from './app-provider.tsx';

const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AppProviders>
      <App />
    </AppProviders>
  </QueryClientProvider>,
);
