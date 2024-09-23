/*
  Warnings:

  - A unique constraint covering the columns `[linkedinUrl]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[twitterUrl]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "linkedinUrl" TEXT,
ADD COLUMN     "twitterUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_linkedinUrl_key" ON "User"("linkedinUrl");

-- CreateIndex
CREATE UNIQUE INDEX "User_twitterUrl_key" ON "User"("twitterUrl");
