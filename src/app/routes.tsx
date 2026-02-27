import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/app/RootLayout';
import { FeedPage } from '@/pages/feed';
import { HomePage } from '@/pages/home';
import { NotFoundPage } from '@/pages/not-found';
import { PostAddPage } from '@/pages/post-add';
import { ProductAdd } from '@/pages/product-add';
import { ProfilePage } from '@/pages/profile';
import { ProfileModification } from '@/pages/profile-modification';
import { SearchPage } from '@/pages/search';
import { SignInPage } from '@/pages/signin';
import { SignUpPage } from '@/pages/signup';
import { SignUpProfilePage } from '@/pages/signup/profile';

export const router = createBrowserRouter([
  // BottomNav 없는 페이지
  { path: '/', element: <HomePage /> },
  { path: 'signin', element: <SignInPage /> },
  { path: 'signup', element: <SignUpPage /> },
  { path: 'signup/profile', element: <SignUpProfilePage /> },
  { path: '*', element: <NotFoundPage /> },
  { path: 'post-add', element: <PostAddPage /> },

  // BottomNav 있는 페이지
  {
    element: <RootLayout />,
    children: [
      { path: 'feed', element: <FeedPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'profile/:accountname', element: <ProfilePage /> },
      { path: 'profile-modification', element: <ProfileModification /> },
      { path: 'product-add', element: <ProductAdd /> },
    ],
  },
]);
