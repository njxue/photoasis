/*
  Warnings:

  - You are about to drop the `PhotoSpecs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PhotoSpecs" DROP CONSTRAINT "PhotoSpecs_pid_fkey";

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "aperture" DECIMAL(65,30),
ADD COLUMN     "iso" INTEGER,
ADD COLUMN     "shutterspeed" TEXT;

-- DropTable
DROP TABLE "PhotoSpecs";
