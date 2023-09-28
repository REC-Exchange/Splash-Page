import React, { FC } from 'react';
import { Button, ModalBody, Stack, Table, Td, Text, Th, Tr } from '@chakra-ui/react';
import { Listing } from '../../../types';
import dayjs from 'dayjs';
import numeral from 'numeral';

const ListingDetails: FC<{
  listing: Listing;
  onContinue: VoidFunction;
}> = ({ listing, onContinue }) => {
  const expirationDate = dayjs
    .unix(listing.expirationDate as unknown as number)
    .format('MMM D, YYYY -  h:mm A');

  const pricePerMwh = listing.price / listing.quantity;
  return (
    <ModalBody w="fit-content" p={6}>
      <Stack spacing={2}>
        <Text>{listing.description}</Text>
        <Table>
          <Tr>
            <Th>Generator</Th>
            <Td textAlign="right">{listing.certificate.generator.name}</Td>
          </Tr>
          <Tr>
            <Th>Renewable Sources</Th>
            <Td textAlign="right">
              {listing.certificate.generator.fuels.map((fuel) => `${fuel.type} `)}
            </Td>
          </Tr>
          <Tr>
            <Th>Annual MWH Production</Th>
            <Td textAlign="right">
              {numeral(listing.certificate.generator.maxAnnualEnergy).format('0,00')} MWh
            </Td>
          </Tr>
          <Tr>
            <Th>State</Th>
            <Td textAlign="right">{listing.certificate.generator.state}</Td>
          </Tr>
          <Tr>
            <Th>County</Th>
            <Td textAlign="right">{listing.certificate.generator.county}</Td>
          </Tr>
        </Table>
        <Table>
          <Tr>
            <Th>Power Type</Th>
            <Td textAlign="right">{listing.certificate.generator.fuels[0].type}</Td>
          </Tr>
          <Tr>
            <Th>Price per MWh</Th>
            <Td textAlign="right">{numeral(pricePerMwh).format('$0,0.00')}</Td>
          </Tr>
          <Tr>
            <Th>Total Bundle Size</Th>
            <Td textAlign="right">{listing.quantity}</Td>
          </Tr>
          <Tr>
            <Th>Total Price</Th>
            <Td textAlign="right">{numeral(listing.price).format('$0,0.00')}</Td>
          </Tr>
          <Tr>
            <Th>REC Expiration</Th>
            <Td textAlign="right">{expirationDate}</Td>
          </Tr>
        </Table>
        <Button colorScheme="teal" onClick={onContinue}>
          Continue
        </Button>
      </Stack>
    </ModalBody>
  );
};

export default ListingDetails;
