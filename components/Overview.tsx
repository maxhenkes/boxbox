import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDiagramStore } from "../state/store";

export default function Overview() {
  const { nodes } = useDiagramStore((state) => ({
    nodes: state.nodes,
  }));

  return (
    <>
      <Text>VM&apos;s: {nodes.length}</Text>
    </>
  );
}
