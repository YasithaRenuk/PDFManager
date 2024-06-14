import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { format } from "date-fns";

const PDFcard = (props) => {
  
  const formattedDate = format(new Date(props.createdAt), "MMMM d, yyyy, hh:mm a 'EST'");

  return (
    <Box key={props._id} p={5}>
      <Text fontSize="m" color="gray.500">File Name:</Text>
      <Text fontSize="xl" fontWeight="bold">{props.FileName}</Text>
      <Text fontSize="m" color="gray.500">File Size:</Text>
      <Text fontSize="xl">{props.FileSize}</Text>
      <Text fontSize="m" color="gray.500">File Created Date:</Text>
      <Text fontSize="xl">{formattedDate}</Text>
    </Box>
  );
};

export default PDFcard;
