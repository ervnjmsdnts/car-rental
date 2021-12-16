import {
  Box,
  Flex,
  VStack,
  Text,
  HStack,
  Input,
  Button,
  Link,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import qs from "qs";

import axios from "axios";
import { UserConsumer } from "../context/userContext";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = UserConsumer();

  useEffect(() => {
    if (localStorage.getItem("isAuthed")) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const userLogin = {
      username: email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/jwt/login",
        qs.stringify(userLogin),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (response && response.data) {
        login().then(() => {
          localStorage.setItem("token", response.data.access_token);
          navigate("/");
          window.location.reload();
        });
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
        <VStack as="form" width={500} onSubmit={onSubmit}>
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
          <Button
            bgColor="primary.200"
            color="text.100"
            width={200}
            size="lg"
            type="submit"
            _active={{ bgColor: "" }}
            _hover={{ bgColor: "" }}>
            Login
          </Button>
          <HStack fontSize={24}>
            <Text>Don't have an account? </Text>
            <Link as={RouterLink} to="/register" fontWeight="semibold">
              Sign Up
            </Link>
          </HStack>
        </VStack>
        <div className="login-circle"></div>
      </Box>
      <Image src="images/beetle.jpg" />
    </Flex>
  );
};
