import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Center, Stack, Heading, Text, Input, Button } from '@chakra-ui/react';
import { FaEnvelope, FaLock } from 'react-icons/fa';

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    Email: '',
    Password: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // Clear error message when user starts typing in the field
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const { Email, Password } = data;
    let formErrors = {};

    // Validate form fields before submitting
    if (!Email.trim()) {
      formErrors.Email = 'Email is required';
    }
    if (!Password.trim()) {
      formErrors.Password = 'Password is required';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post('/auth/login', {
        Email,
        Password,
      });
      const responseData = response.data;
      if (responseData.STATUS === 'SUCCESS') {
        setData({ Email: '', Password: '' });
        toast.success('Login successful!');
        // Navigate to dashboard after successful login
        navigate('/dashboard');
      } else {
        toast.error(responseData.MESSAGE);
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        const { data } = error.response;
        if (Array.isArray(data)) {
          // Handle validation errors
          data.forEach((errorItem) => {
            toast.error(errorItem.message);
          });
        } else {
          // Handle other types of errors
          toast.error(data.MESSAGE);
        }
      } else {
        toast.error('Network error. Please check your internet connection.');
      }
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
            {errors.Password && <Text color="red.500">{errors.Password}</Text>}
            <Button
              size="lg"
              colorScheme="purple"
              type="submit"
            >
              Login
            </Button>
          </Stack>
        </form>
        <Stack justify="center" color="gray.600" spacing="3">
          <Text textAlign="center">
            <span>Don't have an account?</span>
          </Text>
          <Button
            colorScheme="purple"
            variant="link"
            onClick={() => navigate('/register')} // Navigate to '/register' route
          >
            Sign Up
          </Button>
        </Stack>
      </Stack>
    </Center>
  );
}
