"use client";

import { Heading, Link, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import ContentCard from './content-card';
import IconBox from './icon-box';

interface ContactInfoCardProps {
  icon: IconType;
  title: string;
  content: string;
  href?: string | null;
}

export default function ContactInfoCard({ icon, title, content, href }: ContactInfoCardProps) {
  return (
    <ContentCard variant="service" align="center">
      <IconBox icon={icon} />
      <Heading 
        as="h3" 
        fontSize="titleLarge"
        fontWeight="bold"
        lineHeight="titleLarge"
        letterSpacing="titleLarge"
        color="onSurface"
      >
        {title}
      </Heading>
      {href ? (
        <Link 
          fontSize="bodyLarge"
          lineHeight="bodyLarge"
          letterSpacing="bodyLarge"
          color="primary.80"
          fontWeight="medium"
          href={href}
          _hover={{ textDecoration: 'underline' }}
          transition="all 0.2s ease-in-out"
        >
          {content}
        </Link>
      ) : (
        <Text 
          fontSize="bodyLarge"
          lineHeight="bodyLarge"
          letterSpacing="bodyLarge"
          color="onSurfaceVariant"
          fontWeight="medium"
        >
          {content}
        </Text>
      )}
    </ContentCard>
  );
} 