import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  VStack,
  Text,
  Link,
  Image,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const userRegister = {
      email,
      password,
      confirmPassword,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register",
        userRegister,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex height="100vh" overflow="hidden">
      <Box bgColor="white" flex={1} padding={20} position="relative">
        <VStack alignItems="start">
          <Text fontSize={48}>CAR RENTAL SYSTEM</Text>
          <HStack spacing={4} fontSize={120} fontWeight="bold">
            <Text color="primary.200">J'G</Text>
            <Text>CAR RENTAL</Text>
          </HStack>
        </VStack>
        <VStack as="form" onSubmit={onSubmit} width={500}>
          <Input
            bgColor="primary.100"
            placeholder="Email Address"
            size="lg"
            onChange={(e) => setEmail(e.target.value)}
            _placeholder={{ color: "text.100" }}
            color="text.200"
          />
          <Input
            bgColor="primary.100"
            placeholder="Password"
            type="password"
            size="lg"
            onChange={(e) => setPassword(e.target.value)}
            _placeholder={{ color: "text.100" }}
            color="text.200"
          />
          <Input
            bgColor="primary.100"
            placeholder="Confirm Password"
            type="password"
            size="lg"
            onChange={(e) => setConfirmPassword(e.target.value)}
            _placeholder={{ color: "text.100" }}
            color="text.200"
          />
          <Button
            type="submit"
            bgColor="primary.200"
            color="text.100"
            width={200}
            size="lg"
            _active={{ bgColor: "" }}
            _hover={{ bgColor: "" }}>
            Sign Up
          </Button>
          <HStack fontSize={24}>
            <Text>Have an account? </Text>
            <Link as={RouterLink} to="/login" fontWeight="semibold">
              Login
            </Link>
          </HStack>
        </VStack>
        <div className="login-circle"></div>
      </Box>
      <Image src="images/beetle.jpg" />
    </Flex>
  );
};
