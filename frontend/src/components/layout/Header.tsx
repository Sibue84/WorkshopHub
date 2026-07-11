import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="mb-10">
      <div className="flex items-center justify-between">
        <button
          className="rounded-xl p-2 transition hover:bg-slate-100"
          aria-label="Menü öffnen"
        >
          <Menu size={28} />
        </button>

        <div className="flex-1 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
            Deine Werkstatt
          </p>

          <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-6xl">
            WorkshopHub
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-lg leading-7 text-slate-500">
            Finde jedes Material schnell und direkt in der richtigen Kiste.
          </p>
        </div>

        <div className="w-11" />
      </div>
    </header>
  );
}