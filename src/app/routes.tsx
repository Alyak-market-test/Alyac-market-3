import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/app/RootLayout';
import { HomePage } from '@/pages/home';
import { NotFoundPage } from '@/pages/not-found';
import { ProfilePage } from '@/pages/profile';
import { ProfileModification } from '@/pages/profile/modification';
import { ProductAdd } from '@/pages/profile/productAdd';
import { YourProfilePage } from '@/pages/profile/yourProfile';
import { SignInPage } from '@/pages/signin';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },

      {
        path: 'profile/modification',
        element: <ProfileModification />,
      },
      {
        path: 'profile/productAdd',
        element: <ProductAdd />,
      },
      {
        path: 'profile/yourProfile',
        element: <YourProfilePage />,
      },
    ],
  },
  {
    path: 'signin',
    element: <SignInPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
