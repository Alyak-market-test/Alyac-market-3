import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { api } from '@/shared/api/instance';

import { uploadImages } from './UploadImages';

export function usePostAdd() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (imageFiles.length + files.length > 3) {
      alert('이미지는 최대 3장까지 업로드 가능합니다.');
      return;
    }
    setImageFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!content.trim() && imageFiles.length === 0) {
      setError('게시글 내용을 입력해주세요.');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      let imageString = '';
      if (imageFiles.length > 0) {
        const filenames = await uploadImages(imageFiles);
        imageString = filenames.join(',');
      }

      const response = await api.post('/post', {
        post: {
          content,
          image: imageString,
        },
      });

      const postId = response.data.post.id;
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error(error);
      setError('게시물 작성에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    content,
    setContent,
    previews,
    isLoading,
    error,
    setError,
    handleImageChange,
    handleRemoveImage,
    handleSubmit,
  };
}
