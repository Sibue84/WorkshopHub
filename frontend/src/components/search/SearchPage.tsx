"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { SearchBar } from "@/components/search/SearchBar";
import { BoxCard } from "@/components/boxes/BoxCard";

type BoxData = {
  id: string;
  items: string[];
};

type SearchPageProps = {
  boxes: BoxData[];
};

export function SearchPage({ boxes }: SearchPageProps) {
  const [search, setSearch] = useState("");

  const searchTerms = search
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  const filteredBoxes = boxes.filter((box) => {
    const searchableText = [box.id, ...box.items]
      .join(" ")
      .toLowerCase();

    return searchTerms.every((term) =>
      searchableText.includes(term)
    );
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
        <Header />

        <SearchBar
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="mt-10 space-y-4">
          {filteredBoxes.length > 0 ? (
            filteredBoxes.map((box) => (
              <BoxCard
                key={box.id}
                id={box.id}
                shelf={`Regal ${box.id.charAt(0)}`}
                items={box.items}
                query={search}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
              <p className="text-lg font-medium text-slate-700">
                Kein Material gefunden
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Versuche einen anderen Suchbegriff.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}