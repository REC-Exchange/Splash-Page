import { createContext, FC, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

type Props = {
  children?: React.ReactNode;
};

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserContextInterface {
  user: User;
  isAuthenticated: boolean;
}

export const UserContext = createContext<UserContextInterface>({} as UserContextInterface);

const UserProvider: FC<Props> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [authedUser] = useAuthState(auth);
  const isAuthenticated = !!authedUser;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>();
  const usersCollectionRef = collection(db, 'users');

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const loggedInUser = users.find((user) => user.email === authedUser?.email);
      console.log('setting user to : ', user);
      setUser(loggedInUser);
    };

    getUsers();
  }, []);

  console.log({ user, isAuthenticated });

  return <UserContext.Provider value={{ user, isAuthenticated }}>{children}</UserContext.Provider>;
};

export default UserProvider;
