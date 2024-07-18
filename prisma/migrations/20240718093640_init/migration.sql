/*
  Warnings:

  - The primary key for the `order_details` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `prooptionsId` on the `order_details` table. All the data in the column will be lost.
  - Added the required column `prooptionsId` to the `order_details` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_details" DROP CONSTRAINT "order_details_proOptionsId_fkey";

-- AlterTable
ALTER TABLE "order_details" DROP CONSTRAINT "order_details_pkey",
DROP COLUMN "prooptionsId",
ADD COLUMN     "prooptionsId" INTEGER NOT NULL,
ADD CONSTRAINT "order_details_pkey" PRIMARY KEY ("orderNumber", "prooptionsId");

-- AlterTable
ALTER TABLE "prooptions" RENAME CONSTRAINT "proOptions_pkey" TO "prooptions_pkey";

-- RenameForeignKey
ALTER TABLE "prooptions" RENAME CONSTRAINT "proOptions_product_id_fkey" TO "prooptions_product_id_fkey";

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_prooptionsId_fkey" FOREIGN KEY ("prooptionsId") REFERENCES "prooptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
