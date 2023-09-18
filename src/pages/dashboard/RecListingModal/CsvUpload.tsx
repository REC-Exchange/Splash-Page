import { Button, ModalBody, Stack, Text } from '@chakra-ui/react';
import { FileUploader } from 'react-drag-drop-files';
import React, { FC } from 'react';

interface Props {
  handleFileUpload: (files: File[]) => void;
  uploadSuccessful: boolean;
  onContinue: VoidFunction;
}

const fileTypes = ['CSV'];

const CsvUpload: FC<Props> = ({ handleFileUpload, uploadSuccessful, onContinue }) => {
  return (
    <ModalBody>
      <Stack spacing={2}>
        <Text size="lg">List REC Bundle</Text>
        <FileUploader
          multiple={true}
          handleChange={handleFileUpload}
          name="file"
          types={fileTypes}
        />
        {uploadSuccessful && <Text>Your CSV has been uploaded</Text>}
        <Button disabled={!uploadSuccessful} onClick={onContinue}>
          Continue
        </Button>
      </Stack>
    </ModalBody>
  );
};

export default CsvUpload;
