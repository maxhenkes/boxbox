/*
  Warnings:

  - You are about to drop the column `onBoot` on the `Data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Data" DROP COLUMN "onBoot",
ADD COLUMN     "onboot" BOOLEAN;
