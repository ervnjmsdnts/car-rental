import { Button, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import React from "react";
import { UserConsumer } from "../context/userContext";

export const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout } = UserConsumer();

  const handleLogout = async () => {
    logout().then(() => {
      localStorage.removeItem("token");
      navigate("/login");
      window.location.reload();
    });
  };

  return (
    <Flex
      height="10vh"
      bgColor="black"
      color="white"
      paddingX={16}
      paddingY={8}
      justifyContent="space-between">
      <HStack>
        <NavItem to="/" style={{ textDecoration: "none" }}>
          <HStack fontSize={32} fontWeight="semibold">
            <Text color="primary.200">J'G</Text>
            <Text>Car Rental</Text>
          </HStack>
        </NavItem>
      </HStack>
      <HStack fontSize={20} spacing={8}>
        <NavItem to="/car">Cars</NavItem>
        <NavItem to={`/user_rental/${user.id}`}>My Rentals</NavItem>
        <Button
          onClick={handleLogout}
          bgColor="primary.200"
          _hover={{ bgColor: "" }}
          _active={{ bgColor: "" }}>
          Logout
        </Button>
      </HStack>
    </Flex>
  );
};

const NavItem = ({ to, children, ...props }) => {
  return (
    <Link as={RouterLink} to={to} {...props}>
      {children}
    </Link>
  );
};
