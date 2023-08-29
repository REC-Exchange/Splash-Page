import { Box, Container, Stack, Text } from '@chakra-ui/react';
import EmailInput from '../../../components/EmailInput';

const Footer = () => {
  return (
    <Box bg="#182336">
      <Container maxW="6x" p={24}>
        <Stack maxW="xl" m="auto">
          <Text size="lg" color="white">
            Enter your email to stay up to date
          </Text>
          <EmailInput />
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
