import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { api_key, token, pUser, loggedInUser } = req.body;

  const user = await prisma.user.update({
    where: { name: loggedInUser },
    data: { api_key, token, pUser },
  });
  res.json(user);
}
