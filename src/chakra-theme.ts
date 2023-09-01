import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  },
  fonts: {
    body: 'Century Gothic, sans-serif',
    heading: 'Century Gothic, sans-serif'
  },
  breakPoints: {
    xl: '1200px',
    '2xl': '1650px'
  }
});

export default theme;
