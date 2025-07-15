import {
  Box,
  Card,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
  Badge,
} from '@chakra-ui/react';
import type { GalleryProject } from "../types";

interface GalleryCardProps {
  project: GalleryProject;
  'data-testid'?: string;
}

export default function GalleryCard({ project, 'data-testid': testId = 'gallery-card' }: GalleryCardProps) {
  return (
    <Card.Root data-testid={testId} shadow="lg">
      <Card.Body p={0}>
        <SimpleGrid columns={2} gap={0}>
          <Box position="relative" data-testid={`${testId}-before`}>
            <Image
              src={project.before.src}
              alt={project.before.title}
              w="full"
              h={64}
              objectFit="cover"
            />
            <Badge
              position="absolute"
              top={2}
              left={2}
              colorScheme="red"
              variant="solid"
              data-testid={`${testId}-before-badge`}
            >
              BEFORE
            </Badge>
          </Box>
          <Box position="relative" data-testid={`${testId}-after`}>
            <Image
              src={project.after.src}
              alt={project.after.title}
              w="full"
              h={64}
              objectFit="cover"
            />
            <Badge
              position="absolute"
              top={2}
              right={2}
              colorScheme="green"
              variant="solid"
              data-testid={`${testId}-after-badge`}
            >
              AFTER
            </Badge>
          </Box>
        </SimpleGrid>
        <Box p={6}>
          <VStack align="start" gap={3}>
            <Heading as="h3" size="md" data-testid={`${testId}-service`}>
              {project.service}
            </Heading>
            <Text fontSize="sm" color="gray.500" data-testid={`${testId}-meta`}>
              {project.location} • Completed in {project.completionTime}
            </Text>
            <VStack align="start" gap={2} fontSize="sm">
              <Text fontWeight="semibold" color="red.600" data-testid={`${testId}-before-title`}>
                Before: {project.before.title}
              </Text>
              <Text color="gray.600" data-testid={`${testId}-before-description`}>
                {project.before.description}
              </Text>
              <Text fontWeight="semibold" color="green.600" data-testid={`${testId}-after-title`}>
                After: {project.after.title}
              </Text>
              <Text color="gray.600" data-testid={`${testId}-after-description`}>
                {project.after.description}
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Card.Body>
    </Card.Root>
  );
} 