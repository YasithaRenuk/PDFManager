import React, { useState, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { UserContext } from "../../context/userContext";

const AddPDFModal = ({ isOpen, onClose }) => {
  const { user } = useContext(UserContext);
  const [pdfFile, setPdfFile] = useState(null);
  const toast = useToast();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Validate file type
    if (selectedFile && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
      toast({
        title: "Error",
        description: "Please select a PDF file.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Validate file size
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      // 5MB in bytes
      toast({
        title: "Error",
        description: "File size exceeds 5MB limit.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setPdfFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile) {
      setError("Please select a PDF file.");
      return;
    }

    // Prepare form data for API call
    const formData = new FormData();
    formData.append("file", pdfFile); // 'file' is the key for the PDF file data

    try {
      // Make API call to http://localhost:8070/PDFmanagement/singalfile
      const response = await axios.post(
        "http://localhost:8070/PDFmanagement/singalfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Check if the response indicates success
      if (response.status === 200) {
        // Close the modal after successful submission
        onClose();

        // Show success toast
        toast({
          title: "File Uploaded",
          description: "PDF file uploaded successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Handle other server responses if needed
        toast({
          title: "Error",
          description: "Failed to upload PDF file. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Handle API call errors
      console.error("Error uploading file:", error);
      toast({
        title: "Error",
        description: "Failed to upload PDF file. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add PDF File</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Select PDF File:</FormLabel>
              <Input type="file" accept=".pdf" onChange={handleFileChange} />
              <small>Max file size: 5MB</small>
            </FormControl>
            <Button mt={4} colorScheme="blue" type="submit">
              Upload File
            </Button>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPDFModal;
