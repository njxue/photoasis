/*
  Warnings:

  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Photo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CollectionToPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_uid_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_uid_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToPhoto" DROP CONSTRAINT "_CollectionToPhoto_A_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToPhoto" DROP CONSTRAINT "_CollectionToPhoto_B_fkey";

-- DropTable
DROP TABLE "Collection";

-- DropTable
DROP TABLE "Photo";

-- DropTable
DROP TABLE "_CollectionToPhoto";
