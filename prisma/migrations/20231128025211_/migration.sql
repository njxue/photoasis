/*
  Warnings:

  - You are about to drop the column `cid` on the `Photo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_cid_fkey";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "cid";

-- CreateTable
CREATE TABLE "_CollectionToPhoto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionToPhoto_AB_unique" ON "_CollectionToPhoto"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionToPhoto_B_index" ON "_CollectionToPhoto"("B");

-- AddForeignKey
ALTER TABLE "_CollectionToPhoto" ADD CONSTRAINT "_CollectionToPhoto_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection"("cid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToPhoto" ADD CONSTRAINT "_CollectionToPhoto_B_fkey" FOREIGN KEY ("B") REFERENCES "Photo"("pid") ON DELETE CASCADE ON UPDATE CASCADE;
