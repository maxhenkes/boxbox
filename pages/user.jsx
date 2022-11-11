import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Input,
  Textarea,
  HStack,
  Avatar,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "../components/nav/NavBar";
import prisma from "../lib/prisma";

export const getServerSideProps = async ({ req }) => {
  const dbUserData = await prisma.user.findUnique({
    where: {
      name: "Test",
    },
  });

  return { props: { dbUserData } };
};

const User = ({ dbUserData }) => {
  const toast = useToast();
  console.log(dbUserData);

  const [userData, setUserData] = useState(dbUserData);
  const [isSaveDisabled, setSaveDisabled] = useState(true);
  const [isTesting, setIsTesting] = useState(false);

  const onSave = async () => {
    await fetch("/api/user/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: userData.api_key,
        pUser: userData.pUser,
        token: userData.token,
        loggedInUser: "Test",
      }),
    });
    onSuccessSaved();
  };

  const setApiKey = (event) => {
    let value = event.target.value;
    setUserData((prevState) => {
      return { ...prevState, api_key: value };
    });
  };

  const setToken = (event) => {
    let value = event.target.value;
    setUserData((prevState) => {
      return { ...prevState, token: value };
    });
  };

  const setPUser = (event) => {
    let value = event.target.value;
    setUserData((prevState) => {
      return { ...prevState, pUser: value };
    });
  };

  const onSuccessSaved = () => {
    toast({
      title: "Settings saved",
      description: "All user settings have been saved.",
      status: "success",
      isClosable: true,
    });
    setSaveDisabled(true);
  };

  const onTest = async () => {
    setIsTesting(true);
    await fetch("/api/proxmox/version", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: userData.api_key,
        pUser: userData.pUser,
        token: userData.token,
      }),
    }).then((res) => {
      if (res.ok) {
        toast({
          title: "Connection established",
          description: "Please save your changes.",
          status: "success",
          isClosable: true,
        });
        setIsTesting(false);
        setSaveDisabled(false);
      } else {
        toast({
          title: "Connection failed",
          description: "Please enter correct proxmox information.",
          status: "error",
          isClosable: true,
        });
        setIsTesting(false);
        setSaveDisabled(true);
      }
    });
  };

  return (
    <>
      <NavBar />
      <Box bg="gray.600" minWidth="100%" minHeight="100vh">
        <Container bg="gray.700" minWidth="60%" minHeight="100vh">
          <HStack gap={9}>
            <VStack gap={2} align="start">
              <Heading pt={3} pb={3}>
                User Settings
              </Heading>
              <InputItem name="Name" value={userData.name} />
              <InputItem
                name="Email"
                value={userData?.email ? userData.email : ""}
              />
              <Box pl={10}>
                <Text>Proxmox user:</Text>
                <Input
                  type="text"
                  placeholder="root@pam"
                  onChange={setPUser}
                  defaultValue={userData.pUser}
                ></Input>
              </Box>
              <Box pl={10}>
                <Text>Proxmox token:</Text>
                <Input
                  type="text"
                  placeholder="MyToken"
                  onChange={setToken}
                  defaultValue={userData.token}
                ></Input>
              </Box>
              <Box pl={10}>
                <Text>Proxmox API Key:</Text>
                <Textarea
                  onChange={setApiKey}
                  defaultValue={userData.api_key}
                ></Textarea>
              </Box>
              <Box pt={3}>
                <Button
                  variant="outline"
                  isDisabled={isSaveDisabled}
                  onClick={onSave}
                >
                  Save changes
                </Button>

                <Button
                  ml={2}
                  isLoading={isTesting}
                  variant="outline"
                  onClick={onTest}
                >
                  Test Connection
                </Button>
              </Box>
            </VStack>
            <Avatar size="2xl" name="test"></Avatar>
          </HStack>
        </Container>
      </Box>
    </>
  );
};

export default User;

const InputItem = ({ name, value }) => {
  return (
    <Box pl={10}>
      <Text>{name}:</Text>
      <Input disabled type="text" defaultValue={value}></Input>
    </Box>
  );
};
