import Navbar from "../components/nav/NavBar";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Tag,
} from "@chakra-ui/react";
import prisma from "../lib/prisma";
import { useDiagramStore } from "../lib/store";
import { head } from "lodash";
import Router from "next/router";

export const getServerSideProps = async ({ req }) => {
  const savedDiagrams = await prisma.user.findUnique({
    where: {
      id: 1,
    },
    select: {
      diagrams: {
        select: {
          name: true,
          diagramDescription: true,
          id: true,
          createdAt: true,
        },
      },
    },
  });

  const dia = JSON.stringify(savedDiagrams);

  return { props: { dia } };
};

const MyDiagrams = ({ dia }) => {
  const savedDiagrams = JSON.parse(dia);
  return (
    <Flex flexFlow="column" w="100vw" h="100vh">
      <Navbar />
      <Box flex="1" bg="gray.600">
        <Container bg="gray.700" minWidth="60%" height="100%">
          <Heading pt={4} pb={4}>
            My Diagrams
          </Heading>
          {savedDiagrams.diagrams.reverse().map((d) => (
            <Accordion allowToggle>
              <AccordionItem pb={5}>
                <DiagramItem data={d} />
              </AccordionItem>
            </Accordion>
          ))}
        </Container>
      </Box>
    </Flex>
  );
};

const DiagramItem = ({ data }) => {
  const { loadFromDB } = useDiagramStore((state) => ({
    loadFromDB: state.loadFromDB,
  }));

  const formatDate = (date) => {
    return new Date(data.createdAt).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const onLoad = async () => {
    const result = await fetch("/api/diagram/load", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        diagram: data.id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const diagramData = head(data.diagrams);
        console.log(diagramData);
        loadFromDB(diagramData);
        Router.push("canvas");
      });
  };

  return (
    <>
      <AccordionButton>
        <Box textAlign="left">
          <Flex direction="column">
            <Heading fontSize="xl">{data.name}</Heading>
            <Tag colorScheme="teal" mt={2}>
              {formatDate()}
            </Tag>
          </Flex>
        </Box>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel pb={4}>
        <Box border="2px" borderColor="gray.600" borderRadius="3" p={3}>
          {data.diagramDescription}
        </Box>

        <Button mt={5} onClick={onLoad} variant="solid" colorScheme="green">
          Load
        </Button>
      </AccordionPanel>
    </>
  );
};

export default MyDiagrams;
