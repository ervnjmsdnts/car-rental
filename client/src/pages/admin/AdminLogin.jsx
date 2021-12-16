import { Box, Button, Center, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      navigate("/admin/dashboard");
    }
  };

  return (
    <Center height="100vh">
      <Box>
        <VStack as="form" color="white" onSubmit={onSubmit}>
          <Input
            size="lg"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            size="lg"
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            size="lg"
            type="submit"
            bgColor="primary.200"
            color="text.200">
            Log in
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};
