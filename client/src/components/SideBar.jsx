import { Avatar, Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const SideBar = () => {
  const date = new Date();
  const navigate = useNavigate();
  return (
    <Box
      height="100vh"
      width={72}
      bgColor="text.200"
      padding={8}
      position="sticky"
      top={0}>
      <Flex flexDirection="column" height="full">
        <Flex flexDirection="column" alignItems="center" flexGrow={2}>
          <Flex height={16} alignItems="center">
            <Avatar />
            <Flex marginLeft={4} flexDirection="column" color="white">
              <Text>Admin</Text>
              <Text>{date.toDateString()}</Text>
            </Flex>
          </Flex>
          <Divider />
        </Flex>
        <Flex justifyContent="center">
          <Button size="lg" bgColor="primary.200" onClick={() => navigate("/")}>
            Log out
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
