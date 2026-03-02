export interface PostAuthor {
  accountname: string;
  username: string;
  image: string;
}

export interface Post {
  id: string;
  content: string;
  image: string;
  createdAt: string;
  author: PostAuthor;
  commentCount: number;
  heartCount: number;
  hearted: boolean;
}
