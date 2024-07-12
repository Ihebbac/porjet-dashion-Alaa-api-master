/*
  Warnings:

  - You are about to alter the column `detail` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "detail" SET DATA TYPE VARCHAR(500);
