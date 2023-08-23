import { HStack, Box, Text, Image } from '@chakra-ui/react';
import heroLandscape from '../../../assets/hero-landscape.png';

const RecDescription = () => {
  return (
    <Box p={24}>
      <HStack
        justifyContent="center"
        spacing={16}
        boxShadow="lg"
        border="1px"
        borderRadius="lg"
        borderColor="gray.50"
        w="fit-content"
        margin="auto"
        px={16}
        bg="gray.50">
        <Image maxH="600px" src={heroLandscape} />
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Renewable Energy Certificate (REC)
          </Text>
          <Text maxW="600px" color="gray.500">
            also known as a <strong>Renewable Energy Credit</strong>, represents the environmental
            attributes or benefits (and other non-power attributes of renewable electricity
            generation) associated with one megawatt-hour (MWh) of electricity generated and
            delivered to the electricity grid from a renewable energy resource. RECs are sold,
            delivered, or purchased separately from the electricity itself (commonly referred to as
            “unbundled”) and represent proof of renewable electricity delivered to the grid and
            represent the environmental effect or energy attributes of that renewable electricity.
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default RecDescription;
