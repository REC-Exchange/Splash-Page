import { Box, SimpleGrid } from '@chakra-ui/react';
import FooterCard from '../components/FooterCard';

const Footer = () => {
  const footerContent = [
    {
      title: 'Contact Us',
      subtitle: 'Get in Touch',
      body: "Have questions or inquiries? Reach out to our friendly support team. We're here to assist you with any concerns or feedback you may have. Feel free to drop us an email or give us a call – we'd love to hear from you!"
    },

    {
      title: 'Stay Connected',
      subtitle: 'Join Our Newsletter',
      body: "Subscribe to our newsletter and be the first to receive updates on the latest news, product releases, and exclusive offers. Don't miss out on exciting opportunities and valuable insights into green energy and sustainability."
    },

    {
      title: 'Follow Us',
      subtitle: 'Join Our Social Media Community',
      body: "Connect with us on social media to stay connected with our mission. Follow our profiles for engaging content, industry trends, and tips on adopting a greener lifestyle. Let's inspire change together!"
    }
  ];

  return (
    <Box bg="#182336">
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: footerContent.length }}
        spacing="8"
        maxW="8xl"
        mx="auto"
        py={24}>
        {footerContent.map((content, i) => (
          <FooterCard key={i} {...content} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Footer;
