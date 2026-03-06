import { Button } from './Button';

interface DeleteConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isPending?: boolean;
}

export function DeleteConfirmModal({ onConfirm, onCancel, isPending }: DeleteConfirmModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onCancel}
    >
      <div className="bg-background w-64 rounded-xl shadow-xl" onClick={(e) => e.stopPropagation()}>
        <p className="text-foreground px-6 py-6 text-center text-base font-medium">
          상품을 삭제할까요?
        </p>
        <div className="border-border flex border-t">
          <Button onClick={onCancel} disabled={isPending} variant={'deleteNO'} size="none">
            취소
          </Button>
          <div className="border-border border-l" />
          <Button onClick={onConfirm} disabled={isPending} variant={'deltetYES'} size="none">
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
