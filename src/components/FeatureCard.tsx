import { FC } from 'react';
import { Box, Divider, Text, VStack } from '@chakra-ui/react';

const FeatureCard: FC<{ title: string; body: string; subtitle: string }> = ({
  title,
  subtitle,
  body
}) => {
  return (
    <VStack>
      <Box minH="100px" display="flex" flexDir="column" justifyContent="flex-start">
        <Text fontWeight="bold" textAlign="center" fontSize="2xl">
          {title}
        </Text>
      </Box>
      <Text fontWeight="bold" fontSize="lg" mb={4}>
        {subtitle}
      </Text>
      <Divider orientation="horizontal" mb={4} />
      <Text color="gray">{body}</Text>
    </VStack>
  );
};

export default FeatureCard;
