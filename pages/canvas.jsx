import { useRef, useState } from "react";
import FlowCanvas from "../components/FlowCanvas";
import TopToolbar from "../components/TopToolbar";
import DetailView from "../components/DetailView";
import { VStack, Flex, Box, HStack, Button } from "@chakra-ui/react";
import { ReactFlowProvider } from "reactflow";
import { Palette } from "../components/Palette";
import NavBar from "../components/nav/NavBar";

const Canvas = () => {
  return (
    <Flex direction="column" height="100vh">
      <NavBar />
      <ReactFlowProvider>
        <TopToolbar />
        <Flex height="100%">
          <Palette />
          <Box h="100%" w="100%" bg="gray.600">
            <FlowCanvas />
          </Box>

          <Flex
            bg="gray.700"
            direction="column"
            justify="space-between"
            align="normal"
            minW="20%"
          >
            <DetailView />
            <Button
              variant="solid"
              borderRadius={0}
              colorScheme="facebook"
              h="60px"
              mb={0.1}
            >
              Provision
            </Button>
          </Flex>
        </Flex>
      </ReactFlowProvider>
    </Flex>
  );
};

export default Canvas;
