import { Box, Container, Stack, Text, VStack } from '@chakra-ui/react';
import EmailSubscriptionForm from '../../../components/EmailInput';

const Hero = () => {
  return (
    <Container maxW="8xl" py={24}>
      <Stack direction={{ base: 'column', lg: 'row' }} spacing={24}>
        <VStack maxW={{ base: 'xl', '2xl': '2xl' }} w="full" my="auto" spacing={8} margin="auto">
          <Text fontSize="72px" lineHeight="72px" color="#102B32">
            Buy & Sell Renewable Energy Credits
          </Text>
          <Text fontSize="24px">
            Launching soon - An advanced and hassle-free marketplace for trading RECs
          </Text>
          <EmailSubscriptionForm />
        </VStack>
        <Box h="600px" display={{ base: 'none', lg: 'block' }} />
      </Stack>
    </Container>
  );
};

export default Hero;
