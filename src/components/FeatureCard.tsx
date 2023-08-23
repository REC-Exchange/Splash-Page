import { FC } from 'react';
import { Box, Divider, Text, VStack, Image } from '@chakra-ui/react';

const FeatureCard: FC<{ title: string; body: string; imgSrc: string; subtitle: string }> = ({
  imgSrc,
  title,
  subtitle,
  body
}) => {
  return (
    <VStack
      boxShadow="lg"
      p={8}
      borderRadius="lg"
      h="100%"
      border="1px"
      borderColor="gray.50"
      bg="gray.50">
      <Box>
        <Image maxH="240px" h="100%" w="auto" src={imgSrc} />
      </Box>
      <Box display="flex" flexDir="column" justifyContent="flex-start">
        <Text fontWeight="bold" textAlign="center" fontSize="2xl">
          {title}
        </Text>
      </Box>
      <Text fontWeight="bold" fontSize="lg" mb={4} color="gray.500">
        {subtitle}
      </Text>
      <Divider orientation="horizontal" mb={4} />
      <Text color="gray.500">{body}</Text>
    </VStack>
  );
};

export default FeatureCard;
