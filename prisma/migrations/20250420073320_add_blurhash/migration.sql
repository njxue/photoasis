-- DropIndex
DROP INDEX "UserPreferences_uid_key";

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "blurhash" TEXT;
