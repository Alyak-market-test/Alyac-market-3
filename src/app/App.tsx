import { StrictMode } from 'react';

import { RouterProvider } from 'react-router-dom';

import './index.css';
import { Providers } from './providers';
import { router } from './routes';

export default function App() {
  return (
    <StrictMode>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </StrictMode>
  );
}
