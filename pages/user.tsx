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
} from "@chakra-ui/react";
import NavBar from "../components/nav/NavBar";

const User = () => {
  return (
    <div>
      <NavBar />
      <Box bg="gray.600" minWidth="100%" minHeight="100vh">
        <Container bg="gray.700" minWidth="60%" minHeight="100vh">
          <HStack gap={9}>
            <VStack gap={2} align="start">
              <Heading pt={3} pb={3}>
                User Settings
              </Heading>
              <InputItem name="Name" />
              <InputItem name="Email" />
              <Box pl={10}>
                <Text>Proxmox API Key:</Text>
                <Textarea></Textarea>
              </Box>
              <Box pt={3}>
                <Button variant="outline">Save changes</Button>
              </Box>
            </VStack>
            <Avatar size="2xl" name="test"></Avatar>
          </HStack>
        </Container>
      </Box>
    </div>
  );
};

export default User;

const InputItem = ({ name }) => {
  return (
    <Box pl={10}>
      <Text>{name}:</Text>
      <Input type="text"></Input>
    </Box>
  );
};
