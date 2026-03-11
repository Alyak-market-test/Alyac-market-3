import { toast } from 'sonner';

type DeleteType = 'post' | 'product';

export function useDeleteToast() {
  const showDeleteToast = (type: DeleteType) => {
    const config: Record<DeleteType, string> = {
      post: '게시글이 삭제되었습니다',
      product: '판매 상품이 삭제되었습니다',
    };

    toast.success(config[type]);
  };

  return { showDeleteToast };
}
