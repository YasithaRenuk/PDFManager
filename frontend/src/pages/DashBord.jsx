import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Grid, GridItem, Box, Heading } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';  // Import Outlet from react-router-dom
import Navbar from '../components/Navbar';

export default function DashBord() {
    const { user } = useContext(UserContext);

    return (
        <Grid
            h="100vh"
            templateRows="auto 1fr"
            templateColumns="1fr"  
            gap={4}
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
