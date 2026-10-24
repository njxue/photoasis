/*
  Warnings:

  - You are about to drop the `_CollectionToPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CollectionToPhoto" DROP CONSTRAINT "_CollectionToPhoto_A_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToPhoto" DROP CONSTRAINT "_CollectionToPhoto_B_fkey";

-- DropTable
DROP TABLE "_CollectionToPhoto";

-- CreateTable
CREATE TABLE "CollectionPhotos" (
    "cid" INTEGER NOT NULL,
    "pid" INTEGER NOT NULL,

    CONSTRAINT "CollectionPhotos_pkey" PRIMARY KEY ("cid","pid")
);

-- AddForeignKey
ALTER TABLE "CollectionPhotos" ADD CONSTRAINT "CollectionPhotos_cid_fkey" FOREIGN KEY ("cid") REFERENCES "Collection"("cid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionPhotos" ADD CONSTRAINT "CollectionPhotos_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Photo"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;
