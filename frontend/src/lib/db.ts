import { prisma } from "@/lib/prisma";

export async function getBoxes() {
  return prisma.box.findMany({
    include: {
      items: true,
    },
    orderBy: {
      id: "asc",
    },
  });
}