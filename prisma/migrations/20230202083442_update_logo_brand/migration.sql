/*
  Warnings:

  - Added the required column `logoUrl` to the `vehicleBrand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicleBrand" ADD COLUMN     "logoUrl" TEXT NOT NULL;
