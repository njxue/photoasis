/*
  Warnings:

  - You are about to alter the column `aperture` on the `Photo` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Photo" ALTER COLUMN "aperture" SET DATA TYPE DOUBLE PRECISION;
