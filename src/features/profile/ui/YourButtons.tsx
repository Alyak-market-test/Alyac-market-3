import { FollowButton } from '@/features/follow';
import { Button } from '@/shared';
import { ChatIcon, ShareIcon } from '@/shared/icons';

interface Props {
  isFollowing: boolean;
  loading: boolean;
  onToggleFollow: () => void;
}

export const YourButtons = ({ isFollowing, loading, onToggleFollow }: Props) => {
  return (
    <div className="flex w-full items-center justify-center gap-3">
      <Button variant="yourprofilebutton">
        <ChatIcon className="text-foreground h-5 w-5" />
      </Button>

      <FollowButton isFollowing={isFollowing} loading={loading} onToggle={onToggleFollow} />

      <Button variant="yourprofilebutton">
        <ShareIcon className="text-foreground h-5 w-5" />
      </Button>
    </div>
  );
};
