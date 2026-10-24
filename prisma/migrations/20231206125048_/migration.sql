/*
  Warnings:

  - The primary key for the `Collection` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_cid_fkey";

-- AlterTable
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_pkey",
ADD CONSTRAINT "Collection_pkey" PRIMARY KEY ("cid", "uid");

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_cid_uid_fkey" FOREIGN KEY ("cid", "uid") REFERENCES "Collection"("cid", "uid") ON DELETE RESTRICT ON UPDATE CASCADE;
