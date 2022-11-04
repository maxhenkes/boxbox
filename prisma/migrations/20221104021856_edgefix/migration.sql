/*
  Warnings:

  - You are about to drop the column `internalId` on the `Edge` table. All the data in the column will be lost.
  - Added the required column `interalId` to the `Edge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceHandle` to the `Edge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetHandle` to the `Edge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Edge" DROP COLUMN "internalId",
ADD COLUMN     "interalId" TEXT NOT NULL,
ADD COLUMN     "sourceHandle" TEXT NOT NULL,
ADD COLUMN     "targetHandle" TEXT NOT NULL;
