import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Button } from '@chakra-ui/react';
import { FC, useContext } from 'react';
import numeral from 'numeral';
import { ListingsContext } from '../../../contexts/listingsContext';
import dayjs from 'dayjs';
import { UserContext } from '../../../contexts/userContext';
import PurchaseModal from '../PurchaseModal';
import { Listing } from '../../../types';

const ActionButton: FC<{
  listing: Listing;
  setPage: (page: 'all' | 'myListings' | 'myPurchases') => void;
}> = ({ listing, setPage }) => {
  const { user } = useContext(UserContext);

  // if (listing.status === 'pending-buyer') {
  //   return <Text>Pending buyer</Text>;
  // }
  //
  // if (listing.status === 'pending-recx') {
  //   return <Text>Pending RECX</Text>;
  // }
  //
  // if (listing.status === 'pending-seller') {
  //   return <Text>Pending Seller</Text>;
  // }
  //
  // if (listing.status === 'processing') {
  //   return <Text>Processing</Text>;
  // }
  //
  // if (listing.status === 'completed') {
  //   return <Text>Completed</Text>;
  // }
  //
  // if (listing.status === 'expired') {
  //   return <Text>Expired</Text>;
  // }

  if (listing.sellerId === user.id) {
    return (
      <Button variant="link" colorScheme="teal" onClick={() => setPage('myListings')}>
        View
      </Button>
    );
  }

  // status is "listed"
  return <PurchaseModal listing={listing} />;
};

const AllListingsTable: FC<{ setPage: (page: 'all' | 'myListings' | 'myPurchases') => void }> = ({
  setPage
}) => {
  const { listingsForSale } = useContext(ListingsContext);

  if (listingsForSale.length === 0) {
    return <Box>No listings available for purchase</Box>;
  }

  return (
    <Box>
      <TableContainer bg="white" borderRadius="lg">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Generator</Th>
              <Th>Price per MWh</Th>
              <Th>Total MWh</Th>
              <Th>Bundle Price</Th>
              <Th>Power Type</Th>
              <Th>Location</Th>
              <Th>Sale Expiration Date</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {listingsForSale.map((listing) => {
              const expirationDate = dayjs
                .unix(listing.expirationDate as unknown as number)
                .format('MMM D, YYYY -  h:mm A');
              const pricePerMwh = listing.price / listing.quantity;
              return (
                <Tr key={listing.id}>
                  <Td>{listing.certificate.generator.name}</Td>
                  <Td>{numeral(pricePerMwh).format('$0,0.00')}</Td>
                  <Td>{listing.quantity}</Td>
                  <Td>{numeral(listing.price).format('$0,0.00')}</Td>
                  <Td>{listing.certificate.fuel.type}</Td>
                  <Td>{listing.certificate.generator.state}</Td>
                  <Td>{expirationDate}</Td>
                  <Td>
                    <ActionButton listing={listing} setPage={setPage} />
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
