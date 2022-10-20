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
import { MouseEventHandler, useState } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { useDiagramStore } from "../state/store";

type SaveButtonProp = {
  text: string;
};

function SaveButton({ text }: SaveButtonProp) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { nodes, diagramMap } = useDiagramStore((state) => ({
    nodes: state.nodes,
    diagramMap: state.diagramMap,
  }));

  const [diagramName, setDiagramName] = useState("");

  const onSave = async (event: MouseEventHandler<HTMLButtonElement>) => {
    try {
      const body = { nodes, data: diagramMap, name: diagramName };
      const reply = await fetch("/api/diagram/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(reply);
    } catch (error) {
      console.error(error);
    }
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
              <Input
                value={diagramName}
                onChange={(e) => setDiagramName(e.target.value)}
                placeholder="Diagram name"
              />
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
