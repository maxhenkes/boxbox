/*
  Warnings:

  - You are about to drop the column `interalId` on the `Edge` table. All the data in the column will be lost.
  - Added the required column `internalId` to the `Edge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Edge" DROP COLUMN "interalId",
ADD COLUMN     "internalId" TEXT NOT NULL;
