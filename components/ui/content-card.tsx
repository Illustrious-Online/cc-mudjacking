"use client";

import { Box, Card, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { cardStyles } from './shared-styles';

interface ContentCardProps {
  children: ReactNode;
  variant?: 'service' | 'gallery' | 'contact';
  padding?: number;
  align?: 'start' | 'center' | 'end';
  gap?: number;
}

export default function ContentCard({ 
  children, 
  variant = 'service', 
  padding = 8, 
  align = 'start',
  gap = 6 
}: ContentCardProps) {
  // Use the appropriate card style based on variant
  const cardStyle = variant === 'gallery' ? cardStyles.gallery : cardStyles.service;
  
  return (
    <Card.Root {...cardStyle}>
      <Card.Body p={padding}>
        <VStack align={align} gap={gap}>
          {children}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
} 