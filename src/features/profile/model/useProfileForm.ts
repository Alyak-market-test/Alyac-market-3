import { useState } from 'react';

import { useMyProfile, useUpdateProfile } from '@/entities/user';

interface ProfileOverrides {
  image?: string | null;
  name?: string;
  bio?: string;
}

interface UseProfileFormReturn {
  form: {
    accountname: string;
    image: string | null;
    name: string;
    bio: string;
  };
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  setImage: (image: string | null) => void;
  setName: (name: string) => void;
  setBio: (bio: string) => void;
  save: () => Promise<void>;
}

export function useProfileForm(): UseProfileFormReturn {
  const { data, isLoading, isError } = useMyProfile();
  const { mutateAsync, isPending: isSaving } = useUpdateProfile();
  const [overrides, setOverrides] = useState<ProfileOverrides>({});

  const form = {
    accountname: data?.accountname ?? '',
    image: overrides.image !== undefined ? overrides.image : (data?.image ?? null),
    name: overrides.name !== undefined ? overrides.name : (data?.username ?? ''),
    bio: overrides.bio !== undefined ? overrides.bio : (data?.intro ?? ''),
  };

  const setImage = (image: string | null) => setOverrides((prev) => ({ ...prev, image }));

  const setName = (name: string) => setOverrides((prev) => ({ ...prev, name }));

  const setBio = (bio: string) => setOverrides((prev) => ({ ...prev, bio }));

  const save = async () => {
    await mutateAsync({
      username: form.name,
      accountname: form.accountname,
      intro: form.bio,
      image: form.image,
    });
  };

  return {
    form,
    isLoading,
    isSaving,
    error: isError ? '프로필을 불러오는데 실패했어요.' : null,
    setImage,
    setName,
    setBio,
    save,
  };
}
