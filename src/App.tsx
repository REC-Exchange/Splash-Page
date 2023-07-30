import { ChakraProvider } from '@chakra-ui/react';
import theme from './chakra-theme';
import NavBar from './sections/NavBar';
import Hero from './sections/Hero';
import WhatIsRec from './sections/WhatIsRec';
import Footer from './sections/Footer';

export const App = () => (
  <ChakraProvider theme={theme}>
    <NavBar />
    <Hero />
    <WhatIsRec />
    <Footer />
  </ChakraProvider>
);
