-- CreateTable
CREATE TABLE "Photo" (
    "pid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "uid" INTEGER NOT NULL,
    "cid" INTEGER,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("pid")
);

-- CreateTable
CREATE TABLE "Collection" (
    "cid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "uid" INTEGER NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("cid")
);

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_cid_fkey" FOREIGN KEY ("cid") REFERENCES "Collection"("cid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
