import Navbar from "../components/nav/NavBar";
import { Box, Flex } from "@chakra-ui/react";

const MyDiagrams = () => {
  return (
    <Flex flexFlow="column" w="100vw" h="100vh">
      <Navbar />
      <Box flex="1" bg="gray.700" />
    </Flex>
  );
};

export default MyDiagrams;
