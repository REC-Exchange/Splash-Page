import React, { FC, useState } from 'react';
import {
  Text,
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useBreakpointValue
} from '@chakra-ui/react';
import emailValidator from 'email-validator';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const EmailSubscriptionForm: FC<{ darkMode?: boolean }> = ({ darkMode }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const emailCollectionRef = collection(db, 'newsletter_emails');
  const [validationFailed, setValidationFailed] = useState(false);

  const placeholder = useBreakpointValue({
    base: 'Email',
    md: 'Enter your email'
  });

  const handleSubmit = async () => {
    if (!emailValidator.validate(email)) {
      setValidationFailed(true);
      return;
    } else {
      setValidationFailed(false);
    }
    setStatus('PENDING');
    try {
      const emailQuery = query(emailCollectionRef, where('email', '==', email));
      const querySnapshot = await getDocs(emailQuery);

      if (querySnapshot.size > 0) {
        setStatus('DUPLICATE');
      } else {
        await addDoc(emailCollectionRef, { email });
        setStatus('SUCCESS');
      }
    } catch (error) {
      setStatus('ERROR');
    }
  };

  return (
    <Box w="full">
      <Text size="lg" mb={2} color={darkMode ? 'white' : undefined}>
        Stay up to date with our launch
      </Text>
      <InputGroup size="lg" maxW="36rem" minW="full">
        <Input
          isInvalid={validationFailed}
          bg="white"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          onKeyDown={function (e) {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        <InputRightElement width="115px">
          <Button
            type="button"
            colorScheme="teal"
            onClick={handleSubmit}
            isLoading={status === 'PENDING'}>
            Subscribe
          </Button>
        </InputRightElement>
      </InputGroup>
      <Text size="xs" mt={2} minH="24px" color={darkMode ? 'white' : undefined}>
        {status === 'SUCCESS' && 'Thank you for subscribing!'}
        {status === 'DUPLICATE' && 'This email has already been registered'}
        {status === 'ERROR' && 'Sorry, an error has occurred'}
        {validationFailed && 'Enter a valid e-mail address'}
      </Text>
    </Box>
  );
};

export default EmailSubscriptionForm;
