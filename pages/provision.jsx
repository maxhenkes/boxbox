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
  const [vmList, setVmList] = useState([]);
  const [isDone, setIsDone] = useState(false);

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
      const urlCreate = "/api/proxmox/create";
      const urlConfig = "/api/proxmox/config";

      const createVM = async (vm, c) => {
        nextVmId();
        const newid = lastVmId + c;

        try {
          fetch(urlCreate, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              vm,
              newid: newid,
            }),
          })
            .then((res) => {
              console.log(res.json());
            })
            .finally(() => {
              fetch(urlConfig, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  vm,
                  newid: newid,
                }),
              }).then((res) => {
                console.log(res.json());
              });
            });
        } catch (error) {
          console.error(error);
        }
      };

      let id = 1;
      vmList.forEach((vm) => {
        createVM(vm, id);
        id++;
      });

      setIsDone((s) => true);
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
            isDone={isDone}
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

const CheckProvisions = ({ isChecking, isError, isDone }) => {
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
      {isDone ? (
        <Flex pt="3" align="center">
          <Icon as={AiOutlineCheckCircle} h="10" w="10" mr="3" />
          All VMs were created!
        </Flex>
      ) : (
        <></>
      )}
    </>
  );
};

export default Provision;
