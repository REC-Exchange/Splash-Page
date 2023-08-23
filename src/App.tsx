import SplashPage from './pages/splash';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { Navigate, redirect } from 'react-router-dom';

export const App = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [user] = useAuthState(auth);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return <SplashPage />;
};
