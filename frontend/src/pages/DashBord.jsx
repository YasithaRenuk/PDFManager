import React from 'react';
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';
import { Grid, GridItem, Box, Heading } from '@chakra-ui/react';

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
                <Box p={4} h="100%" boxShadow="md">  {/* Add boxShadow here */}
                    <Heading as="h1" size="xl">
                        Dashboard
                    </Heading>
                    {/* Additional dashboard content */}
                </Box>
            </GridItem>
            <GridItem bg="gray.100" colSpan={1} rowSpan={1}>
                <Box p={4} h="100%" boxShadow="md">  {/* Add boxShadow here */}
                    <Heading as="h2" size="lg">
                        {!!user && (
                            <Box mt={4}>
                                <Heading as="h2" size="md">
                                    Hi {user.Email}!
                                </Heading>
                                {/* Additional dashboard content */}
                            </Box>
                        )}
                    </Heading>
                </Box>
            </GridItem>
        </Grid>
    );
}
  