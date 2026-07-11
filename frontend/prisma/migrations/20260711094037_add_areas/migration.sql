/*
  Warnings:

  - Added the required column `areaId` to the `Box` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Box` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shelf` to the `Box` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Area" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Box" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "areaId" INTEGER NOT NULL,
    "shelf" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "imagePath" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Box_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Box" ("createdAt", "id", "imagePath", "updatedAt") SELECT "createdAt", "id", "imagePath", "updatedAt" FROM "Box";
DROP TABLE "Box";
ALTER TABLE "new_Box" RENAME TO "Box";
CREATE INDEX "Box_areaId_idx" ON "Box"("areaId");
CREATE UNIQUE INDEX "Box_areaId_shelf_number_key" ON "Box"("areaId", "shelf", "number");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Area_code_key" ON "Area"("code");
