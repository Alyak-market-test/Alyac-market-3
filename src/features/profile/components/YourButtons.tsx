// 유어프로필 버튼 (채팅, 언+팔로우, 공유) 컴포넌트
import { FollowButton } from '@/features/follow';
import { ChatIcon } from '@/shared/icons';
import { ShareIcon } from '@/shared/icons/ShareIcon';
import { Button } from '@/shared/ui/button';

interface Props {
  accountname: string;
  initialIsFollowing: boolean;
  initialFollowerCount: number;
}

export const YourButtons = ({ accountname, initialIsFollowing, initialFollowerCount }: Props) => {
  return (
    <div className="flex w-full items-center justify-center gap-3">
      <Button variant="yourprofilebutton">
        <ChatIcon className="text-foreground h-5 w-5" />
      </Button>

      <FollowButton
        accountname={accountname}
        initialState={{
          isFollowing: initialIsFollowing,
          followerCount: initialFollowerCount,
        }}
      />

      <Button variant="yourprofilebutton">
        <ShareIcon className="text-foreground h-5 w-5" />
      </Button>
    </div>
  );
};
