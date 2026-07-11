import Link from "next/link";
import { notFound } from "next/navigation";
import { boxes } from "@/data/boxes";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BoxPage({ params }: Props) {
  const { id } = await params;

  const box = boxes.find(
    (box) => box.id.toLowerCase() === id.toLowerCase()
  );

  if (!box) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-6 py-12">

        <Link
          href="/"
          className="text-slate-500 transition hover:text-slate-900"
        >
          ← Zurück
        </Link>

        <h1 className="mt-8 text-6xl font-semibold tracking-tight">
          {box.id}
        </h1>

        <div className="mt-8 flex h-72 items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white shadow-sm">

          <div className="text-center">

            <div className="text-6xl">
              📷
            </div>

            <p className="mt-4 text-slate-500">
              Noch kein Foto vorhanden
            </p>

          </div>

        </div>

        <h2 className="mt-10 text-2xl font-semibold">
          Inhalt
        </h2>

        <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {box.items.map((item, index) => (
            <div
              key={item}
              className={`px-6 py-5 ${
                index !== 0 ? "border-t border-slate-100" : ""
              }`}
            >
              {item}
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}