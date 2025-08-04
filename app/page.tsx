'use client';

import {
  Box,
  Card,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaBuilding, FaClock, FaHome, FaPhone, FaShieldAlt, FaTools } from 'react-icons/fa';
import CallToActionButtons from '@/components/ui/call-to-action-buttons';
import NavLink from '@/components/ui/nav-link';
import { buttonStyles, cardStyles, iconBoxStyles } from '@/components/ui/shared-styles';
import Wrapper from '@/components/ui/wrapper';
import { FREE_ESTIMATE, PHONE_NUMBER } from './constants';

// Data constants
const SERVICES = [
  {
    icon: FaHome,
    title: 'Residential',
    description:
      'Lift sunken driveways, sidewalks, patios, and garage floors with precision and care.',
    features: ['Driveways & Walkways', 'Patio & Pool Decks', 'Garage Floors', 'Void Filling'],
  },
  {
    icon: FaBuilding,
    title: 'Environmentally Friendly',
    description:
      'We use only water and mud/sand mixtures to fix settlements without harming the environment.',
    features: ['Water-Based Solutions', 'No Chemicals'],
  },
  {
    icon: FaTools,
    title: 'Floating Concrete',
    description:
      'Specialized in lifting and leveling any floating concrete pads without foundation/structural dependency.',
    features: ['Any Floating Slabs'],
  },
];

const BEFORE_AFTER_IMAGES = [
  {
    src: '/projects/1/before-1.jpg',
    title: 'BEFORE: Sunken Patio & Stairs',
    description: 'Unsafe settlement causing trip hazards',
    type: 'before' as const,
  },
  {
    src: '/projects/1/after-1.jpg',
    title: 'AFTER: Leveled Patio & Stairs',
    description: 'Professional mudjacking restoration',
    type: 'after' as const,
  },
  {
    src: '/projects/1/after-2.jpg',
    title: 'COMPLETED: Patio & Stairs',
    description: 'Permanent solution with guarantee',
    type: 'after' as const,
  },
];

// Hero button styles
const primaryHeroButton = {
  ...buttonStyles.large,
  variant: 'solid' as const,
  colorScheme: 'white' as const,
  boxShadow: 'elevation3',
  _hover: {
    ...buttonStyles.base._hover,
    boxShadow: 'elevation3',
  },
};

const secondaryHeroButton = {
  ...buttonStyles.large,
  variant: 'outline' as const,
  colorScheme: 'white' as const,
  borderWidth: '2px',
  fontWeight: 'medium' as const,
  boxShadow: 'elevation2',
  _hover: {
    ...buttonStyles.base._hover,
    boxShadow: 'elevation2',
  },
};

