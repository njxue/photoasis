-- CreateTable
CREATE TABLE "PhotoSpecs" (
    "pid" INTEGER NOT NULL,
    "aperture" DECIMAL(65,30),
    "shutterspeed" TEXT,
    "iso" INTEGER,

    CONSTRAINT "PhotoSpecs_pkey" PRIMARY KEY ("pid")
);

-- AddForeignKey
ALTER TABLE "PhotoSpecs" ADD CONSTRAINT "PhotoSpecs_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Photo"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;
