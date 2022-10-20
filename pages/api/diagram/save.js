import { forOwn, omit } from "lodash";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { nodes, data, name } = req.body;

  const getNodes = () => {
    const ret = [];
    nodes.forEach((n) => {
      const dataNode = {
        internalId: n.id,
        xPos: n.position.x,
        yPos: n.position.y,
        dataLabel: n.data.label,
        dataIcon: n.data.icon,
      };
      ret.push(dataNode);
    });
    return ret;
  };

  const getData = () => {
    const ret = [];
    forOwn(data, (value, key) => {
      const dataNode = omit(value, "id");
      dataNode.internalId = value.id;
      ret.push(dataNode);
    });

    return ret;
  };

  const result = await prisma.user.update({
    where: {
      id: 1,
    },
    data: {
      diagrams: {
        create: {
          name: name,
          nodes: {
            create: getNodes(),
          },
          data: {
            create: getData(),
          },
        },
      },
    },
  });
  res.json(result);
}
