import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';

interface GalleryHeroProps {
  title: string;
  description: string;
  'data-testid'?: string;
}

export default function GalleryHero({ 
  title, 
  description, 
  'data-testid': testId = 'gallery-hero' 
}: GalleryHeroProps) {
  return (
    <Box
      mx="auto"
      py={12}
      px={6}
      bgGradient="to-r"
      gradientFrom="brand.500"
      gradientTo="brand.700"
      data-testid={testId}
    >
      <Container maxW="7xl">
        <VStack textAlign="center" gap={6}>
          <Heading as="h1" size="2xl" fontWeight="bold" color="brand.200" data-testid={`${testId}-title`}>
            {title}
          </Heading>
          <Text fontSize="xl" color="brand.50" maxW="4xl" data-testid={`${testId}-description`}>
            {description}
          </Text>
        </VStack>
      </Container>
    </Box>
  );
} 