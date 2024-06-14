import React, { useEffect, useContext, useState } from "react";
import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const PDFViewer = () => {
  const toast = useToast();
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [pdfURL, setPdfURL] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        if (user && user.token) {
          const response = await axios.get(
            `http://localhost:8070/PDFmanagement/download/${id}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
              responseType: "blob",
            }
          );

          const pdfBlob = new Blob([response.data], {
            type: "application/pdf",
          });
          const url = URL.createObjectURL(pdfBlob);
          setPdfURL(url);
          setIsLoading(false);
        } else {
          throw new Error("No user token found");
        }
      } catch (error) {
        console.error("Error fetching PDF:", error);
        setError(error.response?.data?.message || "Failed to load PDF");
        setIsLoading(false);
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to load PDF",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    if (id) {
      fetchPDF();
    }

    // Clean up the URL object when component unmounts
    return () => {
      if (pdfURL) {
        URL.revokeObjectURL(pdfURL);
      }
    };
  }, [id, user, toast]);

  const handleDownload = () => {
    // Trigger download of the PDF
    const link = document.createElement("a");
    link.href = pdfURL;
    link.download = `document_${id}.pdf`; // Specify the file name when downloading
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>Error: {error}</Box>;
  }

  return (
    <Flex direction="column" height="100vh">
      <Box flex="1" position="relative">
        <iframe
          src={pdfURL}
          title="PDF Viewer"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </Box>
      <Box p="4" bg="gray.100" textAlign="center">
        <Button
          colorScheme="blue"
          onClick={handleDownload}
          isDisabled={!pdfURL}
        >
          Download
        </Button>
      </Box>
    </Flex>
  );
};

export default PDFViewer;
