interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

export function TextInput({ label, value, onChange, placeholder, type = 'text' }: TextInputProps) {
  return (
    <div className="flex w-full flex-col gap-1">
      <label className="text-muted-foreground text-xs">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border-border text-foreground placeholder:text-muted-foreground w-full border-b pb-2 text-sm outline-none focus:border-[#11CC27]"
      />
    </div>
  );
}
