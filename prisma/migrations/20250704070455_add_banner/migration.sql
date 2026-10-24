/*
  Warnings:

  - A unique constraint covering the columns `[bannerPid]` on the table `Album` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "bannerPid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Album_bannerPid_key" ON "Album"("bannerPid");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_bannerPid_fkey" FOREIGN KEY ("bannerPid") REFERENCES "Photo"("pid") ON DELETE SET NULL ON UPDATE CASCADE;
