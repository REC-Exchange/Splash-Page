import { Box, Button, Container, HStack, Image, Text } from '@chakra-ui/react';
import leafLogo from '../../../assets/renewable-energy-certificates.png';
import { auth, firebase } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const LogInButton = () => {
  const signinWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return <Button onClick={signinWithGoogle}>Google Sign in</Button>;
};

const LogOutButton = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [user] = useAuthState(auth);
  if (!user) return null;
  return (
    <HStack>
      <Text>{user.email}</Text>
      <Button onClick={() => auth.signOut()}>Log Out</Button>
    </HStack>
  );
};

const NavBar = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [user] = useAuthState(auth);

  return (
    <Box h="60px" w="full" display="flex" flexDir="column" justifyContent="center">
      <Container maxW="8xl">
        <HStack justifyContent="space-between">
          <HStack>
            <Image src={leafLogo} w="48px" h="48px" />
            <Text>REC Exchange</Text>
          </HStack>
          {user ? <LogOutButton /> : <LogInButton />}
        </HStack>
      </Container>
    </Box>
  );
};

export default NavBar;
