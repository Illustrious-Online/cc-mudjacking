import { Container, VStack, Heading, Text, Box } from "@chakra-ui/react"

type HeroProps = {
  title: string;
  description: string;
  testId: string;
}

export const Hero = ({ title, description, testId }: HeroProps) => (
  <Box
    mx="auto"
    py={20}
    px={6}
    bg="primary.80"
    color="white"
    position="relative"
    data-testid={testId}
  >
    <Container maxW="7xl" position="relative" zIndex={1}>
      <VStack textAlign="center" gap={8}>
        <Heading 
          as="h1" 
          fontSize={{ base: 'displaySmall', md: 'displayMedium', lg: 'displayLarge' }}
          fontWeight="bold"
          lineHeight={{ base: 'displaySmall', md: 'displayMedium', lg: 'displayLarge' }}
          letterSpacing={{ base: 'displaySmall', md: 'displayMedium', lg: 'displayLarge' }}
          color="white"
          data-testid={`${testId}-title`}
        >
          {title}
        </Heading>
        <Text 
          fontSize={{ base: 'bodyLarge', md: 'titleLarge' }}
          lineHeight={{ base: 'bodyLarge', md: 'titleLarge' }}
          letterSpacing={{ base: 'bodyLarge', md: 'titleLarge' }}
          color="white"
          opacity={0.8}
          maxW="4xl" 
          data-testid={`${testId}-description`}
        >
          {description}
        </Text>
      </VStack>
    </Container>
  </Box>
)