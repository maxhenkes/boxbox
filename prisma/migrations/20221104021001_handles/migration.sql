/*
  Warnings:

  - You are about to drop the column `dataBottomHandles` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `dataTopHandles` on the `Node` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Node" DROP COLUMN "dataBottomHandles",
DROP COLUMN "dataTopHandles",
ADD COLUMN     "dataHandles" INTEGER;
