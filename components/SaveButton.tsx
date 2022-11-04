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
  Textarea,
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
  const { nodes, diagramMap, id, edges } = useDiagramStore((state) => ({
    nodes: state.nodes,
    diagramMap: state.diagramMap,
    id: state.id,
    edges: state.edges,
  }));

  const [diagramName, setDiagramName] = useState("");
  const [diagramDescription, setDiagramDescription] = useState("");

  const onSave = async (event: MouseEventHandler<HTMLButtonElement>) => {
    if (diagramName === "") {
      return;
    }
    try {
      const body = {
        nodes,
        data: diagramMap,
        name: diagramName,
        idCount: id,
        diagramDescription,
        edges,
      };
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
            <FormLabel pt={3}>Description</FormLabel>
            <Textarea
              placeholder="Diagram description..."
              value={diagramDescription}
              onChange={(e) => setDiagramDescription(e.target.value)}
            ></Textarea>
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
