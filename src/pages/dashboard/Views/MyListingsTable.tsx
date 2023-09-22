import { Box, TableContainer, Table, Thead, Tbody, Td, Th, Tr, Text } from '@chakra-ui/react';
import { FC, useContext } from 'react';
import { ListingsContext } from '../../../contexts/listingsContext';
import dayjs from 'dayjs';
import numeral from 'numeral';
import { Listing } from '../../../types';
import { UserContext } from '../../../contexts/userContext';
import PurchaseModal from '../PurchaseModal';

const ActionButton: FC<{ listing: Listing }> = ({ listing }) => {
  console.log('status ', listing.status);
  const { user } = useContext(UserContext);

  if (listing.status === 'pending-buyer') {
    return <Text>Pending buyer</Text>;
  }

  if (listing.status === 'pending-recx') {
    return <Text>Pending RECX</Text>;
  }

  if (listing.status === 'pending-seller') {
    return <Text>Pending Seller</Text>;
  }

  if (listing.status === 'processing') {
    return <Text>Processing</Text>;
  }

  if (listing.status === 'completed') {
    return <Text>Completed</Text>;
  }

  if (listing.status === 'expired') {
    return <Text>Expired</Text>;
  }

  if (listing.sellerId === user.id) {
    return <Text>Your listing</Text>;
  }

  // status is "listed"
  return <PurchaseModal listing={listing} />;
};

const MyListingsTable = () => {
  const { userSaleListings } = useContext(ListingsContext);

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
            {userSaleListings.map((listing) => {
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
                    <ActionButton listing={listing} />
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

export default MyListingsTable;
