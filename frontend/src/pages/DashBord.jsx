import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { Grid, GridItem, Box, Heading } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DashBord() {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  // Redirect to login page if user is not logged in and loading is complete
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Render a loading spinner or some placeholder while checking the user state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      h="100vh"
      templateRows="auto 1fr"
      templateColumns="1fr"
      gap={1}
      p={4}
      bg="purple.200"
    >
      <GridItem bg="gray.300" colSpan={1} rowSpan={1}>
        <Box p={4} h="100%" boxShadow="md">
          <Heading as="h1" size="xl">
            <Navbar />
          </Heading>
        </Box>
      </GridItem>
      <GridItem bg="gray.100" colSpan={1} rowSpan={1}>
        <Box p={4} h="100%" boxShadow="md">
          <Heading as="h2" size="lg">
            <Outlet /> {/* Outlet for nested routes */}
          </Heading>
        </Box>
      </GridItem>
    </Grid>
  );
}
