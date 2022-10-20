import { MouseEventHandler, useState } from "react";
import { VscChromeClose, VscMenu } from "react-icons/vsc";

import NextLink from "next/link";
import {
  Box,
  Link,
  Text,
  Stack,
  Tooltip,
  Flex,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import Logo from "./Logo";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo
        w="100px"
        color={["white", "white", "primary.500", "primary.500"]}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

type MenuToggleProps = {
  toggle: MouseEventHandler;
  isOpen: boolean;
};

const MenuToggle = ({ toggle, isOpen }: MenuToggleProps) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <VscChromeClose /> : <VscMenu />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <NextLink href={to} passHref>
      <Link>
        <Flex display="block" {...rest}>
          {children}
        </Flex>
      </Link>
    </NextLink>
  );
};

const MenuLinks = ({ isOpen }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/App">Canvas</MenuItem>
        <MenuItem to="/diagrams">My Diagrams</MenuItem>
        <MenuItem to="/user" isLast>
          <Tooltip label="test">
            <Avatar name="test" size="md"></Avatar>
          </Tooltip>
        </MenuItem>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={0}
      p={4}
      bg="gray.800"
      color={["white", "white", "primary.700", "primary.700"]}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;
