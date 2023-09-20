import React, { FC } from 'react';
import { Button, ModalBody, Stack, Table, Td, Text, Th, Tr } from '@chakra-ui/react';
import { Listing } from '../../../types';

const ListingDetails: FC<{
  listing: Listing;
  onContinue: VoidFunction;
}> = ({ listing, onContinue }) => {
  return (
    <ModalBody w="fit-content">
      <Stack spacing={2}>
        <Text>{listing.description}</Text>
        <Table>
          <Tr>
            <Th>Generator</Th>
            <Td>{listing.certificate.generator.name}</Td>
          </Tr>
          <Tr>
            <Th>Renewable Sources</Th>
            <Td>{listing.certificate.generator.fuels.map((fuel) => `${fuel.type}, `)}</Td>
          </Tr>
          <Tr>
            <Th>Annual MWH Production</Th>
            <Td>{listing.certificate.generator.maxAnnualEnergy} MWh</Td>
          </Tr>
          <Tr>
            <Th>State</Th>
            <Td>{listing.certificate.generator.state}</Td>
          </Tr>
          <Tr>
            <Th>County</Th>
            <Td>{listing.certificate.generator.county}</Td>
          </Tr>
        </Table>
        <Table>
          <Tr>
            <Th>Power Type</Th>
            <Td>{listing.certificate.generator.fuels[0].type}</Td>
          </Tr>
          <Tr>
            <Th>Price per MWh</Th>
            <Td>100</Td>
          </Tr>
          <Tr>
            <Th>Total Bundle Size</Th>
            <Td>10</Td>
          </Tr>
          <Tr>
            <Th>REC Expiration</Th>
            <Td>[some date here]</Td>
          </Tr>
        </Table>
        <Button onClick={onContinue}>Continue</Button>
      </Stack>
    </ModalBody>
  );
};

export default ListingDetails;
