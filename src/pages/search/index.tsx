import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { TopSearchNav } from '@/shared/ui/nav/TopSearchNav';

// 임시 더미 데이터 - 나중에 API 연동 시 교체
const DUMMY_USERS = [
  { id: 1, name: '이스트 시큐리티 알약', username: 'estSecurity_Alyac', image: null },
  { id: 2, name: '알약 클라우드 이스트 시큐리티', username: 'alyac_cloud', image: null },
  { id: 3, name: '보안 백신 솔루션 알약', username: 'security_alyac', image: null },
  { id: 4, name: '알약 공식계정', username: 'alyac_official', image: null },
];

export function SearchPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const filtered = DUMMY_USERS.filter(
    (user) => user.name.includes(keyword) || user.username.includes(keyword),
  );

  return (
    <div className="flex h-screen flex-col bg-white">
      <TopSearchNav value={keyword} onChange={setKeyword} onBack={() => navigate(-1)} />

      <div className="flex flex-col">
        {keyword &&
          filtered.map((user) => (
            <div
              key={user.id}
              className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-gray-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
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
              </div>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-400">@{user.username}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
