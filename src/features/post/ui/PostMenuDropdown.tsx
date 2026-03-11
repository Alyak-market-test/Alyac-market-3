import { useState } from 'react';

import { DeleteConfirmModal } from '@/shared/ui';

interface PostMenuDropdownProps {
  onReport: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export function PostMenuDropdown({ onReport, onDelete, onClose }: PostMenuDropdownProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <>
      <div className="fixed inset-0 z-50" onClick={onClose}>
        <div className="bg-background absolute top-14 right-4 w-44 rounded-xl shadow-lg">
          <button
            className="text-foreground hover:bg-muted w-full cursor-pointer rounded-t-xl border-b px-4 py-3 text-left text-sm transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setShowReportModal(true);
            }}
          >
            신고하기
          </button>
          <button
            className="hover:bg-muted w-full cursor-pointer rounded-b-xl px-4 py-3 text-left text-sm transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteModal(true);
            }}
          >
            삭제
          </button>
        </div>
      </div>

      {showReportModal && (
        <DeleteConfirmModal
          message="신고하시겠습니까?"
          onConfirm={() => {
            onReport();
            setShowReportModal(false);
          }}
          onCancel={() => setShowReportModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          message="게시글을 삭제할까요?"
          onConfirm={() => {
            onDelete();
            setShowDeleteModal(false);
          }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}
