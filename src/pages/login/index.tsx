import { useContext, useEffect, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  Button,
  FormControl,
  FormLabel,
  Text,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { auth } from '../../firebase';
import { UserContext } from '../../contexts/userContext';
import emailValidator from 'email-validator';

const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [validationFailed, setValidationFailed] = useState(false);
  const [page, setPage] = useState<
    'createAccount' | 'login' | 'emailSent' | 'emailError' | 'missingLocalStorageInfo'
  >('createAccount');
  const [alreadyExists, setAlreadyExists] = useState(false);
  const showLoginPage = () => setPage('login');
  const showAccountPage = () => setPage('createAccount');
  const { isAuthenticated, checkIfUserExists, completeUserRegistration } = useContext(UserContext);

  const checkUrlForSignInAttempt = async () => {
    if (auth.isSignInWithEmailLink(window.location.href)) {
      const userFromSignInAttempt = JSON.parse(localStorage.getItem('userForSignIn') || '{}');
      if (userFromSignInAttempt.email) {
        try {
          await auth.signInWithEmailLink(userFromSignInAttempt.email || '', window.location.href);
          const exists = await checkIfUserExists(userFromSignInAttempt.email);
          if (!exists) {
            await completeUserRegistration(userFromSignInAttempt);
          }
          localStorage.removeItem('userForSignIn');
        } catch (error) {
          console.log(error);
          setPage('emailError');
        }
      } else {
        setPage('missingLocalStorageInfo');
      }
    }
  };

  const hasEffectRunRef = useRef<boolean>(false);
  useEffect(() => {
    if (!isAuthenticated && !hasEffectRunRef.current) {
      hasEffectRunRef.current = true;
      checkUrlForSignInAttempt();
    }
  }, []);

  const onSignUp = async () => {
    if (!emailValidator.validate(email)) {
      setValidationFailed(true);
      return;
    } else {
      setValidationFailed(false);
    }

    localStorage.removeItem('userForSignIn');

    const exists = await checkIfUserExists(email);

    if (exists) {
      setAlreadyExists(true);
    } else {
      localStorage.setItem(
        'userForSignIn',
        JSON.stringify({ email, firstName, lastName, organization, phone })
      );
      await auth.sendSignInLinkToEmail(email, {
        url: 'https://recexchange.co/login',
        handleCodeInApp: true
      });
      setPage('emailSent');
    }
  };

  const onLogin = async () => {
    if (!emailValidator.validate(email)) {
      setValidationFailed(true);
      return;
    } else {
      setValidationFailed(false);
    }

    localStorage.removeItem('userForSignIn');

    const exists = await checkIfUserExists(email);

    if (exists) {
      try {
        localStorage.setItem('userForSignIn', JSON.stringify({ email }));
        await auth.sendSignInLinkToEmail(email, {
          url: 'https://recexchange.co/login',
          handleCodeInApp: true
        });
        setPage('emailSent');
      } catch (error) {
        console.log('error ', error);
        setPage('emailError');
      }
    } else {
      setPage('createAccount');
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Modal isOpen onClose={() => null}>
      <ModalOverlay />
      {page === 'createAccount' && (
        <ModalContent>
          <ModalHeader>Create an Account</ModalHeader>
          <Text>
            Already have an account?
            <Button variant="link" onClick={showLoginPage}>
              Log in
            </Button>
          </Text>
          <ModalBody>
            <HStack mb={2}>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </FormControl>
            </HStack>
            <FormControl mb={2}>
              <FormLabel>Organization</FormLabel>
              <Input value={organization} onChange={(e) => setOrganization(e.target.value)} />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Phone</FormLabel>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            {validationFailed && <Text>Invalid Email Address</Text>}
            {alreadyExists && (
              <Text>
                An Account already exists for his email.
                <Button variant="link" onClick={showLoginPage}>
                  Log in
                </Button>
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Link to="/">
              <Button variant="ghost">Cancel</Button>
            </Link>
            <Button colorScheme="green" onClick={onSignUp}>
              Create an Account
            </Button>
          </ModalFooter>
        </ModalContent>
      )}

      {page === 'login' && (
        <ModalContent>
          <ModalHeader>
            <HStack justifyContent="space-between">
              <Text>Log in</Text>
              <Button variant="link" onClick={showAccountPage}>
                Create an account
              </Button>
            </HStack>
          </ModalHeader>

          <ModalBody>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            {validationFailed && <Text>Invalid Email Address</Text>}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={onLogin}>
              Send a login link
            </Button>
          </ModalFooter>
        </ModalContent>
      )}

      {page === 'emailSent' && (
        <ModalContent>
          <ModalHeader>
            <HStack justifyContent="space-between">
              <Text>Check your email</Text>
            </HStack>
          </ModalHeader>
          <ModalBody>
            <Text>We sent you an email to log in, please check.</Text>
          </ModalBody>
        </ModalContent>
      )}

      {page === 'emailError' && (
        <ModalContent>
          <ModalHeader>
            <HStack justifyContent="space-between">
              <Text>Error with login</Text>
            </HStack>
          </ModalHeader>
          <ModalBody>
            <Text>We had a problem. Refresh & try again</Text>
          </ModalBody>
        </ModalContent>
      )}

      {page === 'missingLocalStorageInfo' && (
        <ModalContent>
          <ModalHeader>
            <HStack justifyContent="space-between">
              <Text>Error with login</Text>
            </HStack>
          </ModalHeader>
          <ModalBody>
            <Text>There was a problem with your email link. Refresh & try again</Text>
          </ModalBody>
        </ModalContent>
      )}
    </Modal>
  );
};

export default Login;
