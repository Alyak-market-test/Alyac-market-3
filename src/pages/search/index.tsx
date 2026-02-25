import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { SearchHistory } from '@/features/search/SearchHistory';
import { UserCard } from '@/features/search/UserCard';
import { useSearchHistory } from '@/features/search/useSearchHistory';
import { useSearchUsers } from '@/features/search/useSearchUsers';
import { TopSearchNav } from '@/shared/ui/nav/TopSearchNav';

export function SearchPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const { users, isLoading } = useSearchUsers(keyword);
  const { history, addHistory, removeHistory } = useSearchHistory();

  const handleSelect = (word: string) => {
    setKeyword(word);
    addHistory(word);
  };

  const renderContent = () => {
    if (!keyword) {
      if (history.length === 0) {
        return (
          <div className="flex items-center justify-center py-64">
            <p className="text-sm text-gray-400">계정을 검색해보세요.</p>
          </div>
        );
      }
      return <SearchHistory history={history} onSelect={handleSelect} onRemove={removeHistory} />;
    }

    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-64">
          <p className="text-sm text-gray-400">검색 중...</p>
        </div>
      );
    }

    return users.map((user) => (
      <UserCard key={user._id} user={user} keyword={keyword} onClick={() => addHistory(keyword)} />
    ));
  };

  return (
    <div className="bg-background flex h-screen flex-col">
      <div onKeyDown={handleKeyDown}>
        <TopSearchNav
          value={keyword}
          onChange={(value) => setKeyword(value)}
          onBack={() => navigate(-1)}
        />
      </div>
      <div className="flex flex-col">
        {!keyword ? (
          history.length === 0 ? (
            <div className="flex items-center justify-center py-64">
              <p className="text-muted-foreground text-sm">계정을 검색해보세요.</p>
            </div>
          ) : (
            <SearchHistory history={history} onSelect={handleSelect} onRemove={removeHistory} />
          )
        ) : isLoading ? (
          <div className="flex items-center justify-center py-64">
            <p className="text-muted-foreground text-sm">검색 중...</p>
          </div>
        ) : (
          users.map((user) => (
            <UserCard key={user._id} user={user} onClick={() => addHistory(keyword)} />
          ))
        )}
      </div>
    </div>
  );
}
