import {
  Badge,
  Box,
  Card,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaQuoteLeft } from 'react-icons/fa';
import { Testimonial } from "../types";
import StarRating from './star-rating';

interface TestimonialCardProps {
  testimonial: Testimonial;
  'data-testid'?: string;
}

export default function TestimonialCard({ 
  testimonial, 
  'data-testid': testId = 'testimonial-card' 
}: TestimonialCardProps) {
  return (
    <Card.Root 
      data-testid={testId} 
      shadow="elevation1"
      borderRadius="large"
      overflow="hidden"
      p={6}
      _hover={{
        shadow: "elevation3",
        transform: "translateY(-4px)",
      }}
      transition="all 0.3s ease-in-out"
    >
      <VStack align="start" gap={6}>
        <HStack gap={4}>
          <Box
            w={12}
            h={12}
            borderRadius="full"
            overflow="hidden"
            bg="surfaceVariant"
            boxShadow="elevation1"
            data-testid={`${testId}-avatar`}
          >
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              w="full"
              h="full"
              objectFit="cover"
            />
          </Box>
          <VStack align="start" gap={1}>
            <Text 
              fontWeight="medium"
              fontSize="titleMedium"
              lineHeight="titleMedium"
              letterSpacing="titleMedium"
              color="onSurface"
              data-testid={`${testId}-name`}
            >
              {testimonial.name}
            </Text>
            <Text 
              fontSize="bodyMedium" 
              color="onSurfaceVariant"
              lineHeight="bodyMedium"
              letterSpacing="bodyMedium"
              data-testid={`${testId}-location`}
            >
              {testimonial.location}
            </Text>
            <StarRating 
              rating={testimonial.rating} 
              data-testid={`${testId}-rating`}
            />
          </VStack>
        </HStack>
        
        <Box position="relative" data-testid={`${testId}-quote`}>
          <Icon
            as={FaQuoteLeft}
            color="primary"
            boxSize={6}
            position="absolute"
            top={-2}
            left={-2}
            data-testid={`${testId}-quote-icon`}
          />
          <Text 
            fontSize="bodyLarge" 
            color="onSurface"
            lineHeight="bodyLarge"
            letterSpacing="bodyLarge"
            pl={8} 
            data-testid={`${testId}-text`}
          >
            {testimonial.text}
          </Text>
        </Box>
        
        <Badge 
          bg="primaryContainer" 
          color="onPrimaryContainer"
          borderRadius="medium"
          px={3}
          py={1}
          fontSize="labelSmall"
          fontWeight="medium"
          letterSpacing="labelSmall"
          data-testid={`${testId}-service`}
        >
          {testimonial.service}
        </Badge>
      </VStack>
    </Card.Root>
  );
} 