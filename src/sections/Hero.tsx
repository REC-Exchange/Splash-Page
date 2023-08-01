import { Box, Button, Container, Image, Stack, Text, VStack } from '@chakra-ui/react';
import heroRenewables from '../assets/hero-renewables.png';
import heroBg from '../assets/hero-bg.png';

const Hero = () => {
  return (
    <Box
      backgroundImage={heroBg}
      backgroundColor="#CEE5DB"
      backgroundPosition="center"
      backgroundRepeat="repeat"
      backgroundSize="cover">
      <Container maxW="8xl" position="relative" py={24}>
        <Stack direction={{ base: 'column', lg: 'row' }} spacing={24}>
          <VStack maxW={{ base: 'xl', '2xl': '2xl' }} w="full" my="auto" spacing={8} margin="auto">
            <Text fontSize="72px" lineHeight="72px">
              Buy & Sell Renewable Energy Credits.
            </Text>
            <Text fontSize="24px">
              Streamlined Solutions for Renewable Energy Credits: A trusted solution for fair
              pricing and regulatory compliance
            </Text>
            <Button colorScheme="green" w="full" fontSize="xl">
              Learn More
            </Button>
          </VStack>
          <Box display="flex" flexDir="column" justifyContent="center">
            <Image src={heroRenewables} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero;
