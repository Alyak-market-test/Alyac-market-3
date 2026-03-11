import { type ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';

import { TopUploadNav } from '@/shared';

interface ProductFormLayoutProps {
  onSave: () => void;
  disabled: boolean;
  children: ReactNode;
}

export function ProductFormLayout({ onSave, disabled, children }: ProductFormLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-background my-15 flex min-h-screen flex-col">
      <TopUploadNav onBack={() => navigate(-1)} onSave={onSave} disabled={disabled} />
      <div className="flex flex-col gap-10 px-7">{children}</div>
    </div>
  );
}
