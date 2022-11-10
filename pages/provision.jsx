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
import { useDiagramStore } from "../lib/store";
import { keys, size, values } from "lodash";

const Provision = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [diagramHasError, setDiagramHasError] = useState(false);
  const [createdVMs, setCreatedVMs] = useState([]);
  const [vmList, setVmList] = useState([]);

  const { diagramMap, lastVmId, nextVmId } = useDiagramStore((state) => ({
    diagramMap: state.diagramMap,
    lastVmId: state.lastVmId,
    nextVmId: state.nextVmId,
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
        setVmList((oldArray) => [...oldArray, node]);
      }
      setIsChecking(false);
    } else {
      setDiagramHasError(true);
      setIsChecking(false);
    }
  }

  useEffect(() => {
    if (!isChecking && !diagramHasError) {
      const url = "/api/proxmox/create";

      const fetchTemplates = async (vm) => {
        try {
          nextVmId();
          const newid = lastVmId;
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              vm,
              newid: newid + 1,
            }),
          });
          const json = await response.json();
          console.log(json);
        } catch (error) {
          console.error(error);
        }
      };
      fetchTemplates(vmList[0]);

      console.log("make call to proxmox");
      console.log(vmList);
    }
  }, [isChecking, vmList]);

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
          {vmList.map((vm) => {
            <VMCreation vmid={vm.id} />;
          })}
        </Container>
      </Box>
    </Flex>
  );
};

const VMCreation = ({ vmid }) => {
  return (
    <Flex pt="3" align="center">
      <Icon as={AiOutlineCheckCircle} h="10" w="10" mr="3" />
      VM {vmid} created!
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
