import React, { useContext, useEffect, useState } from 'react';
import { Box, Heading, Text, Stack, StackDivider } from '@chakra-ui/react';
import { UserContext } from '../../context/userContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import PDFcard from "./PDFCard"

export default function AllPDF() {
    const { user } = useContext(UserContext);
    const [pdfs, setPdfs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPDFs = async () => {
            if (user && user.token && user.usertype) {
                if(user.usertype=="admin"){
                    try {
                        const response = await axios.get('http://localhost:8070/PDFmanagement/getallPDFAdmin', {
                            headers: {
                                'Authorization': `Bearer ${user.token}`
                            }
                        });
                        setPdfs(response.data.DATA); // Assuming DATA contains the array of PDFs
                    } catch (error) {
                        toast.error('Failed to fetch PDFs');
                        console.error('Error fetching PDFs:', error);
                    } finally {
                        setIsLoading(false);
                    }
                }else{
                    try {
                        const response = await axios.get('http://localhost:8070/PDFmanagement/getallPDFbyEmail', {
                            headers: {
                                'Authorization': `Bearer ${user.token}`
                            }
                        });
                        setPdfs(response.data.DATA); // Assuming DATA contains the array of PDFs
                    } catch (error) {
                        toast.error('Failed to fetch PDFs');
                        console.error('Error fetching PDFs:', error);
                    } finally {
                        setIsLoading(false);
                    }
                }
            }
        };

        fetchPDFs();
    }, [user, navigate]);

    return (
        <Box p={5}>
            <Heading size="md" mb={4}>All PDFs</Heading>
            {isLoading ? (
                <Text>Loading...</Text>
            ) : pdfs.length > 0 ? (
                <Stack spacing={4} divider={<StackDivider />} mb={4}>
                    {pdfs.map((pdf, index) => (
                        <Box key={pdf._id} p={5} shadow="md" borderWidth="1px">
                            <PDFcard _id ={pdf._id} FileName = {pdf.FileName} FileSize={pdf.FileSize} createdAt={pdf.createdAt}/>
                        </Box>
                    ))}
                </Stack>
            ) : (
                <Text>No PDFs found</Text>
            )}
        </Box>
    );
}
