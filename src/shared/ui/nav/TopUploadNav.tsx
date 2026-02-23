import { Button } from '@/shared/ui/button';
import { ArrowLeftIcon } from '@/shared/ui/icons/ArrowLeftIcon';

interface TopUploadNavProps {
  onBack: () => void;
  onSave: () => void;
  disabled?: boolean;
}

export function TopUploadNav({ onBack, onSave, disabled = false }: TopUploadNavProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-4">
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
