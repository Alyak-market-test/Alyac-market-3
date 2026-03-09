import { useCallback, useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { getMyProfile, updateProfile } from '@/entities/user';

interface ProfileForm {
  accountname: string;
  image: string | null;
  name: string;
  bio: string;
}

interface UseProfileFormReturn {
  form: ProfileForm;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  setImage: (image: string | null) => void;
  setName: (name: string) => void;
  setBio: (bio: string) => void;
  save: () => Promise<void>;
}

export function useProfileForm(): UseProfileFormReturn {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<ProfileForm>({
    accountname: '',
    image: null,
    name: '',
    bio: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getMyProfile();
      setForm({
        accountname: data.user.accountname ?? '',
        image: data.user.image ?? null,
        name: data.user.username ?? '',
        bio: data.user.intro ?? '',
      });
    } catch {
      setError('프로필을 불러오는데 실패했어요.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const setImage = useCallback((image: string | null) => {
    setForm((prev) => ({ ...prev, image }));
  }, []);

  const setName = useCallback((name: string) => {
    setForm((prev) => ({ ...prev, name }));
  }, []);

  const setBio = useCallback((bio: string) => {
    setForm((prev) => ({ ...prev, bio }));
  }, []);

  const save = useCallback(async () => {
    setIsSaving(true);
    try {
      await updateProfile({
        username: form.name,
        accountname: form.accountname,
        intro: form.bio,
        image: form.image,
      });
      await queryClient.invalidateQueries({ queryKey: ['myProfile'] });
    } finally {
      setIsSaving(false);
    }
  }, [form, queryClient]);

  return { form, isLoading, isSaving, error, setImage, setName, setBio, save };
}
