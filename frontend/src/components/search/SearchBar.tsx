import type { ChangeEvent } from "react";

type SearchBarProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="mb-10">
      <div className="relative">
        <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-2xl">
          🔍
        </span>

        <input
          type="text"
          placeholder="Material suchen..."
          value={value}
          onChange={onChange}
          className="w-full rounded-3xl border border-slate-200 bg-white py-5 pl-16 pr-6 text-xl shadow-sm outline-none transition focus:border-slate-400 focus:shadow-lg"
        />
      </div>
    </div>
  );
}