export default function HomePage() {
  return (
    <Wrapper>
      {/* Hero Section */}
      <Box mx="auto" py={20} px={6} bg="#e12f01" color="white" position="relative">
        <Container maxW="7xl" position="relative" zIndex={1}>
          <Flex width="full" direction={{ base: 'column', lg: 'row' }} gap={12} alignItems="center">
            <VStack
              px={{ base: 4, md: 8 }}
              justifyContent="center"
              alignItems={{ base: 'center', lg: 'start' }}
              textAlign={{ base: 'center', lg: 'left' }}
              flex={1}
            >
              <Heading
                as="h1"
                fontSize={{ base: 'displaySmall', md: 'displayMedium', lg: 'displayLarge' }}
                fontWeight="bold"
                lineHeight={{ base: 'displaySmall', md: 'displayMedium', lg: 'displayLarge' }}
                letterSpacing={{ base: 'displaySmall', md: 'displayMedium', lg: 'displayLarge' }}
                mb={6}
                color="white"
              >
                Professional Mudjacking Services
              </Heading>
              <Heading
                as="h2"
                fontSize={{ base: 'headlineMedium', md: 'headlineLarge' }}
                fontWeight="medium"
                lineHeight={{ base: 'headlineMedium', md: 'headlineLarge' }}
                letterSpacing={{ base: 'headlineMedium', md: 'headlineLarge' }}
                mb={8}
                opacity={0.9}
                color="white"
              >
                If it doesn't move, you don't pay!
              </Heading>
              <Text
                fontSize={{ base: 'bodyLarge', md: 'titleLarge' }}
                lineHeight={{ base: 'bodyLarge', md: 'titleLarge' }}
                letterSpacing={{ base: 'bodyLarge', md: 'titleLarge' }}
                mb={10}
                opacity={0.8}
                maxW="2xl"
                color="white"
              >
                Fast, affordable, and permanent solutions for sunken concrete. Trusted by
                environmentally conscious homeowners.
              </Text>

              <HStack
                gap={6}
                flexWrap="wrap"
                justifyContent={{ base: 'center', lg: 'start' }}
                mb={10}
              >
                <NavLink href="/contact" buttonProps={primaryHeroButton}>
                  {FREE_ESTIMATE}
                </NavLink>
                <NavLink href="tel:6416919999" buttonProps={secondaryHeroButton}>
                  <FaPhone />
                  <span style={{ fontSize: '14px', marginLeft: '12px', fontWeight: '500' }}>
                    {PHONE_NUMBER}
                  </span>
                </NavLink>
              </HStack>

              <HStack
                gap={8}
                fontSize="bodyMedium"
                flexWrap="wrap"
                justifyContent={{ base: 'center', lg: 'start' }}
              >
                <HStack gap={3}>
                  <Icon as={FaShieldAlt} boxSize={6} color="white" />
                  <Text fontWeight="medium" color="white">
                    Fully Insured
                  </Text>
                </HStack>
                <HStack gap={3}>
                  <Icon as={FaClock} boxSize={6} color="white" />
                  <Text fontWeight="medium" color="white">
                    Speedy Response
                  </Text>
                </HStack>
              </HStack>
            </VStack>

            <Box flex={1} display="flex" justifyContent="center">
              <Box
                position="relative"
                borderRadius="large"
                overflow="hidden"
                boxShadow="elevation4"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: 'elevation5',
                }}
                transition="all 0.3s ease-in-out"
              >
                <Image
                  src="/main-hero.jpeg"
                  alt="Professional mudjacking equipment and team working on concrete"
                  w="full"
                  maxW="600px"
                  objectFit="cover"
                />
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Services Overview */}
      <Box py={24} bg="surface">
        <Container maxW="7xl">
          <VStack gap={20}>
            <VStack textAlign="center" gap={8} maxW="4xl" mx="auto">
              <Heading
                color="primary.80"
                as="h2"
                fontSize={{ base: 'headlineMedium', md: 'headlineLarge' }}
                fontWeight="bold"
                lineHeight={{ base: 'headlineMedium', md: 'headlineLarge' }}
                letterSpacing={{ base: 'headlineMedium', md: 'headlineLarge' }}
              >
                Our Professional Services
              </Heading>
              <Text
                fontSize="bodyLarge"
                lineHeight="bodyLarge"
                letterSpacing="bodyLarge"
                color="onSurfaceVariant"
              >
                We provide professional, personalized mudjacking and concrete leveling services
                designed to restore your property safely and efficiently.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap={10} w="full">
              {SERVICES.map((service) => (
                <Card.Root key={service.title} {...cardStyles.service}>
                  <Card.Body p={8}>
                    <VStack align="start" gap={6}>
                      <Box {...iconBoxStyles.service}>
                        <Icon color="primary.80" as={service.icon} boxSize={10} />
                      </Box>
                      <Heading
                        as="h3"
                        fontSize="titleLarge"
                        fontWeight="bold"
                        lineHeight="titleLarge"
                        letterSpacing="titleLarge"
                        color="onSurface"
                      >
                        {service.title}
                      </Heading>
                      <Text
                        fontSize="bodyLarge"
                        lineHeight="bodyLarge"
                        letterSpacing="bodyLarge"
                        color="onSurfaceVariant"
                      >
                        {service.description}
                      </Text>
                      <VStack align="start" gap={3} fontSize="bodyMedium">
                        {service.features.map((feature) => (
                          <Text key={feature} display="flex" alignItems="center" gap={3}>
                            <Box
                              w={3}
                              h={3}
                              bg="primary.80"
                              borderRadius="full"
                              boxShadow="elevation1"
                            />
                            {feature}
                          </Text>
                        ))}
                      </VStack>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>

            {/* Before & After Gallery */}
            <VStack gap={16} w="full">
              <VStack gap={8}>
                <Heading
                  as="h3"
                  fontSize={{ base: 'headlineSmall', md: 'headlineMedium' }}
                  fontWeight="bold"
                  lineHeight={{ base: 'headlineSmall', md: 'headlineMedium' }}
                  letterSpacing={{ base: 'headlineSmall', md: 'headlineMedium' }}
                  textAlign="center"
                  color="primary.80"
                >
                  Before & After Results
                </Heading>
                <Text
                  fontSize="bodyLarge"
                  lineHeight="bodyLarge"
                  letterSpacing="bodyLarge"
                  color="onSurfaceVariant"
                  textAlign="center"
                  maxW="2xl"
                >
                  See more examples of our work in our comprehensive gallery
                </Text>
              </VStack>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="full">
                {BEFORE_AFTER_IMAGES.map((image) => (
                  <Card.Root key={image.src} {...cardStyles.gallery}>
                    <Box position="relative" overflow="hidden">
                      <Image
                        src={image.src}
                        alt={image.description}
                        w="full"
                        h={64}
                        objectFit="cover"
                      />
                    </Box>
                    <Card.Body p={6}>
                      <Heading
                        as="h4"
                        fontSize="titleMedium"
                        fontWeight="bold"
                        lineHeight="titleMedium"
                        letterSpacing="titleMedium"
                        color={image.type === 'before' ? 'primary.80' : 'green'}
                        mb={3}
                      >
                        {image.title}
                      </Heading>
                      <Text
                        fontSize="bodyMedium"
                        lineHeight="bodyMedium"
                        letterSpacing="bodyMedium"
                        color="onSurfaceVariant"
                      >
                        {image.description}
                      </Text>
                    </Card.Body>
                  </Card.Root>
                ))}
              </SimpleGrid>
              <NavLink
                href="/gallery"
                buttonProps={{
                  ...buttonStyles.large,
                  variant: 'outline',
                  colorScheme: 'primary',
                  borderWidth: '2px',
                  _hover: {
                    ...buttonStyles.base._hover,
                    boxShadow: 'elevation2',
                  },
                }}
              >
                View Full Gallery
              </NavLink>
            </VStack>

            <CallToActionButtons />
          </VStack>
        </Container>
      </Box>
    </Wrapper>
  );
}
