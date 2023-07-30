import { Box, Image, Text } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const NavBar = () => {
  return (
    <Box h="60px" bg="blue" w="full" bgGradient="linear(to-r, #18263F, #B8C4B9)">
      <Box
        maxW="8xl"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="full"
        m="auto">
        <Box display="flex" alignItems="center">
          <Image src={undefined} w="48px" h="48px" />
          <Text color="white">The Rec Exchange</Text>
        </Box>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Box>
    </Box>
  );
};

export default NavBar;
