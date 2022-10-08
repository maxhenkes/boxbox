import { useState } from "react";
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

export default function DetailView({ fields }: DetailViewProps) {
  const [input, setInput] = useState("");
  const handleInputChange = (e) => setInput(e.target.value);
  const isError = input === "";

  if (fields[0].label === "Node none") {
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
        <Text>{fields[0].label}</Text>
        <FormControl isInvalid={isError}>
          <FormLabel>VM Name</FormLabel>
          <Input type="text" value={input} onChange={handleInputChange} />
          {!isError ? (
            <FormHelperText>Enter the VM&aposs name.</FormHelperText>
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
