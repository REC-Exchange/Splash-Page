import { Box, Button, Container, HStack, Image, Text } from '@chakra-ui/react';
import leafLogo from '../../../assets/renewable-energy-certificates.png';

const NavBar = () => {
  const handleLogin = () => {
    console.log('logged in!');
  };

  return (
    <Box h="60px" w="full" display="flex" flexDir="column" justifyContent="center">
      <Container maxW="8xl">
        <HStack justifyContent="space-between">
          <HStack>
            <Image src={leafLogo} w="48px" h="48px" />
            <Text>REC Exchange</Text>
          </HStack>
          <Button onClick={handleLogin}>Log in</Button>
        </HStack>
      </Container>
    </Box>
  );
};

export default NavBar;
