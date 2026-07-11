import { SearchPage } from "@/components/search/SearchPage";
import { getBoxes } from "@/lib/db";

export default async function Home() {
  const databaseBoxes = await getBoxes();

  const boxes = databaseBoxes.map((box) => ({
    id: box.id,
    items: box.items.map((item) => item.name),
  }));

  return <SearchPage boxes={boxes} />;
}