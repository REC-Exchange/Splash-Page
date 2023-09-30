import { useContext, useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import emailValidator from 'email-validator';
import {
  Button,
  FormControl,
  FormLabel,
  Text,
  HStack,
  Icon,
  Input,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import emailImage from '../../assets/email.png';
import recExchange from '../../assets/rec-circular.png';
import { auth } from '../../firebase';
import { UserContext } from '../../contexts/userContext';
import { BiErrorAlt } from 'react-icons/all';

const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailValidationFailed, setEmailValidationFailed] = useState(false);
  const [formError, setFormError] = useState('');
  const [page, setPage] = useState<
    'createAccount' | 'login' | 'emailSent' | 'emailError' | 'missingLocalStorageInfo'
  >('createAccount');
  const [alreadyExists, setAlreadyExists] = useState(false);
  const showLoginPage = () => setPage('login');
  const showAccountPage = () => setPage('createAccount');
  const { isAuthenticated, checkIfUserExists, completeUserRegistration } = useContext(UserContext);
  const { isOpen, onClose: closeModal } = useDisclosure({ defaultIsOpen: true });
  const navigate = useNavigate();

  const onClose = () => {
    closeModal();
    navigate('/');
  };

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
    setFormError('');
    setEmailValidationFailed(false);

    if (!emailValidator.validate(email)) {
      setEmailValidationFailed(true);
      return;
    }

    if (firstName === '') {
      setFormError('Enter a valid First Name');
      return;
    }
    if (lastName === '') {
      setFormError('Enter a valid Last Name');
      return;
    }
    if (organization === '') {
      setFormError('Enter a valid Organization');
      return;
    }
    if (phone === '') {
      setFormError('Enter a valid Phone Number');
      return;
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
        url: window.location.href.includes('localhost')
          ? 'http://localhost:3000/login'
          : 'https://recexchange.co/login',
        handleCodeInApp: true
      });
      setPage('emailSent');
    }
  };

  const onLogin = async () => {
    if (!emailValidator.validate(email)) {
      setEmailValidationFailed(true);
      return;
    } else {
      setEmailValidationFailed(false);
    }

    localStorage.removeItem('userForSignIn');

    const exists = await checkIfUserExists(email);

    if (exists) {
      try {
        localStorage.setItem('userForSignIn', JSON.stringify({ email }));
        await auth.sendSignInLinkToEmail(email, {
          url: window.location.href.includes('localhost')
            ? 'http://localhost:3000/login'
            : 'https://recexchange.co/login',
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      {page === 'createAccount' && (
        <ModalContent>
          <ModalHeader>Create an Account</ModalHeader>
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
              <Input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            {emailValidationFailed && <Text color="red.500">Invalid Email Address</Text>}
            {formError.length > 0 && (
              <Text mt={2} color="red.500">
                {formError}
              </Text>
            )}
            <Text mt={2} color={alreadyExists ? 'red.500' : ''}>
              {alreadyExists
                ? 'An Account already exists for his email.'
                : 'Already have an account?'}
              <Button variant="link" onClick={showLoginPage} ml={2} colorScheme="blue">
                Log in
              </Button>
            </Text>
          </ModalBody>
          <ModalFooter>
            <Link to="/">
              <Button variant="ghost">Cancel</Button>
            </Link>
            <Button colorScheme="green" onClick={onSignUp} ml={2}>
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
            <Image src={recExchange} />
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            {emailValidationFailed && <Text color="red.500">Invalid Email Address</Text>}
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
          <ModalBody mb={8}>
            <Image src={emailImage} />
            <Text textAlign="center">We sent you an email to log in, please check.</Text>
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
            <Icon color="red.500" as={BiErrorAlt} boxSize={24} mx="auto" my={16} display="block" />
            <Text mb={8} textAlign="center">
              We had a problem. Refresh & try again.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
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
            <Icon color="red.500" as={BiErrorAlt} boxSize={24} mx="auto" my={16} display="block" />
            <Text mb={8} textAlign="center">
              There was a problem with your email link. Refresh & try again.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
};

export default Login;
