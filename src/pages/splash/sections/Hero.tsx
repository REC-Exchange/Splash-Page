import { Box, Container, Stack, Text, VStack } from '@chakra-ui/react';
import EmailSubscriptionForm from '../../../components/EmailInput';

const Hero = () => {
  return (
    <div>
      <Box
        // backgroundImage={heroBg}
        backgroundColor="#CEE5DB"
        filter="blur(10px)"
        h="100%"
        w="100%"
        position="absolute"
        top={0}
        left={0}
        zIndex={-1}
      />
      <Container maxW="8xl" py={24}>
        <Stack direction={{ base: 'column', lg: 'row' }} spacing={24}>
          <VStack maxW={{ base: 'xl', '2xl': '2xl' }} w="full" my="auto" spacing={8} margin="auto">
            <Text fontSize="72px" lineHeight="72px" color="#102B32">
              Buy & Sell Renewable Energy Credits.
            </Text>
            <Text fontSize="24px">
              Streamlined Solutions for Renewable Energy Credits: A trusted solution for fair
              pricing and regulatory compliance
            </Text>
            <EmailSubscriptionForm />
          </VStack>
          <Box h="600px" display={{ base: 'none', lg: 'block' }} />
        </Stack>
      </Container>
    </div>
  );
};

export default Hero;
