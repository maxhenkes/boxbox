import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Icon,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Handle } from "reactflow";
import { getIcon } from "../../lib/icon-helper";

export const vmNode = ({ data, isConnectable }) => {
  return (
    <>
      <HStack spacing={0}>
        <Flex
          bg="gray.800"
          w="60px"
          h="70px"
          border="2px"
          borderColor="gray.900"
          borderLeftRadius={4}
          align="center"
          justify="center"
        >
          <Icon as={getIcon(data.icon)} color="gray.200" w={12} h={12} />
        </Flex>
        <Box
          p={2}
          bg="gray.300"
          w="120px"
          h="70px"
          border="2px"
          borderColor="gray.900"
          borderRightRadius={4}
        >
          <Text noOfLines={2} fontSize="2xs" color="gray.800">
            {/*TODO: Add node overview data */}
            {data.label}
          </Text>
          <Divider></Divider>
          {data.template ? (
            <Text fontSize="3xs" color="gray.700" fontStyle="italic" pt={1}>
              {data.template}
            </Text>
          ) : (
            <Text fontSize="3xs" color="red.600" fontStyle="italic" pt={1}>
              No Template
            </Text>
          )}
        </Box>
      </HStack>
      <Handles handles={data.handles} />
    </>
  );
};

const Handles = ({ handles }) => {
  const createdHandles = [];
  const maxHandles = 6;

  const outBG = "#c45e47";
  const inBG = "#536c40";

  /*
  Add TOP and BOT handles from data,
  create even spacing depending on how many handles 
  */

  if (handles) {
    let offset = 0;
    for (let i = 0; i < handles && i < maxHandles; i++) {
      const styleIn = {
        left: offset,
        background: outBG,
        width: " 10px",
        height: "10px",
        borderColor: "black",
      };
      const styleOut = {
        left: offset,
        background: inBG,
        width: " 10px",
        height: "10px",
        borderColor: "black",
      };
      offset += 36;

      createdHandles.push(
        <Handle
          type="source"
          position="bottom"
          id={`a-${i}`}
          style={styleOut}
        />,
      );
      createdHandles.push(
        <Handle type="target" position="top" id={`b-${i}`} style={styleIn} />,
      );
    }
  }

  return <>{createdHandles}</>;
};
