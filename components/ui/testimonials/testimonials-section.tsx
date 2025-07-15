import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Testimonial } from "../types";
import TestimonialCard from './testimonial-card';
import NavLink from '@/components/ui/nav-link';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  'data-testid'?: string;
}

export default function TestimonialsSection({
  testimonials,
  title = 'What Our Customers Say',
  description = 'Don\'t just take our word for it. Here\'s what our satisfied customers have to say about their experience with our mudjacking services.',
  ctaText = 'Get Your Free Estimate',
  ctaHref = '/contact',
  'data-testid': testId = 'testimonials-section',
}: TestimonialsSectionProps) {
  return (
    <Box py={16} data-testid={testId}>
      <Container maxW="7xl">
        <VStack gap={12}>
          <VStack textAlign="center" gap={4} data-testid={`${testId}-header`}>
            <Heading color="brand.500" as="h2" size="xl" data-testid={`${testId}-title`}>
              {title}
            </Heading>
            <Text fontSize="lg" color="gray.500" maxW="3xl" data-testid={`${testId}-description`}>
              {description}
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} w="full" data-testid={`${testId}-grid`}>
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                data-testid={`${testId}-card-${testimonial.id}`}
              />
            ))}
          </SimpleGrid>

          <VStack gap={6} data-testid={`${testId}-cta`}>
            <Text fontSize="lg" textAlign="center" color="gray.600" data-testid={`${testId}-cta-text`}>
              Ready to see similar results on your property?
            </Text>
            <NavLink
              href={ctaHref}
              buttonProps={{
                size: 'lg',
                variant: 'solid',
                colorScheme: 'brand',
              }}
              data-testid={`${testId}-cta-button`}
            >
              {ctaText}
            </NavLink>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
} 