import { Box, Center, HStack, Icon, Text } from "@chakra-ui/react";
import { Handle } from "reactflow";
import { GoServer } from "react-icons/go";

export const vmNode = ({ data, isConnectable }) => {
  return (
    <>
      <HStack spacing={0}>
        <Box
          p={2}
          bg="gray.800"
          w="60px"
          h="70px"
          border="2px"
          borderColor="gray.900"
          borderLeftRadius={4}
        >
          <Center>
            <Icon as={GoServer} color="gray.200" w={10} h={10} />
          </Center>
        </Box>
        <Box
          p={2}
          bg="gray.300"
          w="80px"
          h="70px"
          border="2px"
          borderColor="gray.900"
          borderRightRadius={4}
        >
          <Text noOfLines={1} fontSize="3xs" color="gray.800">
            {/*TODO: Add node overview data */}
            {data.label}
          </Text>
        </Box>
      </HStack>
      <Handles handles={data} isConnectable={isConnectable} />
    </>
  );
};

const Handles = ({ handles, isConnectable }) => {
  const createdHandles = [];

  /*
  Add TOP and BOT handles from data,
  create even spacing depending on how many handles 
  */

  if (handles) {
    for (let i = 1; i <= handles; i++) {
      let style;

      if (i == 1) {
        style = { left: 10, background: "#555" };
      } else if (i == 2) {
        style = { left: 20, background: "#555" };
      } else if (i == 3) {
        style = { left: 30, background: "#555" };
      }

      createdHandles.push(
        <Handle
          type="source"
          position="bottom"
          key={i}
          id="a"
          style={style}
          isConnectable={isConnectable}
        />,
      );
    }
  }

  return <>{createdHandles}</>;
};
