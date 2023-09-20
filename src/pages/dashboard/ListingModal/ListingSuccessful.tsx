import { Button, ModalBody, Stack, Image } from '@chakra-ui/react';
import listingSuccess from '../../../assets/listing-success.png';
import React, { FC } from 'react';

const ListingSuccessful: FC<{ onContinue: VoidFunction }> = ({ onContinue }) => {
  return (
    <ModalBody py={6}>
      <Stack spacing={2}>
        <Image src={listingSuccess} />
        <Button colorScheme="teal" onClick={onContinue}>
          View listing
        </Button>
      </Stack>
    </ModalBody>
  );
};
export default ListingSuccessful;
