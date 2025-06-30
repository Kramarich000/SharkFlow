import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'highlight.js/styles/github-dark.css';
import App from './App.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 15,
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      keepPreviousData: true,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: true,
      suspense: false, 
      useErrorBoundary: false,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
);
