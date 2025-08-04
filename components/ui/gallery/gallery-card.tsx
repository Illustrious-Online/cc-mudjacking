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
    <Card.Root 
      data-testid={testId} 
      shadow="elevation1"
      borderRadius="large"
      overflow="hidden"
      _hover={{
        shadow: "elevation3",
        transform: "translateY(-4px)",
      }}
      transition="all 0.3s ease-in-out"
    >
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
              top={3}
              left={3}
              bg="neutral.10"
              color="red"
              borderRadius="medium"
              px={3}
              py={1}
              fontSize="labelSmall"
              fontWeight="medium"
              letterSpacing="labelSmall"
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
              top={3}
              right={3}
              bg="neutral.10"
              color="green"
              borderRadius="medium"
              px={3}
              py={1}
              fontSize="labelSmall"
              fontWeight="medium"
              letterSpacing="labelSmall"
              data-testid={`${testId}-after-badge`}
            >
              AFTER
            </Badge>
          </Box>
        </SimpleGrid>
        <Box p={6}>
          <VStack align="start" gap={4}>
            <Heading 
              as="h3" 
              fontSize="titleLarge"
              fontWeight="bold"
              lineHeight="titleLarge"
              letterSpacing="titleLarge"
              color="onSurface"
              data-testid={`${testId}-service`}
            >
              {project.service}
            </Heading>
            <Text 
              fontSize="bodyMedium" 
              color="onSurfaceVariant" 
              lineHeight="bodyMedium"
              letterSpacing="bodyMedium"
              data-testid={`${testId}-meta`}
            >
              {project.location} • Completed in {project.completionTime}
            </Text>
            <VStack align="start" gap={3} fontSize="bodyMedium">
              <Text 
                fontWeight="medium" 
                color="red"
                fontSize="titleSmall"
                lineHeight="titleSmall"
                letterSpacing="titleSmall"
                data-testid={`${testId}-before-title`}
              >
                Before: {project.before.title}
              </Text>
              <Text 
                color="onSurfaceVariant"
                lineHeight="bodyMedium"
                letterSpacing="bodyMedium"
                data-testid={`${testId}-before-description`}
              >
                {project.before.description}
              </Text>
              <Text 
                fontWeight="medium" 
                color="green"
                fontSize="titleSmall"
                lineHeight="titleSmall"
                letterSpacing="titleSmall"
                data-testid={`${testId}-after-title`}
              >
                After: {project.after.title}
              </Text>
              <Text 
                color="onSurfaceVariant"
                lineHeight="bodyMedium"
                letterSpacing="bodyMedium"
                data-testid={`${testId}-after-description`}
              >
                {project.after.description}
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Card.Body>
    </Card.Root>
  );
} 