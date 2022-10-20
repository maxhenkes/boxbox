import {
  Box,
  Heading,
  Icon,
  VStack,
  Text,
  StackDivider,
} from "@chakra-ui/react";
import { getIcon } from "../util/icon-helper";

export const Palette = () => {
  return (
    <VStack
      w="100px"
      bg="gray.700"
      divider={<StackDivider borderColor="gray.600" m={3} />}
    >
      <Heading fontSize="md" pt={5} mr={2}>
        Palette
      </Heading>
      <PaletteOption name="Server" icon="server" id="VM" />
      <PaletteOption name="Database" icon="database" id="DB" />
      <PaletteOption name="Storage" icon="storage" id="HDD" />
    </VStack>
  );
};

const PaletteOption = ({ icon = "server", name, id }) => {
  const onDragEventStart = (event) => {
    event.dataTransfer.setData("node/icon", icon);
    event.dataTransfer.setData("node/id", id);
  };

  return (
    <VStack>
      <Box
        bg="gray.900"
        border={3}
        w="70px"
        h="70px"
        borderRadius={8}
        display="flex"
        alignItems="center"
        justifyItems="center"
        draggable
        onDragStart={onDragEventStart}
      >
        <Icon
          as={getIcon(icon)}
          color="gray.200"
          minW="100%"
          minH="100%"
          p={2}
        />
      </Box>
      <Box>
        <Text fontSize="sm" userSelect="none">
          {name}
        </Text>
      </Box>
    </VStack>
  );
};
