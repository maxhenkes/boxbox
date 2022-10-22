import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { diagram } = req.body;

  const result = await prisma.user.findUnique({
    where: {
      id: 1,
    },
    select: {
      diagrams: {
        where: { id: parseInt(diagram) },
        select: {
          nodes: true,
          edges: true,
          data: true,
          idCount: true,
          createdAt: true,
        },
      },
    },
  });
  await res.json(result);
}
