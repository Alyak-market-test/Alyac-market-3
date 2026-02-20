export interface ChatRoom {
  id: string;
  opponent: {
    accountname: string;
    username: string;
    image: string;
  };
  lastMessage: string;
  updatedAt: string;
  unread: boolean;
}

export interface ChatMessage {
  id: string;
  message: string;
  image?: string;
  sender: string;
  createdAt: string;
}
