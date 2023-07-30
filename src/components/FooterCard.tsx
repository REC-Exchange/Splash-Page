import { FC } from 'react';
import { Box, Text, Stack } from '@chakra-ui/react';

const FooterCard: FC<{ title: string; body: string; subtitle: string }> = ({
  title,
  subtitle,
  body
}) => {
  return (
    <Stack>
      <Box display="flex" flexDir="column" justifyContent="flex-start">
        <Text fontWeight="bold" textAlign="center" fontSize="2xl" color="white">
          {title}
        </Text>
      </Box>
      <Text fontWeight="bold" fontSize="lg" mb={4} color="white" textAlign="center">
        {subtitle}
      </Text>
      <Text color="gray">{body}</Text>
    </Stack>
  );
};

export default FooterCard;
