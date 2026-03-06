import { Button } from '@/shared/ui/Button';

interface Props {
  isFollowing: boolean;
  loading: boolean;
  onToggle: () => void;
}

const FollowButton = ({ isFollowing, loading, onToggle }: Props) => {
  return (
    <Button
      type="button"
      variant={isFollowing ? 'activ' : 'primary'}
      size="M"
      onClick={onToggle}
      disabled={loading}
    >
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

export default FollowButton;
