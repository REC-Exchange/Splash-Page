import { Box, Divider, HStack, SimpleGrid, StackDivider } from '@chakra-ui/react';
import FeatureCard from '../components/FeatureCard';
import sunRiseCircular from '../assets/rec-circular.png';
import solarCircular from '../assets/solar-green-circular.png';

const WhatIsRec = () => {
  const content = [
    {
      imgSrc: sunRiseCircular,
      title: 'Renewable Energy Certificates',
      subtitle: 'Empowering Green Energy Adoption',
      body: 'Participate in the green energy movement by buying and selling RECs through our marketplace. These certificates represent the environmental attributes of renewable energy generation, supporting clean energy projects and reducing global carbon footprints.'
    },

    {
      imgSrc: sunRiseCircular,
      title: 'Green Energy Projects',
      subtitle: 'Catalyzing Sustainability',
      body: 'Connect with renewable energy producers and conscious consumers to promote eco-friendly initiatives. Earn RECs for each unit of clean energy generated, contributing to a faster transition to sustainable energy sources and a greener world.'
    },

    {
      imgSrc: sunRiseCircular,
      title: 'Transparency and Traceability',
      subtitle: 'Ensuring Trust in REC Transactions',
      body: 'Our blockchain-based platform guarantees transparency and authenticity in REC transactions. Every certificate bought or sold corresponds to verified renewable energy, empowering the growth of the green energy sector with confidence.'
    },

    {
      imgSrc: sunRiseCircular,
      title: 'Carbon Footprint Offset',
      subtitle: 'Taking Action Against Climate Change',
      body: 'Offset your carbon footprint responsibly by purchasing RECs. Support clean energy generation and make a real impact in building a cleaner, greener planet. Join the collective effort to combat climate change and create a sustainable future for all.'
    }
  ];

  return (
    <Box py={24} px={16}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="8" maxW="8xl" mx="auto">
        {content.map((content, i) => (
          <Box key={i}>
            <FeatureCard {...content} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default WhatIsRec;
