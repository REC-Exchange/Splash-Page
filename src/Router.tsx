import React, { FC, ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/404';
import { App } from './App';
import theme from './chakra-theme';
import { Box, ChakraProvider } from '@chakra-ui/react';
import NavBar from './pages/splash/sections/NavBar';
import UserProvider from './contexts/userContext';
// import Dashboard from './pages/dashboard';
// import Login from './pages/login';

const Root: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box minH="100vh" bg="blue.50">
      <NavBar />
      {children}
    </Box>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Root>
        <App />
      </Root>
    ),
    errorElement: <NotFound />
  }
  // {
  //   path: '/login',
  //   element: (
  //     <Root>
  //       <Login />
  //     </Root>
  //   ),
  //   errorElement: <NotFound />
  // },
  // {
  //   path: '/dashboard',
  //   element: (
  //     <Root>
  //       <Dashboard />
  //     </Root>
  //   ),
  //   errorElement: <NotFound />
  // }
]);

const Router = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="blue.50">
        <UserProvider>
          <Box position="relative">
            <RouterProvider router={router} />
          </Box>
        </UserProvider>
      </Box>
    </ChakraProvider>
  );
};
export default Router;
