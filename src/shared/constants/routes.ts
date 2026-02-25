// 모델	        주요 필드
// User	       _id, username, email, accountname, intro, image, following, follower
// Post	        id, content, image, hearted, heartCount, commentCount, author
// Comment    	id, content, postId, author
// Product	    id, itemName, price, link, itemImage, author
export const ROUTES = {
  HOME: '/',
  FEED: '/feed',
  LOGIN: '/login',
  SIGNUP: '/signup',
  SEARCH: '/search',
  PROFILE: '/profile',
  POST: {
    DETAIL: '/post/:post_id',
    UPLOAD: '/upload',
  },
  PRODUCT: {
    UPLOAD: '/product/upload',
  },
  CHAT: {
    LIST: '/chat',
    DETAIL: '/chat/:id',
  },
} as const;
