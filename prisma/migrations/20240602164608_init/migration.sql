/*
  Warnings:

  - You are about to alter the column `price` on the `Car` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

*/
-- CreateTable
CREATE TABLE "Currency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "location" TEXT,
    "price" REAL,
    "currencyId" TEXT,
    "color" TEXT,
    "year" INTEGER,
    "modelId" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "condition" TEXT,
    CONSTRAINT "Car_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Car_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "CarModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Car_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Car" ("brandId", "condition", "createdAt", "description", "id", "location", "modelId", "price", "updatedAt", "year") SELECT "brandId", "condition", "createdAt", "description", "id", "location", "modelId", "price", "updatedAt", "year" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
PRAGMA foreign_key_check("Car");
PRAGMA foreign_keys=ON;
