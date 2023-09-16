import React from 'react';
import { Box, Center, Spinner } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Center h="100vh">
      <Box textAlign="center">
        <Spinner size="xl" color="blue.500" />
      </Box>
    </Center>
  );
};

export default Loading;
