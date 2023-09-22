import React, { FC } from 'react';
import { Image, Button, ModalBody, Text } from '@chakra-ui/react';
import confirmPurchase from '../../../assets/confirm-purchase.png';

const PurchaseConfirmation: FC<{
  onContinue: VoidFunction;
}> = ({ onContinue }) => {
  return (
    <ModalBody w="fit-content" py={6}>
      <Text size="lg" fontWeight="bold" textAlign="center">
        You are about to commit to purchase a REC bundle
      </Text>
      <Image src={confirmPurchase} />
      <Button width="full" colorScheme="teal" onClick={onContinue}>
        Commit to purchase
      </Button>
    </ModalBody>
  );
};

export default PurchaseConfirmation;
