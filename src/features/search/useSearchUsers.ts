import { useEffect, useState } from 'react';

interface User {
  _id: string;
  username: string;
  accountname: string;
  intro: string;
  image: string;
}

export function useSearchUsers(keyword: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!keyword) {
      setUsers([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/user/searchuser?keyword=${keyword}`);
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('검색 실패:', error);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword]);

  return { users, isLoading };
}
