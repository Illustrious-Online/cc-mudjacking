import {
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import type { IconType } from 'react-icons';
import type { GalleryProject } from "../types";
import GalleryCard from './gallery-card';

interface GallerySectionProps {
  title: string;
  icon: IconType;
  projects: GalleryProject[];
  bgColor?: string;
  'data-testid'?: string;
}

export default function GallerySection({
  title,
  icon,
  projects,
  bgColor = 'surface',
  'data-testid': testId = 'gallery-section',
}: GallerySectionProps) {
  return (
    <Box py={20} bg={bgColor} data-testid={testId}>
      <Container maxW="7xl">
        <VStack gap={16}>
          <VStack textAlign="center" gap={6} maxW="4xl" mx="auto" data-testid={`${testId}-header`}>
            <Heading 
              color="primary.80" 
              as="h2" 
              fontSize={{ base: 'headlineMedium', md: 'headlineLarge' }}
              fontWeight="bold"
              lineHeight={{ base: 'headlineMedium', md: 'headlineLarge' }}
              letterSpacing={{ base: 'headlineMedium', md: 'headlineLarge' }}
              data-testid={`${testId}-title`}
            >
              {title}
            </Heading>
            <Text 
              fontSize="bodyLarge"
              lineHeight="bodyLarge"
              letterSpacing="bodyLarge"
              color="onSurfaceVariant" 
              maxW="3xl" 
              data-testid={`${testId}-description`}
            >
              Browse through our completed {title.toLowerCase()} projects. Each project showcases our 
              commitment to quality, safety, and customer satisfaction.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8} w="full" data-testid={`${testId}-grid`}>
            {projects.map((project) => (
              <GalleryCard
                key={project.id}
                project={project}
                data-testid={`${testId}-card-${project.id}`}
              />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
} 