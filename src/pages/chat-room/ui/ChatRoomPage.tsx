import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Input } from '@/shared';
import { TopChatNav } from '@/shared/ui/nav/TopChatNav';

interface Message {
  id: string;
  text: string;
  isMine: boolean;
  time: string;
}

const mockMessages: Message[] = [
  {
    id: '1',
    text: '지능형 사이버 위협에 가장 실효적으로 대응할 수 있는 딥러닝 기반의 악성코드 위협 대응 솔루션이 있는지 궁금하여 연락드렸습니다.',
    isMine: false,
    time: '12:39',
  },
  {
    id: '2',
    text: '시간날 때 확인 후에 답변해주세요.',
    isMine: false,
    time: '12:41',
  },
  {
    id: '3',
    text: 'Treat Inside 입니다.',
    isMine: true,
    time: '12:50',
  },
];

export function ChatRoomPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [showModal, setShowModal] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: input, isMine: true, time: '지금' },
    ]);
    setInput('');
  };

  return (
    <div className="flex h-screen flex-col">
      <TopChatNav
        title="이스트 시큐리티 알약"
        onBack={() => navigate(-1)}
        onMore={() => setShowModal(true)}
      />

      {/* 메시지 목록 */}
      <main className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.isMine ? 'justify-end' : 'justify-start'}`}
          >
            {!msg.isMine && <div className="bg-muted h-8 w-8 shrink-0 rounded-full" />}
            <div className={`flex flex-col ${msg.isMine ? 'items-end' : 'items-start'}`}>
              <div
                className={`max-w-60 rounded-2xl px-4 py-2 text-sm ${
                  msg.isMine ? 'bg-[#11CC27] text-white' : 'bg-muted text-foreground'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-muted-foreground mt-1 text-xs">{msg.time}</span>
            </div>
          </div>
        ))}
      </main>

      {/* 입력창 */}
      <div className="bg-background flex items-center gap-3 border-t px-4 py-3">
        <div className="bg-muted h-8 w-8 shrink-0 rounded-full" />
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="메시지 입력하기..."
          className="border-none shadow-none outline-none focus-visible:ring-0"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSend}
          disabled={!input.trim()}
          className="disabled:text-muted-foreground font-medium text-[#11CC27]"
        >
          전송
        </Button>
      </div>

      {/* 하단 모달 */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black/30" onClick={() => setShowModal(false)} />
          <div className="bg-background fixed right-0 bottom-0 left-0 rounded-t-2xl px-4 py-6">
            <div className="bg-muted mx-auto mb-4 h-1 w-10 rounded-full" />
            <Button
              variant="ghost"
              size="none"
              className="w-full py-3 text-left text-sm text-red-500"
              onClick={() => {
                setShowModal(false);
                navigate(-1);
              }}
            >
              채팅방 나가기
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
