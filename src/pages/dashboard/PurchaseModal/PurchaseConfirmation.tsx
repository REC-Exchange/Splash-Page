import React, { FC } from 'react';
import { Box, Button, ModalBody, Text } from '@chakra-ui/react';
import { ListingCSV } from '../../../types';

const PurchaseConfirmation: FC<{
  onContinue: VoidFunction;
}> = ({ onContinue }) => {
  return (
    <ModalBody w="fit-content">
      <Text size="lg">Confirm Commitment</Text>
      <Box>lorem</Box>
      <Button onClick={onContinue}>Commit to purchase</Button>
    </ModalBody>
  );
};

export default PurchaseConfirmation;
