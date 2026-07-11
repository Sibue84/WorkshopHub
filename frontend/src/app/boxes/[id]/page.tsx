import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

type BoxPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function addItem(formData: FormData) {
  "use server";

  const boxId = String(formData.get("boxId") ?? "")
    .trim()
    .toUpperCase();

  const name = String(formData.get("name") ?? "").trim();

  if (!boxId || !name) {
    return;
  }

  await prisma.item.create({
    data: {
      name,
      boxId,
    },
  });

  revalidatePath(`/boxes/${boxId}`);
  revalidatePath("/");
}

async function deleteItem(formData: FormData) {
  "use server";

  const itemId = Number(formData.get("itemId"));
  const boxId = String(formData.get("boxId") ?? "")
    .trim()
    .toUpperCase();

  if (!Number.isInteger(itemId) || !boxId) {
    return;
  }

  await prisma.item.deleteMany({
    where: {
      id: itemId,
      boxId,
    },
  });

  revalidatePath(`/boxes/${boxId}`);
  revalidatePath("/");
}

export default async function BoxPage({ params }: BoxPageProps) {
  const { id } = await params;
  const normalizedId = id.toUpperCase();

  const box = await prisma.box.findUnique({
    where: {
      id: normalizedId,
    },
    include: {
      area: true,
      items: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  if (!box) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
        <Link
          href="/"
          className="text-slate-500 transition hover:text-slate-900"
        >
          ← Zurück
        </Link>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Kiste
        </p>

        <h1 className="mt-2 text-6xl font-semibold tracking-tight text-slate-950">
          {box.id}
        </h1>

        <p className="mt-3 text-lg text-slate-500">
          {box.area.name} · Regal {box.shelf}
        </p>

        <div className="mt-8 flex h-72 items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white shadow-sm">
          <div className="text-center">
            <div className="text-5xl">📷</div>

            <p className="mt-4 text-slate-500">
              Noch kein Foto vorhanden
            </p>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-slate-950">
            Inhalt
          </h2>

          <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {box.items.length > 0 ? (
              box.items.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between gap-4 px-6 py-5 ${
                    index !== 0 ? "border-t border-slate-100" : ""
                  }`}
                >
                  <span className="min-w-0 flex-1 text-slate-800">
                    {item.name}
                  </span>

                  <form action={deleteItem}>
                    <input
                      type="hidden"
                      name="itemId"
                      value={item.id}
                    />

                    <input
                      type="hidden"
                      name="boxId"
                      value={box.id}
                    />

                    <button
                      type="submit"
                      aria-label={`${item.name} löschen`}
                      className="rounded-xl px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 hover:text-red-700"
                    >
                      Löschen
                    </button>
                  </form>
                </div>
              ))
            ) : (
              <p className="px-6 py-8 text-center text-slate-400">
                Diese Kiste ist noch leer.
              </p>
            )}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">
            Material hinzufügen
          </h2>

          <form
            action={addItem}
            className="mt-5 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="hidden"
              name="boxId"
              value={box.id}
            />

            <input
              type="text"
              name="name"
              required
              placeholder="Zum Beispiel: Kabelbinder grün"
              className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition focus:border-slate-400 focus:bg-white"
            />

            <button
              type="submit"
              className="rounded-2xl bg-slate-950 px-6 py-4 font-medium text-white transition hover:bg-slate-800"
            >
              Hinzufügen
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}