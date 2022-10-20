/*
  Warnings:

  - You are about to drop the `NodeConnections` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dataBottomHandles` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataIcon` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataLabel` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataTopHandles` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `internalId` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xPos` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yPos` to the `Node` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "NodeConnections" DROP CONSTRAINT "NodeConnections_inNodeId_fkey";

-- DropForeignKey
ALTER TABLE "NodeConnections" DROP CONSTRAINT "NodeConnections_outNodeId_fkey";

-- AlterTable
ALTER TABLE "Node" ADD COLUMN     "dataBottomHandles" INTEGER NOT NULL,
ADD COLUMN     "dataIcon" TEXT NOT NULL,
ADD COLUMN     "dataLabel" TEXT NOT NULL,
ADD COLUMN     "dataTopHandles" INTEGER NOT NULL,
ADD COLUMN     "diagramId" INTEGER,
ADD COLUMN     "internalId" TEXT NOT NULL,
ADD COLUMN     "xPos" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "yPos" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP DEFAULT;

-- DropTable
DROP TABLE "NodeConnections";

-- CreateTable
CREATE TABLE "Data" (
    "id" SERIAL NOT NULL,
    "internalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iso" TEXT,
    "cores" INTEGER,
    "cpulimit" INTEGER,
    "description" TEXT,
    "freeze" BOOLEAN,
    "memory" INTEGER,
    "onBoot" BOOLEAN,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Edge" (
    "id" SERIAL NOT NULL,
    "internalId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "diagramId" INTEGER,

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "Diagram"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "Diagram"("id") ON DELETE SET NULL ON UPDATE CASCADE;
