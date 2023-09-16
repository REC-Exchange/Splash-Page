import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import CSVReader from 'react-csv-reader';

const Login = () => {
  // const [page, setPage] = useState<'uploadCSV' | 'CSVDetails'>('uploadCSV');
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header: string) => header.toLowerCase().replace(/\W/g, '_')
  };

  const submitCSV = () => {
    console.log('up');
  };

  const handleForce = () => {
    console.log('force');
  };

  const handleDarkSideForce = () => {
    console.log('on error');
  };

  return (
    <Modal isOpen={false} onClose={() => null}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Upload you REC CSV</ModalHeader>
        <ModalBody>
          <CSVReader
            cssClass="csv-reader-input"
            label="Select CSV with secret Death Star statistics"
            onFileLoaded={handleForce}
            onError={handleDarkSideForce}
            parserOptions={papaparseOptions}
            inputId="ObiWan"
            inputName="ObiWan"
            inputStyle={{ color: 'red' }}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" onClick={submitCSV}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Login;
