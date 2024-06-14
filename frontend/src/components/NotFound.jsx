import React from "react";
import { Center, Stack, Heading, Text } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Center h="100vh" bg="purple.200">
      <Stack textAlign="center">
        <Heading as="h1" size="2xl" mb="4">
          404 - Not Found
        </Heading>
        <Text fontSize="xl" color="gray.600">
          The page you are looking for does not exist.
        </Text>
      </Stack>
    </Center>
  );
};

export default NotFound;
