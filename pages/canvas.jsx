import { useRef, useState } from "react";
import FlowCanvas from "../components/FlowCanvas";
import TopToolbar from "../components/TopToolbar";
import DetailView from "../components/DetailView";
import { VStack, Flex, Box } from "@chakra-ui/react";
import { ReactFlowProvider } from "reactflow";

const MainView = () => {
  return (
    <VStack>
      <ReactFlowProvider>
        <Flex minWidth="100vw" minHeight="100vh" direction="row" gap={0}>
          <Box bg="gray.600" w="77vw">
            <TopToolbar />
            <FlowCanvas />
          </Box>
          <Box bg="gray.700" minWidth="23vw">
            <Box margin={5}>
              <DetailView />
            </Box>
          </Box>
        </Flex>
      </ReactFlowProvider>
    </VStack>
  );
};

export default MainView;
