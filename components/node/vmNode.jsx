import {
  Box,
  Center,
  Divider,
  HStack,
  Icon,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Handle } from "reactflow";
import { getIcon } from "../../util/icon-helper";

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
            <Icon as={getIcon(data.icon)} color="gray.200" w={10} h={10} />
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
          <Text noOfLines={1} fontSize="2xs" color="gray.800">
            {/*TODO: Add node overview data */}
            {data.label}
          </Text>
          <Divider></Divider>
          {data.template ? (
            <Text fontSize="3xs" color="gray.700" fontStyle="italic" pt={1}>
              {data.template}
            </Text>
          ) : (
            <></>
          )}
        </Box>
      </HStack>
      <Handles handles={data.handles} isConnectable={isConnectable} />
    </>
  );
};

const Handles = ({ handles, isConnectable }) => {
  const createdHandles = [];

  const outBG = "#c45e47";
  const inBG = "#42ad42";

  /*
  Add TOP and BOT handles from data,
  create even spacing depending on how many handles 
  */
  console.log(handles);

  if (handles) {
    let offset = 0;
    for (let i = 1; i <= handles; i++) {
      const styleIn = { left: offset, background: outBG };
      const styleOut = { left: offset, background: inBG };
      offset += 10;

      createdHandles.push(
        <Handle
          type="source"
          position="bottom"
          key={`a-${i}`}
          id={`a-${offset}`}
          style={styleOut}
          isConnectable={isConnectable}
        />,
      );
      createdHandles.push(
        <Handle
          type="target"
          position="top"
          key={`b-${i}`}
          id={`b-${offset}`}
          style={styleIn}
          isConnectable={isConnectable}
        />,
      );
    }
  }

  return <>{createdHandles}</>;
};
