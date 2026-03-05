import type { InputHTMLAttributes } from 'react';

import { Input } from '@/shared/ui/Input';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  htmlType?: string;
}

export function FormField({ label, error, htmlType = 'text', ...props }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-muted-foreground text-sm">{label}</label>
      <Input
        type={htmlType}
        className="rounded-none border-0 border-b shadow-none focus-visible:border-green-500 focus-visible:ring-0"
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
