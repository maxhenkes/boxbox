import axios from "axios";
import prisma from "../../../lib/prisma";
import { getVersionURL } from "../../../lib/proxmox";

export default async function handle(req, res) {
  const url = getVersionURL;
  const authURL = await authHeaderBuilder(req.body);

  axios
    .get(url, {
      headers: {
        Authorization: authURL,
      },
    })
    .then((out) => {
      if (out.data) {
        res.json(out.data);
      }
      if (out.status) {
        res.status(out.status);
      }
    })
    .catch(function (error) {
      res.status(501).send({ message: "That didnt work" });
      return;
    });
}

const authHeaderBuilder = async ({ api_key, token, pUser }) => {
  return `PVEAPIToken=${pUser}!${token}=${api_key}`;
};
