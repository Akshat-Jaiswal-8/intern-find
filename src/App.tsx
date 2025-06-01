import { BrowserRouter } from 'react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AnimatedRoutes } from './components/animated-routes';
import { ThemeProvider } from './components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/sonner';
import React, { useMemo } from 'react';

const App = React.memo(() => {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
        <Toaster richColors position='top-right' closeButton />
      </ThemeProvider>
    </QueryClientProvider>
  );
});

App.displayName = 'App';

export default App;
