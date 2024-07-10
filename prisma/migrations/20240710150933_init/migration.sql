/*
  Warnings:

  - You are about to drop the column `discount_percent` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "discount_percent",
DROP COLUMN "price";
