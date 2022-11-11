import axios from "axios";
import { pick } from "lodash";
import prisma from "../../../lib/prisma";
import { getVMConfigURL } from "../../../lib/proxmox";

export default async function handle(req, res) {
  const { vm, newid } = req.body;

  const url = getVMConfigURL(newid);
  const authURL = await authHeaderBuilder();

  const vmConfig = pick(vm, [
    "name",
    "cores",
    "memory",
    "description",
    "onBoot",
  ]);

  await axios
    .post(url, vmConfig, {
      headers: {
        Authorization: authURL,
      },
    })
    .catch(function (error) {
      console.error(error);
    })
    .then((out) => {
      if (out && out.data) {
        res.json(out.data);
      }
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
