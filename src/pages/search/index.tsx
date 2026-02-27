import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { UserCard, useSearchHistory, useSearchUsers } from '@/features/search';
import { TopSearchNav } from '@/shared/ui/nav/TopSearchNav';
import { SearchHistorySection } from '@/widgets/search-history';

export function SearchPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const { users, isLoading } = useSearchUsers(keyword);
  const { history, addHistory, removeHistory } = useSearchHistory();

  const handleSearch = (word: string) => {
    setKeyword(word);
    addHistory(word);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && keyword.trim()) {
      addHistory(keyword);
    }
  };

  const renderContent = () => {
    if (!keyword) {
      return (
        <SearchHistorySection history={history} onSelect={handleSearch} onRemove={removeHistory} />
      );
    }

    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-64">
          <p className="text-muted-foreground text-sm">검색 중...</p>
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
      <div className="flex flex-col">{renderContent()}</div>
    </div>
  );
}
