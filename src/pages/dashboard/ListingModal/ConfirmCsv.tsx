import React, { FC } from 'react';
import {
  Icon,
  Button,
  Input,
  ModalBody,
  Stack,
  Table,
  Td,
  Textarea,
  Th,
  Tr,
  Flex,
  InputLeftElement,
  InputGroup
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { ListingCSV } from '../../../types';
import { AiFillEdit } from 'react-icons/all';
import dayjs from 'dayjs';
import numeral from 'numeral';

const ConfirmCsv: FC<{
  csvData: ListingCSV[];
  listingPrice: number;
  setListingPrice: (price: number) => void;
  listingExpirationDate: Date;
  setListingExpirationDate: (date: Date) => void;
  listingDescription: string;
  setListingDescription: (description: string) => void;
  onContinue: VoidFunction;
}> = ({
  csvData,
  listingPrice,
  setListingPrice,
  listingExpirationDate,
  setListingExpirationDate,
  listingDescription,
  setListingDescription,
  onContinue
}) => {
  const expirationDate = dayjs(csvData[0].certificate_expiration_date).format(
    'MMM D, YYYY -  h:mm A'
  );

  return (
    <ModalBody w="fit-content">
      <Stack spacing={2} py={4}>
        <Table>
          <Tr>
            <Th>Generator</Th>
            <Td textAlign="right">{csvData[0].generator_name}</Td>
          </Tr>
          <Tr>
            <Th>Power Type</Th>
            <Td textAlign="right">{csvData[0].certificate_fuel}</Td>
          </Tr>
          <Tr>
            <Th>Total Bundle Size</Th>
            <Td textAlign="right">{csvData.length} MWh</Td>
          </Tr>
          <Tr>
            <Th>State</Th>
            <Td textAlign="right">{csvData[0].generator_state}</Td>
          </Tr>
          <Tr>
            <Th>REC Expiration</Th>
            <Td textAlign="right">{expirationDate}</Td>
          </Tr>
        </Table>
        <Table>
          <Tr>
            <Th>Listing Description</Th>
            <Td textAlign="right">
              <Textarea
                placeholder="Enter a description for this listing"
                value={listingDescription}
                onChange={(e) => {
                  setListingDescription(e.target.value);
                }}
              />
            </Td>
          </Tr>
          <Tr>
            <Th>Listing Expiration</Th>
            <Td>
              <Flex justifyContent="flex-end">
                <DatePicker
                  selected={listingExpirationDate}
                  onChange={(date: Date) => setListingExpirationDate(date)}
                />
                <Icon as={AiFillEdit} />
              </Flex>
            </Td>
          </Tr>
          <Tr>
            <Th>Bundle Price</Th>
            <Td>
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
                  $
                </InputLeftElement>
                <Input
                  placeholder="Enter amount"
                  type="number"
                  value={listingPrice}
                  onChange={(e) => {
                    setListingPrice(e.target.value as unknown as number);
                  }}
                />
              </InputGroup>
            </Td>
          </Tr>
          <Tr>
            <Th>Price per MWh</Th>
            <Td textAlign="right">
              {numeral(Number(listingPrice) / Number(csvData.length)).format('$0,00.00')} MWh
            </Td>
          </Tr>
        </Table>
        <Button onClick={onContinue} colorScheme="teal">
          Complete Listing
        </Button>
      </Stack>
    </ModalBody>
  );
};

export default ConfirmCsv;
