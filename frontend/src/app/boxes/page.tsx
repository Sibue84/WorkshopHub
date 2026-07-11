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

  const box = boxes.find((b) => b.id === id);

  if (!box) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-8 py-16">

        <Link
          href="/"
          className="text-slate-500 hover:text-slate-900"
        >
          ← Zurück
        </Link>

        <h1 className="mt-6 text-5xl font-bold">
          {box.id}
        </h1>

        <p className="mt-2 text-lg text-slate-500">
          {box.shelf}
        </p>

        <div className="mt-10 rounded-2xl border-2 border-dashed border-slate-300 bg-white p-12 text-center text-slate-400">
          📷 Hier kommt später das Foto der Kiste
        </div>

        <h2 className="mt-10 text-2xl font-semibold">
          Inhalt
        </h2>

        <div className="mt-4 space-y-3">
          {box.items.map((item) => (
            <div
              key={item}
              className="rounded-xl bg-white p-4 shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}