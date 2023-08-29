import React, { useState } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { Text, Box, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
export const MAILCHIMP_U = 'bf1d5d704cbd84de9ad5f20f3';
export const MAILCHIMP_ID = 'a1e79f2dce';
// export const F_ID = '00b83ae2f0';
export const MAILCHIMP_POST_URL = `https://network.us3.list-manage.com/subscribe/post?u=${MAILCHIMP_U}&amp;id=${MAILCHIMP_ID}&amp`;

const EmailSubscriptionForm = () => {
  const [email, setEmail] = useState('');

  return (
    <MailchimpSubscribe
      url={MAILCHIMP_POST_URL}
      render={({
        subscribe
        // status, message
      }) => (
        <Box w="full">
          <Text size="lg" mb={2}>
            Stay up to date with our launch
          </Text>
          <InputGroup size="lg" maxW="36rem" minW="full">
            <Input
              bg="white"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <InputRightElement width="115px">
              <Button
                type="button"
                colorScheme="teal"
                onClick={() => {
                  subscribe({
                    EMAIL: email
                  });
                }}>
                Subscribe
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      )}
    />
  );
};

export default EmailSubscriptionForm;
