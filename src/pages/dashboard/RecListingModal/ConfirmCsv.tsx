import React, { FC } from 'react';
import { Button, Input, ModalBody, Stack, Table, Td, Textarea, Th, Tr } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { ListingCSV } from '../../../types';

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
  return (
    <ModalBody w="fit-content">
      <Stack spacing={2}>
        <Table>
          <Tr>
            <Th>Generator</Th>
            <Td>{csvData[0].generator_name}</Td>
          </Tr>
          <Tr>
            <Th>Power Type</Th>
            <Td>{csvData[0].certificate_fuel}</Td>
          </Tr>
          <Tr>
            <Th>Total Bundle Size</Th>
            <Td>{csvData.length} MWh</Td>
          </Tr>
          <Tr>
            <Th>State</Th>
            <Td>{csvData[0].generator_state}</Td>
          </Tr>
          <Tr>
            <Th>REC Expiration</Th>
            <Td>{csvData[0].certificate_expiration_date as unknown as string}</Td>
          </Tr>
        </Table>
        <Table>
          <Tr>
            <Th>Listing Description</Th>
            <Td>
              <Textarea
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
              <DatePicker
                selected={listingExpirationDate}
                onChange={(date: Date) => setListingExpirationDate(date)}
              />
            </Td>
          </Tr>
          <Tr>
            <Th>Bundle Price</Th>
            <Td>
              <Input
                type="number"
                value={listingPrice}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value > 0) {
                    setListingPrice(Number(e.target.value));
                  }
                }}
              />
            </Td>
          </Tr>
          <Tr>
            <Th>Price per MWh</Th>
            <Td>${Number(listingPrice) / Number(csvData.length)} MWh</Td>
          </Tr>
        </Table>
        <Button onClick={onContinue}>Continue</Button>
      </Stack>
    </ModalBody>
  );
};

export default ConfirmCsv;
