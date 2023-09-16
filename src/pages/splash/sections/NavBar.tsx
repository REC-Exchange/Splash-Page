import {
  Box,
  // Button,
  Container,
  HStack,
  Image,
  Text
} from '@chakra-ui/react';
// import { Link } from 'react-router-dom';
import leafLogo from '../../../assets/renewable-energy-certificates.png';
// import { useContext } from 'react';
// import { UserContext } from '../../../contexts/userContext';
// import { auth } from '../../../firebase';

const NavBar = () => {
  // const { isAuthenticated } = useContext(UserContext);

  return (
    <Box h="60px" w="full" display="flex" flexDir="column" justifyContent="center">
      <Container maxW="8xl">
        <HStack justifyContent="space-between">
          <HStack>
            <Image src={leafLogo} w="48px" h="48px" />
            <Text>REC Exchange</Text>
            {/*<Link to="/dashboard">Dashboard</Link>*/}
            {/*{isAuthenticated && (*/}
            {/*  <Button*/}
            {/*    onClick={() => {*/}
            {/*      auth.signOut();*/}
            {/*    }}>*/}
            {/*    log out*/}
            {/*  </Button>*/}
            {/*)}*/}
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default NavBar;
