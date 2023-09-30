import {
  Box,
  TableContainer,
  Text,
  Table,
  Thead,
  Tbody,
  Td,
  Th,
  Tr,
  Button
} from '@chakra-ui/react';
import { FC, useContext } from 'react';
import { ListingsContext } from '../../../contexts/listingsContext';
import { Listing } from '../../../types';
import { UserContext } from '../../../contexts/userContext';
import PurchaseModal from '../PurchaseModal';

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
  if (listing.status === 'pending-seller') {
    return <Text>Seller Contacted</Text>;
  }
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

const MyPurchasesTable: FC<{ setPage: (page: 'all' | 'myListings' | 'myPurchases') => void }> = ({
  setPage
}) => {
  const { userPurchaseListings } = useContext(ListingsContext);

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
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {userPurchaseListings.map((listing) => {
              return (
                <Tr key={listing.id}>
                  <Td>{listing.certificate.generator.name}</Td>
                  <Td>100</Td>
                  <Td>1000</Td>
                  <Td>{listing.certificate.fuel.type}</Td>
                  <Td>{listing.certificate.generator.state}</Td>
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

export default MyPurchasesTable;
