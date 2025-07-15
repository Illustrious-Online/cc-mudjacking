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
    <Card.Root data-testid={testId} shadow="lg" p={6}>
      <VStack align="start" gap={4}>
        <HStack gap={3}>
          <Box
            w={10}
            h={10}
            borderRadius="full"
            overflow="hidden"
            bg="gray.200"
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
          <VStack align="start" gap={0}>
            <Text fontWeight="semibold" data-testid={`${testId}-name`}>
              {testimonial.name}
            </Text>
            <Text fontSize="sm" color="gray.500" data-testid={`${testId}-location`}>
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
            color="brand.300"
            boxSize={6}
            position="absolute"
            top={-2}
            left={-2}
            data-testid={`${testId}-quote-icon`}
          />
          <Text fontSize="md" color="gray.700" pl={6} data-testid={`${testId}-text`}>
            {testimonial.text}
          </Text>
        </Box>
        
        <Badge colorScheme="brand" variant="subtle" data-testid={`${testId}-service`}>
          {testimonial.service}
        </Badge>
      </VStack>
    </Card.Root>
  );
} 