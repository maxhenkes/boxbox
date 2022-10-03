-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "api_key" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diagram" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Diagram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Node" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NodeConnections" (
    "outNodeId" INTEGER NOT NULL,
    "inNodeId" INTEGER NOT NULL,

    CONSTRAINT "NodeConnections_pkey" PRIMARY KEY ("outNodeId","inNodeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "Diagram" ADD CONSTRAINT "Diagram_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NodeConnections" ADD CONSTRAINT "NodeConnections_outNodeId_fkey" FOREIGN KEY ("outNodeId") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NodeConnections" ADD CONSTRAINT "NodeConnections_inNodeId_fkey" FOREIGN KEY ("inNodeId") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
