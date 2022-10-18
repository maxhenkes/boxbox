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
} from "@chakra-ui/react";
import Overview from "./Overview";
import { useDiagramStore } from "../state/store";

export default function DetailView() {
  const { selectedNode, diagramMap, nodes, setNodeLabel, addHandle } =
    useDiagramStore((state) => ({
      selectedNode: state.selectedNode,
      diagramMap: state.diagramMap,
      nodes: state.nodes,
      setNodeLabel: state.setNodeLabel,
      addHandle: state.addHandle,
    }));

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

  if (!selectedNode || selectedNode === "none") {
    return (
      <div>
        <Heading>Overview</Heading>
        <Divider mb={4} />
        <Overview></Overview>
      </div>
    );
  }

  const addHandleClick = () => {
    addHandle(selectedNode);
  };

  return (
    <div>
      <Heading>Current Selected</Heading>
      <Divider mb={4} />
      <VStack>
        <Text>{diagramMap[selectedNode].name}</Text>
        <FormControl isInvalid={isError}>
          <FormLabel>VM Name</FormLabel>
          <Input type="text" value={vmName} onChange={handleInputChange} />
          {!isError ? (
            <FormHelperText>Enter the VM&apos;s name.</FormHelperText>
          ) : (
            <FormErrorMessage>Name is required.</FormErrorMessage>
          )}
        </FormControl>
        <Checkbox defaultChecked>Start on Boot</Checkbox>
        <HStack>
          <Text>CPU Cores: </Text>
          <NumberInput size="sm" maxW={20} defaultValue={1} min={1} max={12}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
        <Button onClick={addHandleClick}>Add Handle</Button>
      </VStack>
    </div>
  );
}
