import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import type { Testimonial } from "../types";
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
    <Box py={20} bg="surface" data-testid={testId}>
      <Container maxW="7xl">
        <VStack gap={16}>
          <VStack textAlign="center" gap={6} maxW="4xl" mx="auto" data-testid={`${testId}-header`}>
            <Heading 
              color="onSurface" 
              as="h2" 
              fontSize={{ base: 'headlineMedium', md: 'headlineLarge' }}
              fontWeight="medium"
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

          <VStack gap={8} data-testid={`${testId}-cta`}>
            <Text 
              fontSize="titleLarge"
              lineHeight="titleLarge"
              letterSpacing="titleLarge"
              textAlign="center" 
              color="onSurface"
              fontWeight="medium"
              data-testid={`${testId}-cta-text`}
            >
              Ready to see similar results on your property?
            </Text>
            <NavLink
              href={ctaHref}
              buttonProps={{
                size: 'lg',
                variant: 'solid',
                colorScheme: 'primary',
                borderRadius: 'full',
                px: 8,
                py: 6,
                fontSize: 'labelLarge',
                fontWeight: 'medium',
                letterSpacing: 'labelLarge',
                boxShadow: 'elevation2',
                _hover: {
                  transform: 'translateY(-2px)',
                  boxShadow: 'elevation4',
                },
                _active: {
                  transform: 'translateY(0px)',
                  boxShadow: 'elevation1',
                },
                transition: 'all 0.2s ease-in-out',
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