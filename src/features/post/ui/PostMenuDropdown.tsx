import { useState } from 'react';

import { DeleteConfirmModal } from '@/shared/ui';

interface PostMenuDropdownProps {
  isMyPost: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onReport?: () => void;
  onClose: () => void;
}

export function PostMenuDropdown({
  isMyPost,
  onEdit,
  onDelete,
  onReport,
  onClose,
}: PostMenuDropdownProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <div className="fixed inset-0 z-50" onClick={onClose}>
        <div className="bg-background absolute top-14 right-4 w-44 rounded-xl shadow-lg">
          {isMyPost ? (
            <>
              <button
                className="text-foreground hover:bg-muted w-full cursor-pointer rounded-t-xl border-b px-4 py-3 text-left text-sm transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.();
                }}
              >
                수정하기
              </button>
              <button
                className="hover:bg-muted w-full cursor-pointer rounded-b-xl px-4 py-3 text-left text-sm text-red-500 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteModal(true);
                }}
              >
                삭제하기
              </button>
            </>
          ) : (
            <button
              className="text-foreground hover:bg-muted w-full cursor-pointer rounded-xl px-4 py-3 text-left text-sm transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onReport?.();
                onClose();
              }}
            >
              신고하기
            </button>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <DeleteConfirmModal
          message="게시글을 삭제할까요?"
          onConfirm={() => {
            onDelete?.();
            setShowDeleteModal(false);
          }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}
