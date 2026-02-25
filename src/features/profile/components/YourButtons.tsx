// 유어프로필 버튼 (채팅, 언+팔로우, 공유) 컴포넌트
import { useState } from 'react';

import { ChatIcon } from '@/shared/icons';
import { ShareIcon } from '@/shared/icons/ShareIcon';
import { Button } from '@/shared/ui/button';

export const YourButtons = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  return (
    <div className="flex w-full items-center justify-center gap-3">
      <Button variant="yourprofilebutton">
        <ChatIcon className="text-foreground h-5 w-5" />
      </Button>
      <Button
        variant={isFollowing ? 'activ' : 'primary'}
        size="M"
        onClick={() => setIsFollowing(!isFollowing)}
      >
        {isFollowing ? '언팔로우' : '팔로우'}
      </Button>
      <Button variant="yourprofilebutton">
        <ShareIcon className="text-foreground h-5 w-5" />
      </Button>
    </div>
  );
};
