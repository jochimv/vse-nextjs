/*
  Warnings:

  - You are about to drop the column `color` on the `Car` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "location" TEXT,
    "price" TEXT,
    "year" INTEGER,
    "modelId" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "condition" TEXT,
    CONSTRAINT "Car_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "CarModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Car_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Car" ("brandId", "createdAt", "description", "id", "location", "modelId", "price", "updatedAt", "year") SELECT "brandId", "createdAt", "description", "id", "location", "modelId", "price", "updatedAt", "year" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
PRAGMA foreign_key_check("Car");
PRAGMA foreign_keys=ON;
