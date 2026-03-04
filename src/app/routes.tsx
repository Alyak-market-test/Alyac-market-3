import { Suspense, lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/app/RootLayout';

const HomePage = lazy(() => import('@/pages/home').then((m) => ({ default: m.HomePage })));
const SignInPage = lazy(() => import('@/pages/signin').then((m) => ({ default: m.SignInPage })));
const SignUpPage = lazy(() => import('@/pages/signup').then((m) => ({ default: m.SignUpPage })));
const SignUpProfilePage = lazy(() =>
  import('@/pages/signup/profile').then((m) => ({ default: m.SignUpProfilePage })),
);
const ChatRoomPage = lazy(() =>
  import('@/pages/chat-room').then((m) => ({ default: m.ChatRoomPage })),
);
const NotFoundPage = lazy(() =>
  import('@/pages/not-found').then((m) => ({ default: m.NotFoundPage })),
);
const FeedPage = lazy(() => import('@/pages/feed').then((m) => ({ default: m.FeedPage })));
const SearchPage = lazy(() => import('@/pages/search').then((m) => ({ default: m.SearchPage })));
const ProfilePage = lazy(() => import('@/pages/profile').then((m) => ({ default: m.ProfilePage })));
const ProfileModification = lazy(() =>
  import('@/pages/profile-modification').then((m) => ({ default: m.ProfileModification })),
);
const ProductAdd = lazy(() =>
  import('@/pages/product-add').then((m) => ({ default: m.ProductAdd })),
);
const ChatListPage = lazy(() =>
  import('@/pages/chat-list').then((m) => ({ default: m.ChatListPage })),
);

const wrap = (element: React.ReactNode) => <Suspense fallback={null}>{element}</Suspense>;

export const router = createBrowserRouter([
  { path: '/', element: wrap(<HomePage />) },
  { path: 'signin', element: wrap(<SignInPage />) },
  { path: 'signup', element: wrap(<SignUpPage />) },
  { path: 'signup/profile', element: wrap(<SignUpProfilePage />) },
  { path: 'chat/:id', element: wrap(<ChatRoomPage />) },
  { path: '*', element: wrap(<NotFoundPage />) },

  {
    element: <RootLayout />,
    children: [
      { path: 'feed', element: wrap(<FeedPage />) },
      { path: 'search', element: wrap(<SearchPage />) },
      { path: 'profile', element: wrap(<ProfilePage />) },
      { path: 'profile/:accountname', element: wrap(<ProfilePage />) },
      { path: 'profile-modification', element: wrap(<ProfileModification />) },
      { path: 'product-add', element: wrap(<ProductAdd />) },
      { path: 'chat', element: wrap(<ChatListPage />) },
    ],
  },
]);
