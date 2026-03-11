// 모델	        주요 필드
// User	       _id, username, email, accountname, intro, image, following, follower
// Post	        id, content, image, hearted, heartCount, commentCount, author
// Comment    	id, content, postId, author
// Product	    id, itemName, price, link, itemImage, author
export const ROUTES = {
  HOME: '/',
  FEED: '/feed',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  SIGNUP_PROFILE: '/signup-profile-setup',
  SEARCH: '/search',
  PROFILE: '/profile',
  PROFILE_MODIFICATION: '/profile-modification',
  POST: {
    DETAIL: (postId: string) => `/post/${postId}`,
    ADD: '/post-add',
    EDIT: (postId: string) => `/post/${postId}/edit`,
  },
  PRODUCT: {
    ADD: '/product-add',
    EDIT: (productId: string) => `/product-edit/${productId}`,
  },
  CHAT: {
    LIST: '/chat',
    DETAIL: (id: string) => `/chat/${id}`,
  },
  FOLLOW_LIST: (accountname: string) => `/profile/${accountname}/follow`,
} as const;
