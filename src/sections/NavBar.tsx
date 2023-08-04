import { Box, Container, HStack, Image, Text } from '@chakra-ui/react';
import leafLogo from '../assets/renewable-energy-certificates.png';

const NavBar = () => {
  return (
    <Box h="60px" w="full" display="flex" flexDir="column" justifyContent="center">
      <Container maxW="8xl">
        <HStack>
          <Image src={leafLogo} w="48px" h="48px" />
          <Text>REC Exchange</Text>
        </HStack>
      </Container>
    </Box>
  );
};

export default NavBar;
