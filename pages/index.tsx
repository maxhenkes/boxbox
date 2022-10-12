import type { NextPage } from "next";
import Router from "next/router";
import { Flex, Heading, Input, Button, Text } from "@chakra-ui/react";
import { useState } from "react";

const Home: NextPage = () => {
  const [errorState, setError] = useState(false);
  const [username, setUsername] = useState("");
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { username };
      const ret = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(ret);
      if (ret.ok == true) {
        Router.push("App");
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex
      className="bgLogin"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction="column"
        background="gray.900"
        shadow={"xl"}
        p={12}
        rounded={6}
      >
        <Heading mb={6}>Welcome</Heading>
        <ErrorMessage isVisible={errorState} />
        <Input
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
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
        <Button onClick={submitData} colorScheme="teal">
          Log in
        </Button>
      </Flex>
    </Flex>
  );
};

const ErrorMessage = ({ isVisible }) => {
  if (isVisible) {
    return <Text color="red">Username does not exist</Text>;
  }
  return <></>;
};

export default Home;
