import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react';
import UserDetailsFormButton from './UserDetailsFormButton';
import { UserContext } from '../../contexts/userContext';

const Dashboard = () => {
  const context = useContext(UserContext);

  console.log('user ', context);

  const { user, isAuthenticated } = context;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Heading>Dashboard</Heading>
      <Container maxW="3xl">
        <Card>
          <CardHeader>
            <HStack justifyContent="space-between">
              <Heading size="md">Your User Profile</Heading>
              <UserDetailsFormButton />
            </HStack>
          </CardHeader>

          <CardBody>
            {user ? (
              <Stack divider={<StackDivider />} spacing="4">
                <Box key={user.id}>
                  <Heading size="xs" textTransform="uppercase">
                    ID: {user.id}
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    Name: {user.firstName} {user.lastName}
                  </Text>
                  <Text pt="2" fontSize="sm">
                    email: {user.email}
                  </Text>
                </Box>
              </Stack>
            ) : (
              <Text>User not found</Text>
            )}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default Dashboard;
