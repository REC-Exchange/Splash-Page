import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Td,
  Th,
  Tr,
  Text,
  Button,
  Icon
} from '@chakra-ui/react';
import { FC, useContext, useState } from 'react';
import { ListingsContext } from '../../../contexts/listingsContext';
import dayjs from 'dayjs';
import numeral from 'numeral';
import { Listing } from '../../../types';
import { UserContext } from '../../../contexts/userContext';
import PurchaseModal from '../PurchaseModal';
import { BiErrorCircle } from 'react-icons/all';

const ActionButton: FC<{
  listing: Listing;
  setPage: (page: 'all' | 'myListings' | 'myPurchases') => void;
}> = ({ listing }) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { confirmSale: _confirmSale } = useContext(ListingsContext);
  const confirmSale = async () => {
    try {
      setLoading(true);
      await _confirmSale(listing);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  if (listing.status === 'pending-buyer') {
    return <Text>Pending buyer</Text>;
  }

  if (listing.status === 'pending-recx') {
    return <Text>Sale Pending</Text>;
  }

  if (listing.status === 'pending-seller') {
    return (
      <Button
        leftIcon={<Icon as={BiErrorCircle} />}
        colorScheme="blue"
        variant="outline"
        onClick={confirmSale}
        disabled={loading}
        isLoading={loading}>
        {error ? 'Error' : 'Confirm Sale'}
      </Button>
    );
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
    return <Text>--</Text>;
  }

  // status is "listed"
  return <PurchaseModal listing={listing} />;
};

const MyListingsTable: FC<{ setPage: (page: 'all' | 'myListings' | 'myPurchases') => void }> = ({
  setPage
}) => {
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
                    <ActionButton setPage={setPage} listing={listing} />
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
