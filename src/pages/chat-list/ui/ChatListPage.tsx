import { useNavigate } from 'react-router-dom';

import { TopChatNav } from '@/shared';
import { AvatarImage } from '@/shared/icons';

interface ChatRoom {
  id: string;
  username: string;
  image?: string;
  lastMessage: string;
  date: string;
}

const mockChats: ChatRoom[] = [
  {
    id: '1',
    username: '이스트 시큐리티',
    lastMessage: '언제 좋습 되나요?',
    date: '2020.10.23',
  },
  {
    id: '2',
    username: '이스트 소프트',
    lastMessage: '금번에 것이 있어 연락드렸습니다. 이번에 알...',
    date: '2020.10.23',
  },
  {
    id: '3',
    username: '보안 백신 전문가',
    lastMessage: '오늘 시간되시나요? 아까를 것이 있습니다. 이...',
    date: '2020.10.23',
  },
];

export function ChatListPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      <TopChatNav title="" onBack={() => navigate(-1)} onMore={() => {}} />
      <main className="flex-1 divide-y">
        {mockChats.map((chat) => (
          <div
            key={chat.id}
            className="hover:bg-accent flex cursor-pointer items-center gap-3 px-4 py-4"
            onClick={() => navigate(`/chat/${chat.id}`)}
          >
            <AvatarImage src={chat.image} alt={chat.username} size="lg" iconSize="sm" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{chat.username}</p>
              <p className="text-muted-foreground truncate text-xs">{chat.lastMessage}</p>
            </div>
            <span className="text-muted-foreground shrink-0 text-xs">{chat.date}</span>
          </div>
        ))}
      </main>
    </div>
  );
}
