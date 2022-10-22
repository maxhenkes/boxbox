/*
  Warnings:

  - Made the column `name` on table `Diagram` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Diagram" ADD COLUMN     "idCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "name" SET NOT NULL;
