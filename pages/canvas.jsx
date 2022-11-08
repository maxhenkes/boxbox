import { useRef, useState } from "react";
import FlowCanvas from "../components/FlowCanvas";
import TopToolbar from "../components/TopToolbar";
import DetailView from "../components/DetailView";
import {
  Flex,
  Box,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { ReactFlowProvider } from "reactflow";
import { Palette } from "../components/Palette";
import NavBar from "../components/nav/NavBar";
import Router from "next/router";

const Canvas = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const onProvisionClick = (event) => {
    onClose();
    Router.push("provision");
  };

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
              onClick={onOpen}
              borderRadius={0}
              colorScheme="facebook"
              h="60px"
              mb={0.1}
            >
              Provision
            </Button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Provision on Proxmox
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} variant="solid" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="green"
                      variant="solid"
                      onClick={onProvisionClick}
                      ml={3}
                    >
                      Provision
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Flex>
        </Flex>
      </ReactFlowProvider>
    </Flex>
  );
};

export default Canvas;
