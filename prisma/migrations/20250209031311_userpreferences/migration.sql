/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `UserPreferences` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_uid_key" ON "UserPreferences"("uid");
