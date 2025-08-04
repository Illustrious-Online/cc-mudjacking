"use client";

import { SimpleGrid } from '@chakra-ui/react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import ContactInfoCard from './contact-info-card';
import { PHONE_NUMBER } from '@/app/constants';

const CONTACT_INFO = [
  {
    icon: FaPhone,
    title: 'Phone',
    content: PHONE_NUMBER,
    href: `tel:${PHONE_NUMBER}`,
  },
  {
    icon: FaEnvelope,
    title: 'Email',
    content: 'ccmudjacking@gmail.com',
    href: 'mailto:ccmudjacking@gmail.com',
  },
  {
    icon: FaMapMarkerAlt,
    title: 'Service Area',
    content: 'Central Iowa',
    href: null,
  },
];

export default function ContactInfoSection() {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={10} w="full">
      {CONTACT_INFO.map((info) => (
        <ContactInfoCard
          key={info.title}
          icon={info.icon}
          title={info.title}
          content={info.content}
          href={info.href}
        />
      ))}
    </SimpleGrid>
  );
} 