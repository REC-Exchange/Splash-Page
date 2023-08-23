import { Box, SimpleGrid } from '@chakra-ui/react';
import FeatureCard from '../../../components/FeatureCard';
import importanceOfRecs from '../../../assets/importance-of-recs.png';
import missingInTheMarket from '../../../assets/missing-in-the-rec-market.png';
import ourSolution from '../../../assets/our-solution.png';

const MissionStatements = () => {
  const content = [
    {
      imgSrc: importanceOfRecs,
      title: 'The Importance of RECs',
      subtitle: 'Driving Renewable Energy Adoption',
      body: 'RECs are a marketable commodity that are in demand with electric utilities and large and small electricity consumers (e.g., residential, commercial, and industrial) who want to support and demonstrate their use of renewable energy, which affects market prices. They are sought after for several reasons, including: 1) Renewable Energy Goals; 2) Compliance; and 3)Environmental Claims.'
    },
    {
      imgSrc: missingInTheMarket,
      title: 'Missing in the REC Market',
      subtitle: 'Challenges in Trading Transparency',
      body: 'Transparency in the Renewable Energy Certificate (REC) trading market can vary depending on the region and the platforms involved. A few examples of how transparency in REC trading may be lacking includes: 1) Lack of Information on REC Origins; 2) Limited Market Data; and 3) Verification and Authenticity. This lack of transparency can create uncertainties and risks for buyers.'
    },

    {
      imgSrc: ourSolution,
      title: 'Our Solution',
      subtitle: 'Enhancing REC Trading Transparency',
      body: 'By providing additional information on project details, market data, and verification processes, our platform significantly enhances transparency in REC trading. This transparency empowers buyers to make informed decisions, promotes trust in the market, and facilitates efficient transactions between buyers and sellers.'
    }
  ];

  return (
    <Box py={24} px={16}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="8" maxW="8xl" mx="auto">
        {content.map((content, i) => (
          <FeatureCard {...content} key={i} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default MissionStatements;
