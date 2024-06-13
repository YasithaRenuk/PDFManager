import React from 'react'
import { Box, Flex, Button, Heading } from '@chakra-ui/react'

export default function Navbar() {
  return (
    <Box bg="gray.300" p={4}>
      <Flex justify="space-between" align="center">
      <Heading as="h1" size="xl">
          Dashboard
      </Heading>
        <Flex>
        <Button colorScheme="blue" mr={4}>
            Show all PDF
          </Button>
          <Button colorScheme="blue" mr={4}>
            Add PDF file
          </Button>
          <Button colorScheme="red">
            LogOut
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}
