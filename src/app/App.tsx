import { StrictMode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@/shared/lib/theme';

import './index.css';
import { router } from './routes';

const queryClient = new QueryClient();

export default function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system">
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
