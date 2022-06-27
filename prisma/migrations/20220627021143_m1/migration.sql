-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "redirectUrl" TEXT NOT NULL,
    "customEnding" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_customEnding_key" ON "Link"("customEnding");
