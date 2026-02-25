import { useNavigate } from 'react-router-dom';

interface User {
  _id: string;
  username: string;
  accountname: string;
  image: string;
}

interface UserCardProps {
  user: User;
  onClick?: () => void;
}

export function UserCard({ user, onClick }: UserCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="hover:bg-accent flex cursor-pointer items-center gap-3 px-4 py-3"
      onClick={() => {
        onClick?.();
        navigate('/profile/yourProfile');
      }}
    >
      <div className="bg-muted flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
        {user.image ? (
          <img
            src={user.image}
            alt={user.username}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
              stroke="#aaa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
              stroke="#aaa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <div>
        <p className="text-sm font-medium">{user.username}</p>
        <p className="text-muted-foreground text-xs">@{user.accountname}</p>
      </div>
    </div>
  );
}
