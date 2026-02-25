import { Button } from '@/shared/ui/button';

interface UserCardProps {
  profileImage?: string;
  username: string;
  accountname: string;
  isFollowing?: boolean;
  onFollow?: () => void;
  onClick?: () => void;
}

export function UserCard({
  profileImage,
  username,
  accountname,
  isFollowing,
  onFollow,
  onClick,
}: UserCardProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex cursor-pointer items-center gap-3" onClick={onClick}>
        <div className="bg-muted h-10 w-10 shrink-0 overflow-hidden rounded-full">
          {profileImage ? (
            <img src={profileImage} alt={username} className="h-full w-full object-cover" />
          ) : (
            <div className="bg-muted h-full w-full" />
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-foreground text-sm font-medium">{username}</span>
          <span className="text-muted-foreground text-xs">@ {accountname}</span>
        </div>
      </div>

      {onFollow !== undefined && (
        <Button variant={isFollowing ? 'activ' : 'primary'} size="S" onClick={onFollow}>
          {isFollowing ? '언팔로우' : '팔로우'}
        </Button>
      )}
    </div>
  );
}
