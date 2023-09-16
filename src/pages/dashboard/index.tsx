import { useContext } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { UserContext } from '../../contexts/userContext';
import HeroCard from './HeroCard';
import CsvUpload from './CsvUpload';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const context = useContext(UserContext);
  const { isAuthenticated, user } = context;

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
      <CsvUpload />
    </Box>
  );
};

export default Dashboard;
