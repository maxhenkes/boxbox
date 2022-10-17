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
} from "@chakra-ui/react";
import Overview from "./Overview";
import { useDiagramStore } from "../state/store";

type CheckType = {
  id: string;
  label: string;
  default?: number;
  multiple?: boolean;
};

type NumberType = {
  id: string;
  label: string;
  default?: number;
  limit?: NumberTypeLimit;
};

type NumberTypeLimit = {
  min: number;
  max: number;
};

export type TextType = {
  id: string;
  label: string;
  default?: string;
  large?: boolean;
};

export type DetailViewProps = (CheckType | NumberType | TextType)[];

export default function DetailView() {
  const [input, setInput] = useState("");

  const { selectedNode, diagramMap, getDataNode, nodes } = useDiagramStore(
    (state) => ({
      selectedNode: state.selectedNode,
      diagramMap: state.diagramMap,
      getDataNode: state.getDataNode,
      nodes: state.nodes,
    }),
  );

  const handleInputChange = (e) => {
    setInput(e.target.value);
    diagramMap[selectedNode].name = e.target.value;
    console.log(nodes);
    const index = nodes.findIndex((obj) => obj.id === selectedNode);
    nodes[index].data.label = e.target.value;
  };
  const isError = input === "";

  if (!selectedNode || selectedNode === "none") {
    return (
      <div>
        <Heading>Overview</Heading>
        <Divider mb={4} />
        <Overview></Overview>
      </div>
    );
  }
  return (
    <div>
      <Heading>Current Selected</Heading>
      <Divider mb={4} />
      <VStack>
        <Text>{diagramMap[selectedNode].name}</Text>
        <FormControl isInvalid={isError}>
          <FormLabel>VM Name</FormLabel>
          <Input type="text" value={input} onChange={handleInputChange} />
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
      </VStack>
    </div>
  );
}
