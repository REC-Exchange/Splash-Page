import { useContext, useState } from 'react';
import { Box, Button, Container, HStack } from '@chakra-ui/react';
import { UserContext } from '../../contexts/userContext';
import HeroCard from './HeroCard';
import RecListingModal from './ListingModal';
import { Navigate } from 'react-router-dom';
import MyListingsTable from './Views/MyListingsTable';
import AllListingsTable from './Views/AllListingsTable';
import MyPurchasesTable from './Views/MyPurchasesTable';

const Dashboard = () => {
  const { isAuthenticated, user } = useContext(UserContext);

  const [page, setPage] = useState<'all' | 'myListings' | 'myPurchases'>('all');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Box minH="full" padding={16}>
      <Container maxW="full">
        <HeroCard />

        <HStack spacing={4} my={16}>
          <Button
            colorScheme="teal"
            variant={page === 'all' ? 'solid' : 'outline'}
            onClick={() => setPage('all')}>
            All Listings
          </Button>
          <Button
            colorScheme="teal"
            variant={page === 'myListings' ? 'solid' : 'outline'}
            onClick={() => setPage('myListings')}>
            My Listings
          </Button>
          <Button
            colorScheme="teal"
            variant={page === 'myPurchases' ? 'solid' : 'outline'}
            onClick={() => setPage('myPurchases')}>
            My Purchases
          </Button>
        </HStack>

        {page === 'all' && <AllListingsTable />}
        {page === 'myListings' && <MyListingsTable />}
        {page === 'myPurchases' && <MyPurchasesTable />}
      </Container>
    </Box>
  );
};

export default Dashboard;
