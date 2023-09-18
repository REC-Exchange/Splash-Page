import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { ListingsContext } from '../../contexts/listingsContext';

const AllListingsTable = () => {
  const { allListings } = useContext(ListingsContext);
  return (
    <Box>
      {allListings.map((listing) => (
        <Box key={listing.id}>{listing.status}</Box>
      ))}
    </Box>
  );
};

export default AllListingsTable;
