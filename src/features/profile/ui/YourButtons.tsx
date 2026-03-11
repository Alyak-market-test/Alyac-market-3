import { Button } from '@/shared';
import { ChatIcon, ShareIcon } from '@/shared/icons';

interface Props {
  followButton: React.ReactNode;
}

export const YourButtons = ({ followButton }: Props) => {
  return (
    <div className="flex w-full items-center justify-center gap-3">
      <Button variant="yourprofilebutton">
        <ChatIcon className="text-foreground h-5 w-5" />
      </Button>

      {followButton}

      <Button variant="yourprofilebutton">
        <ShareIcon className="text-foreground h-5 w-5" />
      </Button>
    </div>
  );
};
