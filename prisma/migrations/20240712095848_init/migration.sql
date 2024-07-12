-- DropForeignKey
ALTER TABLE "proOptions" DROP CONSTRAINT "proOptions_product_id_fkey";

-- AddForeignKey
ALTER TABLE "proOptions" ADD CONSTRAINT "proOptions_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
