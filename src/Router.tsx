import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/404';
import LoginPage from './pages/login';
import { App } from './App';
import * as React from 'react';
import theme from './chakra-theme';
import { Box, ChakraProvider } from '@chakra-ui/react';
import NavBar from './pages/splash/sections/NavBar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <NotFound />
  }
]);

const Router = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box position="relative">
        <NavBar />
        <RouterProvider router={router} />
      </Box>
    </ChakraProvider>
  );
};
export default Router;
