import { Text } from "@chakra-ui/react";
import useStore from "../state/store";

export default function Overview() {
  const { nodes } = useStore();

  return (
    <>
      <Text>VM&apos;s: {nodes.length}</Text>
    </>
  );
}
