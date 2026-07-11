import Link from "next/link";

type BoxCardProps = {
  id: string;
  shelf: string;
  items: string[];
};

export function BoxCard({ id, shelf, items }: BoxCardProps) {
  return (
    <Link
      href={`/boxes/${id}`}
      className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{id}</h2>

        <span className="text-sm text-slate-500">
          {shelf}
        </span>
      </div>

      <p className="mt-4 text-slate-600">
        {items[0]}
      </p>

      {items.length > 1 && (
        <p className="mt-2 text-sm text-slate-400">
          + {items.length - 1} weitere Artikel
        </p>
      )}
    </Link>
  );
}