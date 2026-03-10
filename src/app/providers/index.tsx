import { QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/shared/lib/theme';

import { queryClient } from '../queryClient';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
