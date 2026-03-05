import { ArrowLeftIcon } from '@/shared/icons/ArrowLeftIcon';
import { Button } from '@/shared/ui/Button';

interface TopUploadNavProps {
  onBack: () => void;
  onSave: () => void;
  disabled?: boolean;
}

export function TopUploadNav({ onBack, onSave, disabled = false }: TopUploadNavProps) {
  return (
    <header className="bg-background flex h-14 items-center justify-between border-b px-4">
      <button onClick={onBack}>
        <ArrowLeftIcon />
      </button>

      <Button
        variant={disabled ? 'primaryDisabled' : 'primary'}
        size="Ms"
        onClick={onSave}
        disabled={disabled}
      >
        저장
      </Button>
    </header>
  );
}
