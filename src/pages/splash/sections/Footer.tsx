import { Box, Container, Stack } from '@chakra-ui/react';
import EmailInput from '../../../components/EmailInput';

const Footer = () => {
  return (
    <Box bg="#182336">
      <Container maxW="6x" p={24}>
        <Stack maxW="xl" m="auto">
          <EmailInput darkMode />
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
