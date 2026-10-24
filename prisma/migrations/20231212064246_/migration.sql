/*
  Warnings:

  - You are about to drop the column `cid` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_thumbnailPid_fkey";

-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_uid_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_cid_uid_fkey";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "cid",
ADD COLUMN     "aid" INTEGER;

-- DropTable
DROP TABLE "Collection";

-- CreateTable
CREATE TABLE "Album" (
    "aid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "uid" INTEGER NOT NULL,
    "thumbnailPid" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("aid","uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Album_thumbnailPid_key" ON "Album"("thumbnailPid");

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_aid_uid_fkey" FOREIGN KEY ("aid", "uid") REFERENCES "Album"("aid", "uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_thumbnailPid_fkey" FOREIGN KEY ("thumbnailPid") REFERENCES "Photo"("pid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
