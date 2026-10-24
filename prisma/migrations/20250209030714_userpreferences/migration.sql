-- CreateTable
CREATE TABLE "UserPreferences" (
    "uid" INTEGER NOT NULL,
    "objectFit" TEXT NOT NULL DEFAULT 'object-contain',

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("uid")
);

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
