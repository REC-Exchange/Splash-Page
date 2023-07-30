import { Box, Container, HStack, Image, Text } from '@chakra-ui/react';

const NavBar = () => {
  return (
    <Box
      h="60px"
      w="full"
      bgGradient="linear(to-r, #18263F, #B8C4B9)"
      display="flex"
      flexDir="column"
      justifyContent="center">
      <Container maxW="8xl">
        <HStack>
          <Image src={undefined} w="48px" h="48px" />
          <Text color="white">The Rec Exchange</Text>
        </HStack>
      </Container>
    </Box>
  );
};

export default NavBar;
