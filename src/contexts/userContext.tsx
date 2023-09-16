import { createContext, FC, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { collection, getDocs, addDoc, getDoc } from 'firebase/firestore';
import Loading from '../pages/Loading';

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
  checkIfUserExists: (email: string) => Promise<boolean>;
  completeUserRegistration: (user: User) => Promise<void>;
}

export const UserContext = createContext<UserContextInterface>({} as UserContextInterface);

const UserProvider: FC<Props> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [authedUser] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!authedUser;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>();
  const usersCollectionRef = collection(db, 'users');

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const data = await getDocs(usersCollectionRef);
      const users = data.docs.map((docSnapshot) => ({ ...docSnapshot.data(), id: docSnapshot.id }));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const loggedInUser = users.find((user) => user.email === authedUser?.email);
      setLoading(false);
      setUser(loggedInUser);
    };

    getUsers();
  }, [authedUser]);

  const checkIfUserExists = async (email: string) => {
    const data = await getDocs(usersCollectionRef);
    const users: string[] = data.docs.map((doc) => doc.data().email);
    return Boolean(users.find((existingUserEmail) => existingUserEmail === email));
  };

  const completeUserRegistration = async (user: User) => {
    try {
      const docRef = await addDoc(usersCollectionRef, user);
      const docSnapshot = await getDoc(docRef);
      setUser({ ...docSnapshot.data(), id: docSnapshot.id });

      // Update the user's data in Firestore
      // await setDoc(userDocRef, user, { merge: true });
    } catch (error) {
      console.error('Error updating user data: ', error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, checkIfUserExists, completeUserRegistration }}>
      {loading ? <Loading /> : children}
    </UserContext.Provider>
  );
};

export default UserProvider;
