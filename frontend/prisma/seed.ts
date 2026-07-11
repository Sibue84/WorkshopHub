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
  await prisma.area.deleteMany();

  const garage = await prisma.area.create({
    data: {
      code: "G",
      name: "Garage",
    },
  });

  const keller = await prisma.area.create({
    data: {
      code: "K",
      name: "Keller",
    },
  });

  await prisma.area.create({
    data: {
      code: "W",
      name: "Waschküche",
    },
  });

  await prisma.area.create({
    data: {
      code: "A",
      name: "Abstellraum",
    },
  });

  await prisma.area.create({
    data: {
      code: "H",
      name: "Hobbyraum",
    },
  });

  await prisma.area.create({
    data: {
      code: "GH",
      name: "Gartenhaus",
    },
  });

  await prisma.box.create({
    data: {
      id: "G-A01",
      areaId: garage.id,
      shelf: "A",
      number: 1,
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
      id: "K-A01",
      areaId: keller.id,
      shelf: "A",
      number: 1,
      items: {
        create: [
          { name: "M5 Senkkopfschrauben" },
          { name: "M5 Unterlagsscheiben" },
          { name: "M5 Muttern" },
        ],
      },
    },
  });

  console.log("Bereiche und Testkisten wurden erfolgreich eingefügt.");
}

main()
  .catch((error) => {
    console.error("Fehler beim Einfügen der Testdaten:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });