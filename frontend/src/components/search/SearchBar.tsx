type SearchBarProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Was suchst du?"
      value={value}
      onChange={onChange}
      className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-lg outline-none shadow-sm focus:border-slate-400"
    />
  );
}