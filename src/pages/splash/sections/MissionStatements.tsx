import {
  Box,
  Divider,
  Image,
  Link,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react';
import importanceOfRecs from '../../../assets/importance-of-recs.png';
import ourSolution from '../../../assets/our-solution.png';
import recMarket from '../../../assets/missing-in-the-rec-market.png';

const MissionStatements = () => {
  return (
    <Box py={[4, 16]} px={[4, 16]}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="8" maxW="8xl" mx="auto">
        {/*{content.map((content, i) => (*/}
        {/*  <FeatureCard {...content} key={i} />*/}
        {/*))}*/}
        <VStack
          boxShadow="lg"
          p={8}
          borderRadius="lg"
          h="100%"
          border="1px"
          borderColor="gray.50"
          bg="gray.50">
          <Box>
            <Image maxH="240px" h="100%" w="auto" src={importanceOfRecs} />
          </Box>
          <Box display="flex" flexDir="column" justifyContent="flex-start">
            <Text fontWeight="bold" textAlign="center" fontSize="2xl">
              Driving Renewable Energy Adoption
            </Text>
          </Box>
          {/*<Text fontWeight="bold" fontSize="lg" mb={4} color="gray.500">*/}
          {/*  SOMETHING HERE?*/}
          {/*</Text>*/}
          <Divider orientation="horizontal" mb={4} />
          <Stack spacing={4}>
            <Text color="gray.500">
              RECs are a marketable commodity that are in-demand with both electric utilities and
              consumers who want demonstrate their use of renewable energy.
            </Text>
            <Text color="gray.500">They are sought after for several reasons, including:</Text>
            <List styleType="disc" ml={6}>
              <ListItem color="gray.500">Renewable Energy Goals</ListItem>
              <ListItem color="gray.500">Regulatory Compliance</ListItem>
              <ListItem color="gray.500">Environmental Support</ListItem>
            </List>
          </Stack>
        </VStack>
        <VStack
          boxShadow="lg"
          p={8}
          borderRadius="lg"
          h="100%"
          border="1px"
          borderColor="gray.50"
          bg="gray.50">
          <Box>
            <Image maxH="240px" h="100%" w="auto" src={recMarket} />
          </Box>
          <Box display="flex" flexDir="column" justifyContent="flex-start">
            <Text fontWeight="bold" textAlign="center" fontSize="2xl">
              Growing REC Market
            </Text>
          </Box>

          <Divider orientation="horizontal" mb={4} />
          <Stack spacing={4}>
            <Text color="gray.500">
              The REC market is gaining significant attention due to the expansion of state-level
              renewable energy standards, corporate interest in renewables, and the Inflation
              Reduction Act.
            </Text>
            <Text color="gray.500">
              In 2021, the REC market was valued at $11.45B, primarily driven by compliance with
              renewable portfolio standards. Forecasts from S&P Global suggest that by 2030, the REC
              market is expected to more than double, reaching $26.5 billion, with the compliance
              market maintaining dominance but a growing role for voluntary RECs, especially in
              offshore wind energy.
            </Text>
          </Stack>
          <Link
            mt={4}
            color="blue.400"
            href="https://www.spglobal.com/marketintelligence/en/news-insights/research/us-renewable-energy-credit-market-size-to-double-to-26-billion-by-2030#:~:text=The%20REC%20market%20as%20of,to%20%2426.5%20billion%20by%202030">
            Learn more about the REC market
          </Link>
        </VStack>

        <VStack
          boxShadow="lg"
          p={8}
          borderRadius="lg"
          h="100%"
          border="1px"
          borderColor="gray.50"
          bg="gray.50">
          <Box>
            <Image maxH="240px" h="100%" w="auto" src={ourSolution} />
          </Box>
          <Box display="flex" flexDir="column" justifyContent="flex-start">
            <Text fontWeight="bold" textAlign="center" fontSize="2xl">
              Missing in the REC Market
            </Text>
          </Box>
          <Divider orientation="horizontal" mb={4} />
          <Stack spacing={4}>
            <Text color="gray.500">
              The REC trading market faces a lack of transparency, primarily due to regional and
              organizational disparities.
            </Text>
            <Text color="gray.500">
              Challenges include unclear information about REC origins, inconsistent market data,
              pricing variations through brokers, and a fragmented verification processes. These
              issues can lead to uncertainties and extended transaction times, highlighting the need
              for a comprehensive solution to enhance transparency and streamline REC trading.
            </Text>
          </Stack>
        </VStack>
      </SimpleGrid>
    </Box>
  );
};

export default MissionStatements;
