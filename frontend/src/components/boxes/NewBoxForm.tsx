"use client";

import { useMemo, useState } from "react";

type Area = {
  id: number;
  code: string;
  name: string;
};

type ExistingBox = {
  areaId: number;
  shelf: string;
  number: number;
};

type NewBoxFormProps = {
  areas: Area[];
  boxes: ExistingBox[];
};

const shelves = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function NewBoxForm({ areas, boxes }: NewBoxFormProps) {
  const [areaId, setAreaId] = useState<number>(areas[0]?.id ?? 0);
  const [shelf, setShelf] = useState("A");

  const selectedArea = useMemo(
    () => areas.find((area) => area.id === areaId),
    [areas, areaId]
  );

  const nextNumber = useMemo(() => {
    const matchingBoxes = boxes.filter(
      (box) => box.areaId === areaId && box.shelf === shelf
    );

    if (matchingBoxes.length === 0) {
      return 1;
    }

    return Math.max(...matchingBoxes.map((box) => box.number)) + 1;
  }, [boxes, areaId, shelf]);

  const nextBoxId = selectedArea
    ? `${selectedArea.code}-${shelf}${String(nextNumber).padStart(2, "0")}`
    : "—";

  return (
    <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="area"
            className="mb-2 block font-medium text-slate-900"
          >
            Bereich
          </label>

          <select
            id="area"
            value={areaId}
            onChange={(e) => setAreaId(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white p-3"
          >
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="shelf"
            className="mb-2 block font-medium text-slate-900"
          >
            Regal
          </label>

          <select
            id="shelf"
            value={shelf}
            onChange={(e) => setShelf(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white p-3"
          >
            {shelves.map((letter) => (
              <option key={letter} value={letter}>
                Regal {letter}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-2xl bg-slate-100 p-5">
          <p className="text-sm text-slate-500">
            Neue Kiste
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-950">
            {nextBoxId}
          </p>
        </div>

        <button
          type="button"
          className="w-full rounded-2xl bg-slate-950 py-4 font-medium text-white"
        >
          Kiste anlegen
        </button>
      </div>
    </div>
  );
}