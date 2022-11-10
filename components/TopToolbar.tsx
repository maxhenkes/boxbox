import {
  Button,
  ButtonGroup,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { MouseEventHandler, useRef } from "react";
import {
  AiOutlineForm,
  AiOutlineCloudUpload,
  AiOutlineClear,
} from "react-icons/ai";
import { useDiagramStore } from "../lib/store";
import SaveButton from "./SaveButton";

function TopToolbar(): JSX.Element {
  const { clearNodes } = useDiagramStore((state) => ({
    clearNodes: state.clearNodes,
  }));

  const clearAll = () => {
    clearNodes();
  };

  return (
    <Box bg="gray.700" border="1px" borderColor="gray.600">
      <ButtonGroup padding={2} variant="outline" spacing="3">
        <SaveButton text="Save"></SaveButton>
        <Alert clear={clearAll}></Alert>
      </ButtonGroup>
    </Box>
  );
}

const Alert = ({ clear }) => {
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = () => {
    onClose();
    clear();
  };

  return (
    <>
      <Button onClick={onOpen} leftIcon={<AiOutlineClear />} colorScheme="red">
        Clear
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Clear Diagram
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default TopToolbar;
