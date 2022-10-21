import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  console.log(req.query);
  const user = req.query.user;

  if (user) {
    const ret = await prisma.user.create({
      data: {
        name: user,
        email: `${user}@test.com`,
        pUser: process.env.pUser,
        token: process.env.TOKEN,
        api_key: process.env.api_key,
      },
    });
    res.json(ret);
  }
}
