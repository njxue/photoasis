/*
  Warnings:

  - A unique constraint covering the columns `[uid,cid,name]` on the table `Photo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Photo_uid_cid_name_key" ON "Photo"("uid", "cid", "name");
