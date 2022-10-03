import prisma from "../../../lib/prisma";

/*
Fake login for POC
*/
export default async function handle(req, res) {
  const { username } = req.body;

  const login = await prisma.user.findUnique({
    where: { name: username },
  });
  if (login != null) {
    res.json(login);
  } else {
    throw "User not found";
  }
}
