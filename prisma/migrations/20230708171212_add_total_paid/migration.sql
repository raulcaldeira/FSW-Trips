/*
  Warnings:

  - You are about to drop the column `totalPage` on the `TripReservation` table. All the data in the column will be lost.
  - Added the required column `totalPaid` to the `TripReservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TripReservation" DROP COLUMN "totalPage",
ADD COLUMN     "totalPaid" DECIMAL(8,2) NOT NULL;
