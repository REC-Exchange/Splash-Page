import React, { FC } from 'react';
import { Image, Button, ModalBody, Text } from '@chakra-ui/react';
import confirmPurchase from '../../../assets/confirm-purchase.png';

const PurchaseSuccessful: FC<{
  onClose: VoidFunction;
}> = ({ onClose }) => {
  return (
    <ModalBody w="fit-content" py={6}>
      <Text size="lg" fontWeight="bold" textAlign="center">
        Purchase Submitted!
      </Text>
      <Text textAlign="center">
        The seller has been contacted and will approve your purchase shortly.
      </Text>
      <Image src={confirmPurchase} />
      <Button width="full" colorScheme="teal" onClick={onClose}>
        Close
      </Button>
    </ModalBody>
  );
};

export default PurchaseSuccessful;
