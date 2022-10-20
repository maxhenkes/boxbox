import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const result = await prisma.user.findMany({
    where: {
      id: 1,
    },
    select: {
      diagrams: {
        select: {
          nodes: true,
          edges: true,
          data: true,
          createdAt: true,
        },
      },
    },
  });
  res.json(result);
}
