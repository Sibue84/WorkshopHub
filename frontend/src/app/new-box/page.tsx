import Link from "next/link";
import { NewBoxForm } from "@/components/boxes/NewBoxForm";
import { getAreas, getBoxes } from "@/lib/db";

export default async function NewBoxPage() {
  const [databaseAreas, databaseBoxes] = await Promise.all([
    getAreas(),
    getBoxes(),
  ]);

  const areas = databaseAreas.map((area) => ({
    id: area.id,
    code: area.code,
    name: area.name,
  }));

  const boxes = databaseBoxes.map((box) => ({
    areaId: box.areaId,
    shelf: box.shelf,
    number: box.number,
  }));

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <Link
          href="/"
          className="text-slate-500 transition hover:text-slate-900"
        >
          ← Zurück
        </Link>

        <h1 className="mt-8 text-4xl font-bold text-slate-900">
          Neue Kiste anlegen
        </h1>

        <p className="mt-3 text-slate-500">
          Wähle einen Bereich und ein Regal aus.
        </p>

        <NewBoxForm areas={areas} boxes={boxes} />
      </div>
    </main>
  );
}