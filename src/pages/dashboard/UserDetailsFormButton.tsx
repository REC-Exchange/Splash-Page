import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { useState } from 'react';

const UserDetailsFormButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  return (
    <>
      <Button onClick={onOpen} size="sm">
        Update
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Organization</FormLabel>
              <Input value={organization} onChange={(e) => setOrganization(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Role</FormLabel>
              <Input value={role} onChange={(e) => setRole(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>City</FormLabel>
              <Input value={city} onChange={(e) => setCity(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>State</FormLabel>
              <Input value={state} onChange={(e) => setState(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Zip</FormLabel>
              <Input value={zip} onChange={(e) => setZip(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserDetailsFormButton;
