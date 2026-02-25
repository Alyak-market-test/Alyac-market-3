import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/app/RootLayout';
import { FeedPage } from '@/pages/feed';
import { HomePage } from '@/pages/home';
import { NotFoundPage } from '@/pages/not-found';
import { ProfilePage } from '@/pages/profile';
import { ProfileModification } from '@/pages/profile/modification';
import { ProductAdd } from '@/pages/profile/productAdd';
import { YourProfilePage } from '@/pages/profile/yourProfile';
import { SearchPage } from '@/pages/search';
import { SignInPage } from '@/pages/signin';
import { SignUpPage } from '@/pages/signup';

export const router = createBrowserRouter([
  // BottomNav 없는 페이지
  { path: '/', element: <HomePage /> },
  { path: 'signin', element: <SignInPage /> },
  { path: 'signup', element: <SignUpPage /> },
  { path: '*', element: <NotFoundPage /> },

  // BottomNav 있는 페이지
  {
    element: <RootLayout />,
    children: [
      { path: 'feed', element: <FeedPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'profile/modification', element: <ProfileModification /> },
      { path: 'profile/productAdd', element: <ProductAdd /> },
      { path: 'profile/yourProfile', element: <YourProfilePage /> },
    ],
  },
]);
