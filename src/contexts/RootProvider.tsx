import UserProvider from './userContext';
import { FC } from 'react';
import ListingsProvider from './listingsContext';

type Props = {
  children?: React.ReactNode;
};

const RootProvider: FC<Props> = ({ children }) => {
  return (
    <UserProvider>
      <ListingsProvider>{children}</ListingsProvider>
    </UserProvider>
  );
};

export default RootProvider;
