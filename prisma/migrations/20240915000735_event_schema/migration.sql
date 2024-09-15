/*
  Warnings:

  - Added the required column `UTCOFFset` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPaid` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isVirtual` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicStatus` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requireApproval` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "UTCOFFset" TEXT NOT NULL,
ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "isPaid" BOOLEAN NOT NULL,
ADD COLUMN     "isVirtual" BOOLEAN NOT NULL,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "publicStatus" BOOLEAN NOT NULL,
ADD COLUMN     "requireApproval" BOOLEAN NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ticketPrice" INTEGER,
ADD COLUMN     "zoomAddress" TEXT;

-- CreateTable
CREATE TABLE "UserEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "UserEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserEvent" ADD CONSTRAINT "UserEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEvent" ADD CONSTRAINT "UserEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
