/*
  Warnings:

  - You are about to drop the column `image_1` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `image_2` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "image_1",
DROP COLUMN "image_2",
DROP COLUMN "stock",
ADD COLUMN     "proOptions_id" INTEGER;

-- CreateTable
CREATE TABLE "proOptions" (
    "id" SERIAL NOT NULL,
    "color" VARCHAR(50) NOT NULL,
    "price" DECIMAL(7,2) NOT NULL,
    "size" VARCHAR(100) NOT NULL,
    "stock" INTEGER DEFAULT 0,
    "images" VARCHAR(900) NOT NULL,
    "product_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "proOptions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_proOptions_id_fkey" FOREIGN KEY ("proOptions_id") REFERENCES "proOptions"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
