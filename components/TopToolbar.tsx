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
} from "@chakra-ui/react";
import { MouseEventHandler, useRef } from "react";
import {
  AiOutlineForm,
  AiOutlineCloudUpload,
  AiOutlineClear,
} from "react-icons/ai";
import SaveButton from "./SaveButton";

import useStore from "../state/store";

type TopToolbarProps = {
  clearCanvas: MouseEventHandler;
};

function TopToolbar({ clearCanvas }: TopToolbarProps): JSX.Element {
  const { clearNodes } = useStore();

  return (
    <ButtonGroup variant="outline" spacing="3">
      <div draggable onDragStart={(event) => {}}>
        <Button leftIcon={<AiOutlineForm />} colorScheme="blue">
          New
        </Button>
      </div>
      <Button leftIcon={<AiOutlineCloudUpload />}>Load</Button>
      <SaveButton text="Save"></SaveButton>
      <Alert clear={clearNodes}></Alert>
    </ButtonGroup>
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
