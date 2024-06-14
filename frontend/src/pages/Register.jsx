import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Center,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    Name: "",
    Email: "",
    usertype: "user", // Default user type
    Password: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const { Name, Email, Password, usertype } = data;
    let formErrors = {};

    // Validate form fields before submitting
    if (!Name.trim()) {
      formErrors.Name = "Name is required";
    }
    if (!Email.trim()) {
      formErrors.Email = "Email is required";
    }
    if (!Password.trim()) {
      formErrors.Password = "Password is required";
    }
    if (Password.length < 6) {
      formErrors.Password = "Password should be at least 6 characters long";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post("/auth/register", {
        Name,
        Email,
        usertype,
        Password,
      });
      const responseData = response.data;
      if (responseData.STATUS === "SUCCESS") {
        setData({ Name: "", Email: "", Password: "", usertype: "user" });
        toast.success("Registration successful. Welcome!");
        navigate("/login");
      } else {
        toast.error(responseData.MESSAGE);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response) {
        const { data } = error.response;
        if (data.STATUS === "FAILURE") {
          toast.error(data.MESSAGE);
        } else {
          toast.error(
            "An error occurred during registration. Please try again."
          );
        }
      } else {
        toast.error("Network error. Please check your internet connection.");
      }
    }
  };

  return (
    <Center h="100vh" bg="purple.200">
      <Stack boxShadow="md" bg="whiteAlpha.900" p="20" rounded="md">
        <Heading as="h1">Register</Heading>
        <Text fontSize="lg" color="gray.600">
          Please fill in the following details to register.
        </Text>
        <form onSubmit={registerUser}>
          <Stack my="3" spacing="6">
            <Input
              name="Name"
              type="text"
              placeholder="Enter your name"
              value={data.Name}
              onChange={handleInputChange}
              isInvalid={!!errors.Name}
            />
            {errors.Name && <Text color="red.500">{errors.Name}</Text>}
            <Input
              name="Email"
              type="email"
              placeholder="Enter your email"
              value={data.Email}
              onChange={handleInputChange}
              isInvalid={!!errors.Email}
            />
            {errors.Email && <Text color="red.500">{errors.Email}</Text>}
            <Input
              name="Password"
              type="password"
              placeholder="Enter your password"
              value={data.Password}
              onChange={handleInputChange}
              isInvalid={!!errors.Password}
            />
            {errors.Password && <Text color="red.500">{errors.Password}</Text>}
            <RadioGroup
              defaultValue="user"
              onChange={(value) => setData({ ...data, usertype: value })}
            >
              <Stack direction="row">
                <Radio value="user">User</Radio>
                <Radio value="admin">Admin</Radio>
              </Stack>
            </RadioGroup>
            <Button size="lg" colorScheme="purple" type="submit">
              Register
            </Button>
          </Stack>
        </form>
        <Text color="gray.600" textAlign="center">
          Already have an account?{" "}
          <Button
            colorScheme="purple"
            variant="link"
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
        </Text>
      </Stack>
    </Center>
  );
}
