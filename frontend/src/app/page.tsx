"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { SearchBar } from "@/components/search/SearchBar";
import { BoxCard } from "@/components/boxes/BoxCard";
import { boxes } from "@/data/boxes";

export default function Home() {
  const [search, setSearch] = useState("");
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-8 py-16">

        <Header />

        <SearchBar
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

        <div className="mt-10 space-y-4">
         {boxes
  .filter((box) => {
    const text =
      box.id +
      " " +
      box.shelf +
      " " +
      box.items.join(" ");

    return text.toLowerCase().includes(search.toLowerCase());
  })
  .map((box) => (
            <BoxCard
              key={box.id}
              id={box.id}
              shelf={box.shelf}
              items={box.items}
            />
          ))}
        </div>

      </div>
    </main>
  );
}