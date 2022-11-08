import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NavBar from "../components/nav/NavBar";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useDiagramStore } from "../state/store";
import { keys, size, values } from "lodash";

const Provision = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [diagramHasError, setDiagramHasError] = useState(false);

  const { diagramMap } = useDiagramStore((state) => ({
    diagramMap: state.diagramMap,
  }));
  if (isChecking) {
    if (size(diagramMap) > 0) {
      for (const node of values(diagramMap)) {
        if (!node.template?.vmid) {
          console.log(node);
          setDiagramHasError(true);
          setIsChecking(false);
          break;
        }
      }
      setIsChecking(false);
    } else {
      setDiagramHasError(true);
      setIsChecking(false);
    }
  }

  useEffect(() => {
    if (!isChecking && !diagramHasError) {
      console.log("make call to proxmox");
    }
  }, [isChecking]);

  return (
    <Flex h="100vh" flexDirection="column">
      <NavBar />
      <Box flex="1" bg="gray.600">
        <Container bg="gray.700" minWidth="60%" height="100%">
          <Heading pt="5">Provisioning VM's on Proxmox</Heading>
          <CheckProvisions
            isChecking={isChecking}
            isError={diagramHasError}
          ></CheckProvisions>
        </Container>
      </Box>
    </Flex>
  );
};

const CheckProvisions = ({ isChecking, isError }) => {
  return (
    <>
      {isChecking ? (
        <Flex pt="3" align="center">
          <Spinner mr={3} h="10" w="10" />
          Currently checking for errors...
        </Flex>
      ) : !isError ? (
        <Flex pt="3" align="center">
          <Icon as={AiOutlineCheckCircle} h="10" w="10" mr="3" />
          No Errors Found
        </Flex>
      ) : (
        <Flex pt="3" align="center">
          <Icon as={AiOutlineCloseCircle} h="10" w="10" mr="3" />
          Diagram is not complete! Please make sure it is not empty and check
          for templates then try again.
        </Flex>
      )}
    </>
  );
};

export default Provision;
