import { Box, Button, Center, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <Flex direction="column" height="full">
        <Box
          bgImage="https://images.unsplash.com/photo-1556634202-129a046351c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          bgPosition="center"
          height="75vh"
          bgSize="cover">
          <Center height="full" flexDirection="column">
            <HStack spacing={4} fontSize={64} fontWeight="semibold">
              <Text color="primary.200">J'G</Text>
              <Text color="white">Car Rental</Text>
            </HStack>
            <Button
              bgColor="primary.200"
              size="lg"
              onClick={() => navigate("/car")}
              _hover={{ bgColor: "" }}
              _active={{ bgColor: "" }}>
              Rent a Car
            </Button>
          </Center>
        </Box>
        <Box bgColor="white" height="15vh">
          <Center height="full">
            <HStack fontSize={48} spacing={4}>
              <Text>Find the Best</Text>
              <Text color="primary.200">Car for You</Text>
            </HStack>
          </Center>
        </Box>
      </Flex>
    </>
  );
};
