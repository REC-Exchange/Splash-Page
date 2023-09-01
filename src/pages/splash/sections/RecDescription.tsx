import { Box, Text, Image, Stack, Flex } from '@chakra-ui/react';
import heroLandscape from '../../../assets/hero-landscape.png';

const RecDescription = () => {
  return (
    <Box p={16} margin="auto" w="fit-content">
      <Flex
        flexWrap="wrap"
        boxShadow="lg"
        border="1px"
        borderRadius="lg"
        borderColor="gray.50"
        w="fit-content"
        p={16}
        bg="gray.50">
        <Box flex="1" minWidth="400px" mr={[0, 16]}>
          <Image maxH="400px" src={heroLandscape} m="auto" />
        </Box>
        <Box flex="2" justifyContent="center" display="flex" flexDir="column">
          <Stack spacing={4}>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Renewable Energy Certificate (REC)
            </Text>
            <Text maxW="600px" color="gray.500">
              A REC represents the environmental attributes of one megawatt-hour of electricity
              generated and delivered to the grid from a renewable source.
            </Text>
            <Text maxW="600px" color="gray.500">
              RECs can be sold with or without the electricity they are associated with, creating
              market opportunities.
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );

  // return (
  //   <Box p={24}>
  //     <Box
  //       justifyContent="center"
  //       boxShadow="lg"
  //       border="1px"
  //       borderRadius="lg"
  //       borderColor="gray.50"
  //       w="fit-content"
  //       margin="auto"
  //       p={16}
  //       bg="gray.50">
  //       <Image maxH="400px" src={heroLandscape} m="auto" />
  //       <Stack spacing={4}>
  //         <Text fontSize="xl" fontWeight="bold" mb={2}>
  //           Renewable Energy Certificate (REC)
  //         </Text>
  //         <Text maxW="600px" color="gray.500">
  //           A REC represents the environmental attributes of one megawatt-hour of electricity
  //           generated and delivered to the grid from a renewable source.
  //         </Text>
  //         <Text maxW="600px" color="gray.500">
  //           RECs can be sold with or without the electricity they are associated with, creating
  //           market opportunities.
  //         </Text>
  //       </Stack>
  //     </Box>
  //   </Box>
  // );
};

export default RecDescription;
