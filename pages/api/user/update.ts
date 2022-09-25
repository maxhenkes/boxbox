import prisma from "../../../lib/prisma";

const ID = 0;

export default async function handle(req, res) {
  console.log("test");
  console.log(req.body);
  const user = prisma.user.update({
    where: { id: ID },
    data: { name: "test", api_key: "test" },
  });
  res.json(user);
}
