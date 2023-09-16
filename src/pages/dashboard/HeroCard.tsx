import { Card, CardBody, CardHeader, Container, Heading, HStack, Text } from '@chakra-ui/react';

const HeroCard = () => {
  return (
    <Container maxW="3xl">
      <Card>
        <CardHeader>
          <HStack justifyContent="space-between">
            <Heading size="md">Powering a Sustainable Future</Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          <Text>
            Are you ready to make a positive impact on the planet while maximizing your energy
            investments? Welcome to our Renewable Energy Credits (RECs) marketplace – your gateway
            to a cleaner, greener future.
          </Text>
        </CardBody>
      </Card>
    </Container>
  );
};

export default HeroCard;
