import type { FollowState } from '@/entities/follow';
import { useFollow } from '@/features/follow/hooks/UseFollow';
import { Button } from '@/shared/ui/button';

interface Props {
  accountname: string;
  initialState: FollowState;
}

const FollowButton = ({ accountname, initialState }: Props) => {
  const { isFollowing, loading, toggleFollow } = useFollow(accountname, initialState);

  return (
    <Button
      type="button"
      variant={isFollowing ? 'activ' : 'primary'}
      size="M"
      onClick={toggleFollow}
      disabled={loading}
    >
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

export default FollowButton;
