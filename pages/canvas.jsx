import { useRef, useState } from "react";
import FlowCanvas from "../components/FlowCanvas";
import TopToolbar from "../components/TopToolbar";
import DetailView from "../components/DetailView";
import { VStack, Flex, Box, HStack } from "@chakra-ui/react";
import { ReactFlowProvider } from "reactflow";
import { Palette } from "../components/Palette";
import NavBar from "../components/nav/NavBar";

const Canvas = () => {
  return (
    <>
      <NavBar />
      <VStack>
        <ReactFlowProvider>
          <Flex minWidth="100vw" minHeight="100vh" direction="row" gap={0}>
            <Box bg="gray.600" w="80%">
              <TopToolbar />
              <Flex height="100%">
                <Palette />
                <Box flex="1">
                  <FlowCanvas />
                </Box>
              </Flex>
            </Box>
            <Box bg="gray.700" minWidth="20%">
              <Box margin={5}>
                <DetailView />
              </Box>
            </Box>
          </Flex>
        </ReactFlowProvider>
      </VStack>
    </>
  );
};

export default Canvas;
