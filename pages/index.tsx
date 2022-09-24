import type { NextPage } from "next";
import Router from "next/router";
import { Flex, Heading, Input, Button } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.900" p={12} rounded={6}>
        <Heading mb={6}>Welcome</Heading>
        <Input
          placeholder="Username"
          variant="filled"
          mb={3}
          type="text"
        ></Input>
        <Input
          placeholder="********"
          variant="filled"
          mb={6}
          type="password"
        ></Input>
        <Button onClick={() => Router.push("App")} colorScheme="teal">
          Log in
        </Button>
      </Flex>
    </Flex>
  );
};

export default Home;
