import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.item.deleteMany();
  await prisma.box.deleteMany();

  await prisma.box.create({
    data: {
      id: "A01",
      items: {
        create: [
          { name: "Kabelbinder weiss" },
          { name: "Kabelbinder schwarz" },
          { name: "Kabelbinder rot" },
        ],
      },
    },
  });

  await prisma.box.create({
    data: {
      id: "B03",
      items: {
        create: [
          { name: "Ponal Holzleim" },
          { name: "Sekundenkleber" },
        ],
      },
    },
  });

  await prisma.box.create({
    data: {
      id: "E05",
      items: {
        create: [
          { name: "M5 Senkkopfschrauben" },
          { name: "M5 Unterlagsscheiben" },
          { name: "M5 Muttern" },
        ],
      },
    },
  });

  console.log("Testdaten wurden erfolgreich eingefügt.");
}

main()
  .catch((error) => {
    console.error("Fehler beim Einfügen der Testdaten:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });