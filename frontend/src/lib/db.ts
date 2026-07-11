import { prisma } from "@/lib/prisma";

export async function getBoxes() {
  return prisma.box.findMany({
    include: {
      area: true,
      items: {
        orderBy: {
          name: "asc",
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });
}