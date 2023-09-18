import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ModalBody,
  Stack
} from '@chakra-ui/react';
import React, { FC } from 'react';

const ListingSuccessful: FC<{ onContinue: VoidFunction }> = ({ onContinue }) => {
  return (
    <ModalBody>
      <Stack spacing={2}>
        <Alert variant="Success">
          <AlertIcon />
          <Box>
            <AlertTitle>Listing Successful</AlertTitle>
            <AlertDescription>Lorem ipsum</AlertDescription>
          </Box>
        </Alert>
        <Button onClick={onContinue}>My Listings Dashboard</Button>
      </Stack>
    </ModalBody>
  );
};
export default ListingSuccessful;
