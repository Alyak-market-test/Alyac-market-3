import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { getToken } from '@/entities/auth/lib/token';

import { uploadImages } from './uploadImages';

export function usePostAdd() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    if (!content.trim() && imageFiles.length === 0) return;

    setIsLoading(true);
    try {
      let imageString = '';
      if (imageFiles.length > 0) {
        const filenames = await uploadImages(imageFiles);
        imageString = filenames.join(',');
      }

      const res = await fetch('http://localhost:3000/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          post: {
            content,
            image: imageString,
          },
        }),
      });

      if (!res.ok) throw new Error('게시물 작성 실패');

      navigate(-1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    content,
    setContent,
    previews,
    isLoading,
    handleImageChange,
    handleRemoveImage,
    handleSubmit,
  };
}
