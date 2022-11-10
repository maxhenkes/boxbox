import axios from "axios";
import prisma from "../../../lib/prisma";
import { getVMURL } from "../../../lib/proxmox";

export default async function handle(req, res) {
  const { vm, newid } = req.body;

  const url = getVMURL(vm.template.vmid);
  const authURL = await authHeaderBuilder();

  await axios
    .post(
      url,
      { newid: parseInt(newid) },
      {
        headers: {
          Authorization: authURL,
        },
      },
    )
    .catch(function (error) {
      console.error(error);
    })
    .then((out) => {
      if (out.data) {
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
