import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { UserCard } from '@/features/search/UserCard';
import { useSearchUsers } from '@/features/search/useSearchUsers';
import { TopSearchNav } from '@/shared/ui/nav/TopSearchNav';

export function SearchPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const { users, isLoading } = useSearchUsers(keyword);

  return (
    <div className="flex h-screen flex-col bg-white">
      <TopSearchNav value={keyword} onChange={setKeyword} onBack={() => navigate(-1)} />

      <div className="flex flex-col">
        {!keyword ? (
          <div className="flex items-center justify-center py-64">
            <p className="text-sm text-gray-400">계정을 검색해보세요.</p>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center py-64">
            <p className="text-sm text-gray-400">검색 중...</p>
          </div>
        ) : (
          users.map((user) => <UserCard key={user._id} user={user} />)
        )}
      </div>
    </div>
  );
}
