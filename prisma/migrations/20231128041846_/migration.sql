/*
  Warnings:

  - You are about to drop the `CollectionPhotos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CollectionPhotos" DROP CONSTRAINT "CollectionPhotos_cid_fkey";

-- DropForeignKey
ALTER TABLE "CollectionPhotos" DROP CONSTRAINT "CollectionPhotos_pid_fkey";

-- DropTable
DROP TABLE "CollectionPhotos";

-- CreateTable
CREATE TABLE "collectionphotos" (
    "cid" INTEGER NOT NULL,
    "pid" INTEGER NOT NULL,

    CONSTRAINT "collectionphotos_pkey" PRIMARY KEY ("cid","pid")
);

-- AddForeignKey
ALTER TABLE "collectionphotos" ADD CONSTRAINT "collectionphotos_cid_fkey" FOREIGN KEY ("cid") REFERENCES "Collection"("cid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collectionphotos" ADD CONSTRAINT "collectionphotos_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Photo"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;
