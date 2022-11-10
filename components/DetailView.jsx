import { useEffect, useState } from "react";
import {
  Heading,
  Divider,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormLabel,
  Input,
  HStack,
  Text,
  Button,
  Box,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import Overview from "./Overview";
import { useDiagramStore } from "../lib/store";
import { TemplateSelector } from "./TemplateSelector";
import { useUpdateNodeInternals } from "reactflow";

export default function DetailView() {
  const {
    selectedNode,
    diagramMap,
    nodes,
    setNodeLabel,
    addHandle,
    deleteNode,
    updateDataNode,
  } = useDiagramStore((state) => ({
    selectedNode: state.selectedNode,
    diagramMap: state.diagramMap,
    nodes: state.nodes,
    setNodeLabel: state.setNodeLabel,
    addHandle: state.addHandle,
    deleteNode: state.deleteNode,
    updateDataNode: state.updateDataNode,
  }));

  const updateNodeInternals = useUpdateNodeInternals();

  const getVMName = () => {
    const hasSelection = !selectedNode || selectedNode === "none";

    if (!hasSelection) {
      setIsError(false);
      return diagramMap[selectedNode].name;
    }
    setIsError(true);
    return "";
  };

  const [vmName, setVmName] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setVmName(getVMName());
  }, [selectedNode]);

  const handleInputChange = (e) => {
    setVmName(e.target.value);
    setNodeLabel(selectedNode, e.target.value);
  };

  const onDelete = () => {
    deleteNode(selectedNode);
  };

  const onHandle = () => {
    addHandle(selectedNode);
    updateNodeInternals(selectedNode);
  };

  const getNode = () => {
    return diagramMap[selectedNode];
  };

  if (!selectedNode || selectedNode === "none") {
    return (
      <Box flex="1" alignSelf="stretch" m={3}>
        {/*       <Heading>Overview</Heading>
        <Divider mb={4} />
        <Overview></Overview> */}
      </Box>
    );
  }

  return (
    <Box flex="1" alignSelf="stretch" m={3}>
      <Flex flexDirection="column" gap="5">
        <Text fontSize="xl">{diagramMap[selectedNode].name}</Text>
        <Box>
          <FormLabel>Name</FormLabel>
          <Input
            maxLength={20}
            type="text"
            value={vmName}
            onChange={handleInputChange}
          />
        </Box>
        <Box>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="VM Description..."
            value={getNode().description}
            onChange={(e) => {
              updateDataNode(selectedNode, "description", e.target.value);
            }}
          ></Textarea>
        </Box>
        <Checkbox defaultChecked isChecked={getNode().onBoot}>
          Start on Boot
        </Checkbox>
        <HStack>
          <Text>CPU Cores</Text>
          <NumberInput
            size="md"
            value={getNode().cores}
            onChange={(valueAsNumber) => {
              updateDataNode(selectedNode, "cores", parseInt(valueAsNumber));
            }}
            maxW={20}
            defaultValue={1}
            min={1}
            max={12}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
        <HStack>
          <Text>Memory</Text>
          <NumberInput
            size="md"
            maxW="50%"
            defaultValue={1024}
            value={getNode().memory}
            onChange={(valueAsNumber) => {
              updateDataNode(selectedNode, "memory", parseInt(valueAsNumber));
            }}
            min={1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text>MB</Text>
        </HStack>

        <Box w="100%" pt={5}>
          <Button
            colorScheme="green"
            variant="solid"
            w="100%"
            onClick={onHandle}
          >
            Add Network
          </Button>
        </Box>
        <TemplateSelector />
        <Box w="100%" pt={5}>
          <Button colorScheme="red" variant="solid" w="100%" onClick={onDelete}>
            Delete
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
