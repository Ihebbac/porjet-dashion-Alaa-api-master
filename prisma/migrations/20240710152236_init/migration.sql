/*
  Warnings:

  - You are about to drop the column `proOptions_id` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_proOptions_id_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "proOptions_id";

-- AddForeignKey
ALTER TABLE "proOptions" ADD CONSTRAINT "proOptions_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
