export default function NewBoxPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-2xl px-6 py-12">

        <h1 className="text-4xl font-bold text-slate-900">
          Neue Kiste anlegen
        </h1>

        <p className="mt-3 text-slate-500">
          Erstelle eine neue leere Kiste.
        </p>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="space-y-6">

            <div>
              <label className="mb-2 block font-medium">
                Bereich
              </label>

              <select className="w-full rounded-xl border border-slate-300 p-3">
                <option>Garage</option>
                <option>Keller</option>
                <option>Waschküche</option>
                <option>Abstellraum</option>
                <option>Hobbyraum</option>
                <option>Gartenhaus</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Regal
              </label>

              <select className="w-full rounded-xl border border-slate-300 p-3">
                {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => (
                  <option key={letter}>{letter}</option>
                ))}
              </select>
            </div>

            <div className="rounded-2xl bg-slate-100 p-5">

              <p className="text-sm text-slate-500">
                Neue Kiste
              </p>

              <p className="mt-2 text-3xl font-bold">
                G-A01
              </p>

            </div>

            <button className="w-full rounded-2xl bg-slate-950 py-4 text-white">
              Kiste anlegen
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}