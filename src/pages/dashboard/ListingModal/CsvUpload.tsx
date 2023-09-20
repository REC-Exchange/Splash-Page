import { Button, chakra, ModalBody, Stack, Text, Image, Box, Icon } from '@chakra-ui/react';
import { FileUploader } from 'react-drag-drop-files';
import React, { FC, useState } from 'react';
import dragAndDropIcon from '../../../assets/drag-and-drop.png';
import { AiFillCheckCircle } from 'react-icons/all';

interface Props {
  handleFileUpload: (file: File) => void;
  uploadSuccessful: boolean;
  onContinue: VoidFunction;
  fileName?: string;
}

const fileTypes = ['CSV'];

const ChakraFileUploader = chakra(FileUploader);

const CsvUpload: FC<Props> = ({ handleFileUpload, uploadSuccessful, onContinue, fileName }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  return (
    <ModalBody display="flex" flexDir="column" justifyContent="space-between" p={4}>
      <Stack spacing={2}>
        <ChakraFileUploader
          multiple={false}
          handleChange={handleFileUpload}
          name="file"
          types={fileTypes}
          label="Upload your REC bundle CSV">
          <Box
            border="2px dashed"
            cursor="pointer"
            p={4}
            borderRadius="lg"
            borderColor={isDraggingOver ? 'blue.500' : 'gray.300'}
            backgroundColor={isDraggingOver ? 'red.500' : 'gray.50'}
            onDragOver={() => setIsDraggingOver(true)}
            onDragLeave={() => setIsDraggingOver(false)}>
            <Stack spacing={4}>
              {uploadSuccessful ? (
                <Icon as={AiFillCheckCircle} color="green.500" boxSize={24} m="auto" />
              ) : (
                <Image src={dragAndDropIcon} m="auto" />
              )}
              <Text size="lg" fontWeight="bold" textAlign="center">
                {uploadSuccessful
                  ? 'CSV File Uploaded'
                  : 'Get started by adding your REC Bundle CSV'}
              </Text>
              {uploadSuccessful ? (
                <Text textAlign="center">{fileName}</Text>
              ) : (
                <Button colorScheme="blue">Choose File</Button>
              )}
            </Stack>
          </Box>
        </ChakraFileUploader>
      </Stack>
      <Button disabled={!uploadSuccessful} onClick={onContinue} colorScheme="teal">
        Continue
      </Button>
    </ModalBody>
  );
};

export default CsvUpload;
