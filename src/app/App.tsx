import { StrictMode } from 'react';

import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import './index.css';
import { Providers } from './providers';
import { router } from './routes';

export default function App() {
  return (
    <StrictMode>
      <Providers>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 1500,
            style: {
              background: 'var(--color-background)',
              color: 'var(--color-destructive)',
              border: '1px solid var(--color-border)',
            },
          }}
        />
      </Providers>
    </StrictMode>
  );
}
