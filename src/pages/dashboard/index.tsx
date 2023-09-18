import { useContext, useState } from 'react';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { UserContext } from '../../contexts/userContext';
import HeroCard from './HeroCard';
import RecListingModal from './RecListingModal';
import { Navigate } from 'react-router-dom';
import MyListingsTable from './MyListingsTable';
import AllListingsTable from './AllListingsTable';
import MyPurchasesTable from './MyPurchasesTable';

const Dashboard = () => {
  const { isAuthenticated, user } = useContext(UserContext);

  const [page, setPage] = useState<'all' | 'myListings' | 'myPurchases'>('all');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Box minH="full">
      <HeroCard />
      <Box>
        <Text>
          Hello {user?.firstName} {user?.lastName}
        </Text>
      </Box>
      <Stack direction="row" spacing={4} align="center">
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
        <RecListingModal />
      </Stack>

      {page === 'all' && <AllListingsTable />}
      {page === 'myListings' && <MyListingsTable />}
      {page === 'myPurchases' && <MyPurchasesTable />}
    </Box>
  );
};

export default Dashboard;
