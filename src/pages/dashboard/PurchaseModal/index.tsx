import React, { FC, useContext, useState } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import Papa from 'papaparse';
import { Listing, ListingCSV } from '../../../types';
import 'react-datepicker/dist/react-datepicker.css';
import { ListingsContext } from '../../../contexts/listingsContext';
import ListingDetails from './ListingDetails';
import PurchaseConfirmation from './PurchaseConfirmation';
import PurchaseSuccessful from './PurchaseSuccessful';

const PurchaseModal: FC<{ listing: Listing }> = ({ listing }) => {
  const [page, setPage] = useState<
    'listingDetails' | 'purchaseConfirmation' | 'purchaseSuccessful'
  >('listingDetails');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { initializeListingPurchase } = useContext(ListingsContext);

  const confirmPurchase = async () => {
    await initializeListingPurchase(listing);
    setPage('purchaseSuccessful');
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal">
        Purchase
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minH="lg">
          <ModalHeader>Purchase a REC Bundle</ModalHeader>

          {page === 'listingDetails' && (
            <ListingDetails listing={listing} onContinue={() => setPage('purchaseConfirmation')} />
          )}

          {page === 'purchaseConfirmation' && <PurchaseConfirmation onContinue={confirmPurchase} />}

          {page === 'purchaseSuccessful' && <PurchaseSuccessful />}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PurchaseModal;
