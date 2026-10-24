/*
  Warnings:

  - You are about to drop the `collectionphotos` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[thumbnailPid]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "collectionphotos" DROP CONSTRAINT "collectionphotos_cid_fkey";

-- DropForeignKey
ALTER TABLE "collectionphotos" DROP CONSTRAINT "collectionphotos_pid_fkey";

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "thumbnailPid" INTEGER;

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "cid" INTEGER;

-- DropTable
DROP TABLE "collectionphotos";

-- CreateIndex
CREATE UNIQUE INDEX "Collection_thumbnailPid_key" ON "Collection"("thumbnailPid");

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_cid_fkey" FOREIGN KEY ("cid") REFERENCES "Collection"("cid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_thumbnailPid_fkey" FOREIGN KEY ("thumbnailPid") REFERENCES "Photo"("pid") ON DELETE SET NULL ON UPDATE CASCADE;
