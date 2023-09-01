import SplashPage from './pages/splash';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { Navigate } from 'react-router-dom';
import { useColorMode } from '@chakra-ui/react';

export const App = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [user] = useAuthState(auth);

  const colorMode = useColorMode();
  console.log('colorMode', colorMode);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return <SplashPage />;
};
