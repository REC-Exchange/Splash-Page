import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react';

const Dashboard = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [user] = useAuthState(auth);

  const [users, setUsers] = useState<any>([]);

  const usersCollectionRef = collection(db, 'users');

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      const usersarray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUsers(usersarray);
    };

    getUsers();
  }, []);

  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Heading>Dashboard</Heading>
      <Container maxW="3xl">
        <Card>
          <CardHeader>
            <Heading size="md">Users</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              {users.map((user: any) => (
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
              ))}
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default Dashboard;
