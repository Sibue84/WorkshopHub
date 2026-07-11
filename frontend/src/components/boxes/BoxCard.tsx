import Link from "next/link";
import type { ReactNode } from "react";

type BoxCardProps = {
  id: string;
  shelf: string;
  items: string[];
  query: string;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(text: string, searchTerms: string[]): ReactNode {
  if (searchTerms.length === 0) {
    return text;
  }

  const pattern = new RegExp(
    `(${searchTerms.map(escapeRegExp).join("|")})`,
    "gi"
  );

  return text.split(pattern).map((part, index) => {
    const isMatch = searchTerms.some(
      (term) => part.toLowerCase() === term.toLowerCase()
    );

    if (!isMatch) {
      return part;
    }

    return (
      <mark
        key={`${part}-${index}`}
        className="rounded-md bg-amber-100 px-1 text-inherit"
      >
        {part}
      </mark>
    );
  });
}

export function BoxCard({
  id,
  items,
  query,
}: BoxCardProps) {
  const searchTerms = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  const matchingItems =
    searchTerms.length === 0
      ? items.slice(0, 1)
      : items.filter((item) => {
          const normalizedItem = item.toLowerCase();

          return searchTerms.every((term) =>
            normalizedItem.includes(term)
          );
        });

  const visibleItems =
    matchingItems.length > 0 ? matchingItems : items.slice(0, 1);

  return (
    <Link
      href={`/boxes/${id}`}
      className="group block rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="grid grid-cols-[1fr_96px] gap-5">
        <div className="min-w-0">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
            Kiste
          </p>

          <h2 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
            {id}
          </h2>

          <div className="mt-5 space-y-2">
            {visibleItems.slice(0, 3).map((item) => (
              <p
                key={item}
                className="truncate text-base leading-6 text-slate-700"
              >
                {highlightText(item, searchTerms)}
              </p>
            ))}
          </div>

          {visibleItems.length > 3 && (
            <p className="mt-3 text-sm text-slate-400">
              + {visibleItems.length - 3} weitere Treffer
            </p>
          )}
        </div>

        <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-center text-xs font-medium text-slate-400">
          Kein Foto
        </div>
      </div>
    </Link>
  );
}