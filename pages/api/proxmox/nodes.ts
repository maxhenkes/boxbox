import axios from "axios";
import prisma from "../../../lib/prisma";
import { getNodesURL } from "../../../lib/proxmox";

export default async function handle(req, res) {
  const url = getNodesURL;
  const authURL = await authHeaderBuilder();

  axios
    .get(url, {
      headers: {
        Authorization: authURL,
      },
    })
    .catch(function (error) {
      console.error(error);
      res.json({});
    })
    .then((out) => {
      res.json(out.data);
    });
}

const authHeaderBuilder = async () => {
  const dbUserData = await prisma.user.findUnique({
    where: {
      name: "Test",
    },
  });

  return `PVEAPIToken=${dbUserData.pUser}!${dbUserData.token}=${dbUserData.api_key}`;
};
