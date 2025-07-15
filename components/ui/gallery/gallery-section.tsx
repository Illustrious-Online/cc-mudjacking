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
  bgColor = 'transparent',
  'data-testid': testId = 'gallery-section',
}: GallerySectionProps) {
  return (
    <Box py={16} bg={bgColor} data-testid={testId}>
      <Container maxW="7xl">
        <VStack gap={12}>
          <VStack textAlign="center" gap={4} data-testid={`${testId}-header`}>
            <HStack>
              <Icon as={icon} color="brand.500" boxSize={8} data-testid={`${testId}-icon`} />
              <Heading color="brand.500" as="h2" size="xl" data-testid={`${testId}-title`}>
                {title}
              </Heading>
            </HStack>
            <Text fontSize="lg" color="gray.500" maxW="3xl" data-testid={`${testId}-description`}>
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