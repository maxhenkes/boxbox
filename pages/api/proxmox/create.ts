import axios from "axios";
import prisma from "../../../lib/prisma";
import { getVMURL } from "../../../lib/proxmox";

export default async function handle(req, res) {
  const { vm } = req.body;

  const url = getVMURL("102");
  const authURL = await authHeaderBuilder();

  axios
    .post(
      url,
      { newid: 105 },
      {
        headers: {
          Authorization: authURL,
        },
      },
    )
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
