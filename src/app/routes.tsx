import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/app/RootLayout';
import { FeedPage } from '@/pages/feed';
import { HomePage } from '@/pages/home';
import { NotFoundPage } from '@/pages/not-found';
import { ProductAdd } from '@/pages/product-add';
import { ProfilePage } from '@/pages/profile';
import { ProfileModification } from '@/pages/profile-modification';
import { SearchPage } from '@/pages/search';
import { SignInPage } from '@/pages/signin';
import { SignUpPage } from '@/pages/signup';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    element: <RootLayout />,
    children: [
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'profile/:accountname',
        element: <ProfilePage />,
      },
      {
        path: 'profile-modification',
        element: <ProfileModification />,
      },
      {
        path: 'product-add',
        element: <ProductAdd />,
      },
    ],
  },
  {
    path: 'signin',
    element: <SignInPage />,
  },
  {
    path: 'signup',
    element: <SignUpPage />,
  },
  {
    path: 'feed',
    element: <FeedPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
