/*
  Warnings:

  - You are about to alter the column `stock` on the `proOptions` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(7,2)`.

*/
-- AlterTable
ALTER TABLE "proOptions" ALTER COLUMN "stock" DROP DEFAULT,
ALTER COLUMN "stock" SET DATA TYPE DECIMAL(7,2);
