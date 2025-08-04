"use client";

import { Heading, Text, VStack } from '@chakra-ui/react';

interface SectionHeaderProps {
  title: string;
  description: string;
  maxWidth?: string;
}

export default function SectionHeader({ title, description, maxWidth = "4xl" }: SectionHeaderProps) {
  return (
    <VStack textAlign="center" gap={8} maxW={maxWidth} mx="auto">
      <Heading 
        color="primary.80" 
        as="h2" 
        fontSize={{ base: 'headlineMedium', md: 'headlineLarge' }}
        fontWeight="bold"
        lineHeight={{ base: 'headlineMedium', md: 'headlineLarge' }}
        letterSpacing={{ base: 'headlineMedium', md: 'headlineLarge' }}
      >
        {title}
      </Heading>
      <Text 
        fontSize="bodyLarge"
        lineHeight="bodyLarge"
        letterSpacing="bodyLarge"
        color="onSurfaceVariant"
      >
        {description}
      </Text>
    </VStack>
  );
} 