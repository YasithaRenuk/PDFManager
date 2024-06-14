import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Center, Stack, Heading, Text, Input, Button } from '@chakra-ui/react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { UserContext } from '../../context/userContext';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [data, setData] = useState({
    Email: '',
    Password: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const { Email, Password } = data;

    try {
      const response = await axios.post('/auth/login', { Email, Password });
      const responseData = response.data;

      if (responseData.STATUS === 'SUCCESS') {
        const { token, Email, usertype } = responseData.DATA;
        setUser({ token, Email, usertype });
        setData({ Email: '', Password: '' });
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error(responseData.MESSAGE);
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Failed to log in. Please try again.');
    }
  };

  return (
    <Center h="100vh" bg="purple.200">
      <Stack boxShadow="md" bg="whiteAlpha.900" p="20" rounded="md">
        <Heading as="h1">Login</Heading>
        <Text fontSize="lg" color="gray.600">
          Please log in with the data you entered during registration.
        </Text>
        <form onSubmit={loginUser}>
          <Stack my="3" spacing="6">
            <Input
              name="Email"
              type="email"
              placeholder="Enter your email"
              value={data.Email}
              onChange={handleInputChange}
              isInvalid={!!errors.Email}
              leftIcon={<FaEnvelope />}
            />
            {/* Display error message if Email field is invalid */}
            {errors.Email && <Text color="red.500">{errors.Email}</Text>}
            <Input
              name="Password"
              type="password"
              placeholder="Enter your password"
              value={data.Password}
              onChange={handleInputChange}
              isInvalid={!!errors.Password}
              leftIcon={<FaLock />}
            />
            {/* Display error message if Password field is invalid */}
            {errors.Password && <Text color="red.500">{errors.Password}</Text>}
            <Button size="lg" colorScheme="purple" type="submit">
              Login
            </Button>
          </Stack>
        </form>
        <Text color="gray.600" textAlign="center">
          Dont'have account?{' '}
          <Button
            colorScheme="purple"
            variant="link"
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </Text>
      </Stack>
    </Center>
  );
}
