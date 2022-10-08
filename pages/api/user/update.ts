import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { api_key, token, pUser } = req.body;

  const user = await prisma.user.update({
    where: { name: "Test" },
    data: { api_key, token, pUser },
  });
  res.json(user);
}
