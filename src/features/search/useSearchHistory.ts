import { useState } from 'react';

const HISTORY_KEY = 'searchHistory';
const MAX_HISTORY = 10;

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const addHistory = (keyword: string) => {
    if (!keyword.trim()) return;
    const filtered = history.filter((h) => h !== keyword); // 중복 제거
    const updated = [keyword, ...filtered].slice(0, MAX_HISTORY); // 최대 10개
    setHistory(updated);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  };

  const removeHistory = (keyword: string) => {
    const updated = history.filter((h) => h !== keyword);
    setHistory(updated);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  };

  return { history, addHistory, removeHistory };
}
