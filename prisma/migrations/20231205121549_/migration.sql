/*
  Warnings:

  - The primary key for the `Photo` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_thumbnailPid_fkey";

-- AlterTable
ALTER TABLE "Collection" ALTER COLUMN "thumbnailPid" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_pkey",
ALTER COLUMN "pid" DROP DEFAULT,
ALTER COLUMN "pid" SET DATA TYPE TEXT,
ADD CONSTRAINT "Photo_pkey" PRIMARY KEY ("pid");
DROP SEQUENCE "Photo_pid_seq";

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_thumbnailPid_fkey" FOREIGN KEY ("thumbnailPid") REFERENCES "Photo"("pid") ON DELETE SET NULL ON UPDATE CASCADE;
