import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";

type SaveButtonProp = {
  text: string;
};

function SaveButton({ text }: SaveButtonProp) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSave = (event: MouseEventHandler<HTMLButtonElement>) => {
    onClose();
  };

  return (
    <>
      <Button leftIcon={<AiOutlineCloudDownload />} onClick={onOpen}>
        {text}
      </Button>
      <Modal
        closeOnOverlayClick={false}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Save Diagram</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Diagram name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onSave} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SaveButton;
