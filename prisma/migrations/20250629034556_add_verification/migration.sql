-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN,
ADD COLUMN     "verificationToken" TEXT;
