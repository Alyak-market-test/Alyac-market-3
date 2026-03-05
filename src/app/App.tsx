import { StrictMode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

import { UserProvider } from '@/entities/auth';
import { ThemeProvider } from '@/shared/lib/theme';

import './index.css';
import { router } from './routes';

const queryClient = new QueryClient();

export default function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system">
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
