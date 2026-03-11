interface PageStateScreenProps {
  message: string;
  variant?: 'loading' | 'error';
}

export function PageStateScreen({ message, variant = 'loading' }: PageStateScreenProps) {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <p className={`text-sm ${variant === 'error' ? 'text-red-500' : 'text-muted-foreground'}`}>
        {message}
      </p>
    </div>
  );
}
