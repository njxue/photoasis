/*
  Warnings:

  - You are about to drop the `_CollectionToPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CollectionToPhoto" DROP CONSTRAINT "_CollectionToPhoto_A_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToPhoto" DROP CONSTRAINT "_CollectionToPhoto_B_fkey";

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "collectionCid" INTEGER;

-- DropTable
DROP TABLE "_CollectionToPhoto";

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_collectionCid_fkey" FOREIGN KEY ("collectionCid") REFERENCES "Collection"("cid") ON DELETE SET NULL ON UPDATE CASCADE;
