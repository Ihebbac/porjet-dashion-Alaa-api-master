/*
  Warnings:

  - The primary key for the `order_details` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `order_details` table. All the data in the column will be lost.
  - Added the required column `proOptionsId` to the `order_details` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_details" DROP CONSTRAINT "order_details_productId_fkey";

-- AlterTable
ALTER TABLE "order_details" DROP CONSTRAINT "order_details_pkey",
DROP COLUMN "productId",
ADD COLUMN     "proOptionsId" INTEGER NOT NULL,
ADD CONSTRAINT "order_details_pkey" PRIMARY KEY ("orderNumber", "proOptionsId");

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_proOptionsId_fkey" FOREIGN KEY ("proOptionsId") REFERENCES "proOptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
