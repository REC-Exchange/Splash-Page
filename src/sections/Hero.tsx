import { Box, Text, Image } from '@chakra-ui/react';
import heroRenewables from '../assets/hero-renewables.png';

const Hero = () => {
  return (
    <Box position="relative" bg="#CEE5DB">
      <Image src={heroRenewables} position="absolute" maxW="800px" right={24} bottom={24} />
      <Box display="flex" maxW="8xl" mx="auto" px={24} py={48} position="relative">
        <Box maxW="2xl" w="full">
          <Text fontSize="64px">The REC Exchange</Text>
          <Text fontSize="24px">
            Innovative solar panels harnessing the power of the sun, wind turbines spinning
            gracefully in the breeze, and sustainable biofuels driving us to a cleaner future.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
