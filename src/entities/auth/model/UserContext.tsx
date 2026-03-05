import { type ReactNode, createContext, useEffect, useState } from 'react';

import { getMyProfile } from '@/entities/profile';
import type { Profile } from '@/entities/profile';

import { getToken } from '../lib/Token';

interface UserContextType {
  user: Profile | null;
  setUser: (user: Profile | null) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    getMyProfile()
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>{children}</UserContext.Provider>
  );
}

export { UserContext };
