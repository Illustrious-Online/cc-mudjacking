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
import NavLink from '@/components/ui/nav-link';
import Wrapper from '@/components/ui/wrapper';

export default function HomePage() {
  const services = [
    {
      icon: FaHome,
      title: 'Residential',
      description:
        'Lift sunken driveways, sidewalks, patios, and garage floors with precision and care.',
      features: ['Driveways & Walkways', 'Patio & Pool Decks', 'Garage Floors', 'Any Concrete'],
    },
    {
      icon: FaBuilding,
      title: 'Environmentally Friendly',
      description: 'We use only water and mud/sand mixtures to fix settlements without harming the environment.',
      features: ['Water-Based Solutions', 'No Chemicals', 'No Digging'],
    },
    {
      icon: FaTools,
      title: 'Floating Concrete',
      description:
        'Specialized in lifting and leveling any floating concrete pads without foundation/structural dependency.',
      features: ['Any Floating Slabs', 'No Foundation Work', 'No Structural Concrete'],
    },
  ];

  const beforeAfterImages = [
    {
      src: '/projects/1/before-1.jpg',
      title: 'BEFORE: Sunken Patio & Stairs',
      description: 'Unsafe settlement causing trip hazards',
      type: 'before',
    },
    {
      src: '/projects/1/after-1.jpg',
      title: 'AFTER: Leveled Patio & Stairs',
      description: 'Professional mudjacking restoration',
      type: 'after',
    },
    {
      src: '/projects/1/after-2.jpg',
      title: 'COMPLETED: Patio & Stairs',
      description: 'Permanent solution with guarantee',
      type: 'after',
    },
  ];

  return (
    <Wrapper>
      <Box
        mx="auto"
        py={12}
        px={6}
        bgGradient="to-r"
        gradientFrom="brand.500"
        gradientTo="brand.700"
      >
        <Container maxW="7xl">
          <Flex width="full" direction={{ base: 'column', md: 'row' }}>
            <VStack px={12} justifyContent="center">
              <Heading as="h1" size="2xl" fontWeight="bold" textAlign="center" color="brand.200">
                Professional Mudjacking Services
              </Heading>
              <Text fontSize="xl" color="brand.50" textAlign="center" my={4}>
                Fast, affordable, and permanent solutions for sunken concrete. Trusted by
                environmentally conscious homeowners.
              </Text>
              <HStack gap={4} flexWrap="wrap">
                <NavLink
                  href="/contact"
                  buttonProps={{
                    size: 'lg',
                    variant: 'solid',
                    colorScheme: 'white',
                  }}
                >
                  Get Free Estimate
                </NavLink>
              </HStack>

              <HStack gap={6} fontSize="sm" flexWrap="wrap" mt={4}>
                <HStack>
                  <Icon as={FaShieldAlt} />
                  <Text>Fully Licensed & Insured</Text>
                </HStack>
                <HStack>
                  <Icon as={FaClock} />
                  <Text>Same Day Response</Text>
                </HStack>
              </HStack>
            </VStack>
            <Box>
              <Image
                src="/main-hero.jpeg"
                alt="Professional mudjacking equipment and team working on concrete"
                borderRadius="xl"
                shadow="2xl"
                w="full"
                mt={{ base: 12, md: 0 }}
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Services Overview */}
      <Box py={16}>
        <Container maxW="7xl">
          <VStack gap={12}>
            <VStack textAlign="center" gap={4}>
              <Heading color="brand.500" as="h2" size="xl">
                Our Professional Services
              </Heading>
              <Text fontSize="lg" color="gray.500" maxW="5xl">
                We provide professional, personalized mudjacking and concrete leveling services
                designed to restore your property safely and efficiently. Our environmentally
                friendly methods ensure minimal disruption and lasting results, all delivered by a
                licensed and insured team you can trust.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="full">
              {services.map((service) => (
                <Card.Root
                  key={`service-${service.title}`}
                  shadow="lg"
                  _hover={{ shadow: 'xl' }}
                  transition="all 0.2s"
                >
                  <Card.Body>
                    <VStack align="start" gap={4}>
                      <Box
                        w={12}
                        h={12}
                        bg="brand.500"
                        borderRadius="lg"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={service.icon} color="white" boxSize={6} />
                      </Box>
                      <Heading as="h3" size="md">
                        {service.title}
                      </Heading>
                      <Text color="gray.500">{service.description}</Text>
                      <VStack align="start" gap={1} fontSize="sm" color="gray.500">
                        {service.features.map((feature) => (
                          <Text key={feature}>• {feature}</Text>
                        ))}
                      </VStack>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>

            {/* Before & After Gallery */}
            <VStack gap={8} w="full">
              <VStack gap={4}>
                <Heading as="h3" size="lg" textAlign="center">
                  Before & After Results
                </Heading>
                <Text fontSize="md" color="gray.500" textAlign="center">
                  See more examples of our work in our comprehensive gallery
                </Text>
              </VStack>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} w="full">
                {beforeAfterImages.map((image) => (
                  <Card.Root key={`before-after-${image.src}`} overflow="hidden">
                    <Image
                      src={image.src}
                      alt={image.description}
                      w="full"
                      h={48}
                      objectFit="cover"
                    />
                    <Card.Body p={4}>
                      <Heading
                        as="h4"
                        size="sm"
                        color={image.type === 'before' ? 'red.600' : 'green.600'}
                        mb={2}
                      >
                        {image.title}
                      </Heading>
                      <Text fontSize="sm" color="gray.500">
                        {image.description}
                      </Text>
                    </Card.Body>
                  </Card.Root>
                ))}
              </SimpleGrid>
              <NavLink
                href="/gallery"
                buttonProps={{
                  size: 'md',
                  variant: 'outline',
                  colorScheme: 'brand',
                }}
              >
                View Full Gallery
              </NavLink>
            </VStack>

            <NavLink
              href="/contact"
              buttonProps={{
                size: 'lg',
                variant: 'solid',
                colorScheme: 'brand',
              }}
            >
              Get Your Free Estimate Today
            </NavLink>
          </VStack>
        </Container>
      </Box>
    </Wrapper>
  );
}
