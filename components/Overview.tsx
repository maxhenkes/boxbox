import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDiagramStore } from "../state/store";

export default function Overview() {
  const { nodes } = useDiagramStore((state) => ({
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
