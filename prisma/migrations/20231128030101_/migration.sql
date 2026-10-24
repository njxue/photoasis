-- CreateTable
CREATE TABLE "Photo" (
    "pid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "uid" INTEGER NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("pid")
);

-- CreateTable
CREATE TABLE "Collection" (
    "cid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "uid" INTEGER NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("cid")
);

-- CreateTable
CREATE TABLE "_CollectionToPhoto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionToPhoto_AB_unique" ON "_CollectionToPhoto"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionToPhoto_B_index" ON "_CollectionToPhoto"("B");

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToPhoto" ADD CONSTRAINT "_CollectionToPhoto_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection"("cid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToPhoto" ADD CONSTRAINT "_CollectionToPhoto_B_fkey" FOREIGN KEY ("B") REFERENCES "Photo"("pid") ON DELETE CASCADE ON UPDATE CASCADE;
