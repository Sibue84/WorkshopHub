import { prisma } from "@/lib/prisma";

export async function getBoxes() {
  return prisma.box.findMany({
    include: {
      area: true,
      items: true,
    },
    orderBy: [
      {
        area: {
          code: "asc",
        },
      },
      {
        shelf: "asc",
      },
      {
        number: "asc",
      },
    ],
  });
}

export async function getAreas() {
  return prisma.area.findMany({
    orderBy: {
      name: "asc",
    },
  });
}