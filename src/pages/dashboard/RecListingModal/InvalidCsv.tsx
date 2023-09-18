import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  List,
  ListIcon,
  ListItem,
  ModalBody,
  Stack
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/all';
import React, { FC } from 'react';
import { requiredCsvFields } from '../../../types';

const InvalidCsv: FC<{ onRetryClick: VoidFunction }> = ({ onRetryClick }) => {
  return (
    <ModalBody>
      <Stack spacing={2}>
        <Alert status="error">
          <AlertIcon />
          <Box>
            <AlertTitle>Error Processing your CSV</AlertTitle>
            <AlertDescription>
              Please upload a single, valid CSV. Each record of your CSV must contain the following
              properties and have no additional whitespace.
            </AlertDescription>
          </Box>
        </Alert>
        <List>
          {requiredCsvFields.map((field) => (
            <ListItem key={field}>
              <ListIcon as={MdCheckCircle} color="green.500" />
              {field}
            </ListItem>
          ))}
        </List>
        <Button onClick={onRetryClick}>try again</Button>
      </Stack>
    </ModalBody>
  );
};

export default InvalidCsv;
