import React, { useContext } from 'react';
import { Box, Flex, Button, Heading } from '@chakra-ui/react';
import { UserContext } from '../../context/userContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logout successful!');
    navigate('/login')
  };

  const handleShowallPDF = () => {
    navigate('./allPDFs')
  };

  return (
    <Box bg="gray.300" p={4}>
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="xl">
          Dashboard
        </Heading>
        <Flex>
          <Button colorScheme="blue" mr={4} onClick={handleShowallPDF}>
            Show all PDF
          </Button>
          <Button colorScheme="blue" mr={4}>
            Add PDF file
          </Button>
          <Button colorScheme="red" onClick={handleLogout}>
            LogOut
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
