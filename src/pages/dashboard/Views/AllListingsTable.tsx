import { Box, TableContainer, Table, Thead, Tbody, Td, Th, Tr } from '@chakra-ui/react';
import { useContext } from 'react';
import { ListingsContext } from '../../../contexts/listingsContext';
import dayjs from 'dayjs';
import PurchaseModal from '../PurchaseModal';

const AllListingsTable = () => {
  const { listingsForSale } = useContext(ListingsContext);

  return (
    <Box>
      <TableContainer bg="white" borderRadius="lg">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Generator</Th>
              <Th>Price per MWh</Th>
              <Th>Total MWh</Th>
              <Th>Power Type</Th>
              <Th>Location</Th>
              <Th>Sale Expiration Date</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {listingsForSale.map((listing) => {
              const expirationDate = dayjs.unix(listing.expirationDate as unknown as number);
              return (
                <Tr key={listing.id}>
                  <Td>{listing.certificate.generator.name}</Td>
                  <Td>100</Td>
                  <Td>1000</Td>
                  <Td>{listing.certificate.fuel.type}</Td>
                  <Td>{listing.certificate.generator.state}</Td>
                  <Td>{expirationDate.format('YYYY-MM-DD HH:mm:ss')}</Td>
                  <Td>
                    <PurchaseModal listing={listing} />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllListingsTable;
