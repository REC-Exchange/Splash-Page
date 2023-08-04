import { ChakraProvider } from '@chakra-ui/react';
import theme from './chakra-theme';
import Hero from './sections/Hero';
import MissionStatements from './sections/MissionStatements';
import Footer from './sections/Footer';
import RecDescription from './sections/RecDescription';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Hero />
    <RecDescription />
    <MissionStatements />
    <Footer />
  </ChakraProvider>
);
