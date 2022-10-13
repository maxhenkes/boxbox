import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useStore from "../state/store";

export default function Overview() {
  const { nodes } = useStore((state) => ({
    nodes: state.nodes,
  }));

  const [localNodes, setLocalNodes] = useState([]);

  useEffect(() => {
    setLocalNodes(nodes);
  }, [nodes]);

  return (
    <>
      <Text>VM&apos;s: {localNodes.length}</Text>
    </>
  );
}
