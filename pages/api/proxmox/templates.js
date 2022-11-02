import axios from "axios";
import prisma from "../../../lib/prisma";
import { getTemplatesURL } from "../../../lib/proxmox";

export default async function handle(req, res) {
  const url = getTemplatesURL;
  const authURL = await authHeaderBuilder();

  axios
    .get(url, {
      headers: {
        Authorization: authURL,
      },
    })
    .catch(function (error) {
      console.error(error);
      res.json([]);
      res.end();
    })
    .then((out) => {
      let result = [];
      if (out && out.data && out.data.data && out.data.data.length > 0) {
        const data = out.data.data;
        if (data && data.length > 0) {
          data.forEach((d) => {
            if (d.template === 1) {
              result.push({
                vmid: d.vmid,
                name: d.name,
              });
            }
          });
        }

        res.status(200);
        res.json(result);
        res.end();
      } else {
        res.status(500);
        res.json([]);
        res.end();
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
