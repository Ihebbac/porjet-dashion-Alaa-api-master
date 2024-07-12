/*
  Warnings:

  - You are about to alter the column `color` on the `proOptions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(9999)` to `VarChar(255)`.
  - You are about to alter the column `size` on the `proOptions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(9999)` to `VarChar(255)`.
  - You are about to alter the column `images` on the `proOptions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(9999)` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "proOptions" ALTER COLUMN "color" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "size" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "images" SET DATA TYPE VARCHAR(255);
