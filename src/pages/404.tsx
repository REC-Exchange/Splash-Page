import React from 'react';
import { Box, Center, Heading, Text } from '@chakra-ui/react';

const NotFound = () => {
  return (
    <Center h="100vh">
      <Box textAlign="center">
        <Heading as="h1" fontSize="4xl" mb={4}>
          404 - Not Found
        </Heading>
        <Text fontSize="lg">The page you are looking for does not exist.</Text>
      </Box>
    </Center>
  );
};

export default NotFound;
