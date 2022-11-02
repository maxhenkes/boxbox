import Navbar from "../components/nav/NavBar";
import {
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
import { useDiagramStore } from "../state/store";
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
  console.log(savedDiagrams);
  return (
    <Flex flexFlow="column" w="100vw" h="100vh">
      <Navbar />
      <Box flex="1" bg="gray.600">
        <Container bg="gray.700" minWidth="60%" height="100%">
          <Heading pt={4} pb={4}>
            My Diagrams
          </Heading>
          {savedDiagrams.diagrams.map((d) => (
            <List spacing={8}>
              <ListItem key={d.id}>
                <DiagramItem data={d} />
              </ListItem>
            </List>
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
    <Box
      display="flex"
      borderRadius={8}
      key={`box-${data.id}`}
      p={2}
      m={3}
      h={50}
      bg="gray.600"
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading fontSize="xl">{data.name}</Heading>
      <Tag colorScheme="red">{formatDate()}</Tag>
      <Button onClick={onLoad} variant="solid" colorScheme="gray">
        Load
      </Button>
    </Box>
  );
};

export default MyDiagrams;
