import { useEffect, useMemo, useState } from "react";
import {
  Heading,
  Divider,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  VStack,
  HStack,
  Text,
  Button,
  Box,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import Overview from "./Overview";
import { useDiagramStore } from "../state/store";
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
  } = useDiagramStore((state) => ({
    selectedNode: state.selectedNode,
    diagramMap: state.diagramMap,
    nodes: state.nodes,
    setNodeLabel: state.setNodeLabel,
    addHandle: state.addHandle,
    deleteNode: state.deleteNode,
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

  if (!selectedNode || selectedNode === "none") {
    return (
      <Box flex="1" alignSelf="stretch" m={3}>
        <Heading>Overview</Heading>
        <Divider mb={4} />
        <Overview></Overview>
      </Box>
    );
  }

  return (
    <Box flex="1" alignSelf="stretch" m={3}>
      {/*  <Heading fontSize="2xl">Current Selected</Heading> */}
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
          <Textarea placeholder="VM Description..."></Textarea>
        </Box>
        <Checkbox defaultChecked>Start on Boot</Checkbox>
        <HStack>
          <Text>CPU Cores</Text>
          <NumberInput size="md" maxW={20} defaultValue={1} min={1} max={12}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
        <HStack>
          <Text>Memory</Text>
          <NumberInput size="md" maxW="50%" defaultValue={1024} min={1}>
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
