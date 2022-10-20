-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_diagramId_fkey";

-- DropForeignKey
ALTER TABLE "Diagram" DROP CONSTRAINT "Diagram_userId_fkey";

-- DropForeignKey
ALTER TABLE "Edge" DROP CONSTRAINT "Edge_diagramId_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_diagramId_fkey";

-- AddForeignKey
ALTER TABLE "Diagram" ADD CONSTRAINT "Diagram_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "Diagram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "Diagram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "Diagram"("id") ON DELETE CASCADE ON UPDATE CASCADE;
