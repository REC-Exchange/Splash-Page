import React, { useContext, useState } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import Papa from 'papaparse';
import { ListingCSV } from '../../../types';
import 'react-datepicker/dist/react-datepicker.css';
import ConfirmCsv from './ConfirmCsv';
import ListingSuccessful from './ListingSuccessful';
import CsvUpload from './CsvUpload';
import InvalidCsv from './InvalidCsv';
import { ListingsContext } from '../../../contexts/listingsContext';

function parseCSV(csvString: string, onError: VoidFunction) {
  const { data, errors } = Papa.parse(csvString, { header: true });
  if (errors.length > 0) {
    console.error('CSV parsing errors:', errors);
    onError();
  }
  return data;
}

const RecListingModal = () => {
  const [page, setPage] = useState<'csvUpload' | 'confirmCSV' | 'listingSuccessful' | 'invalidCSV'>(
    'csvUpload'
  );
  const [csvData, setCSVData] = useState<ListingCSV[]>([]);
  const [listingPrice, setListingPrice] = useState(1);
  const [listingExpirationDate, setListingExpirationDate] = useState(new Date());
  const [listingDescription, setListingDescription] = useState('');
  const { createListingFromCSV } = useContext(ListingsContext);

  const handleFileUpload = (files: File[]) => {
    if (files.length === 1) {
      try {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const csvString = e.target?.result as string;
          const dataArray = parseCSV(csvString, () => setPage('invalidCSV'));
          setCSVData(dataArray as ListingCSV[]);
        };
        reader.readAsText(file);
      } catch (error) {
        console.log('error ', error);
        setPage('invalidCSV');
      }
    } else {
      setPage('invalidCSV');
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const saveListingToDB = () => {
    createListingFromCSV(
      csvData[0],
      listingPrice,
      listingExpirationDate,
      csvData.length,
      listingDescription
    );
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal">
        List a REC
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minH="lg">
          <ModalHeader>Upload you REC CSV</ModalHeader>

          {page === 'csvUpload' && (
            <CsvUpload
              handleFileUpload={handleFileUpload}
              uploadSuccessful={csvData.length > 0}
              onContinue={() => {
                setPage('confirmCSV');
              }}
            />
          )}

          {page === 'invalidCSV' && (
            <InvalidCsv
              onRetryClick={() => {
                setCSVData([]);
                setPage('csvUpload');
              }}
            />
          )}

          {page === 'confirmCSV' && (
            <ConfirmCsv
              {...{
                csvData,
                listingPrice,
                setListingPrice,
                listingExpirationDate,
                setListingExpirationDate,
                listingDescription,
                setListingDescription
              }}
              onContinue={() => {
                saveListingToDB();
                setPage('listingSuccessful');
              }}
            />
          )}

          {page === 'listingSuccessful' && (
            <ListingSuccessful
              onContinue={() => {
                onClose();
              }}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RecListingModal;
