import { Box, Container, VStack } from '@chakra-ui/react';
import type { Metadata } from 'next';
import ContactForm from '@/components/ui/contact-form';
import ContactInfoSection from '@/components/ui/contact-info-section';
import { Hero } from '@/components/ui/hero';
import SectionHeader from '@/components/ui/section-header';
import Wrapper from '@/components/ui/wrapper';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact CC Mudjacking - Get Your Free Estimate Today',
  description:
    'Contact CC Mudjacking for professional concrete leveling and mudjacking services. Get your free estimate today! Call (641) 691-9999 or fill out our contact form.',
  path: '/contact',
  images: [
    {
      url: '/main-hero.jpeg',
      width: 1200,
      height: 630,
      alt: 'Contact CC Mudjacking for professional concrete services',
    },
  ],
});

export default function ContactPage() {
  return (
    <Wrapper>
      <Hero
        title="Contact Us"
        description="Get your free estimate today! Our team is ready to help you with all your concrete lifting and mudjacking needs."
        testId="contact-hero"
      />

      {/* Contact Form Section */}
      <Box py={24} bg="background">
        <Container maxW="7xl">
          <VStack gap={20}>
            {/* Contact Form */}
            <SectionHeader
              title="Request Your Free Estimate"
              description="Fill out the form below and we'll get back to you within 24 hours with a free estimate."
            />

            <ContactForm />

            {/* Contact Information Cards */}
            <SectionHeader
              title="Get In Touch"
              description="Reach out to us for a free estimate or to discuss your concrete leveling needs."
            />

            <ContactInfoSection />
          </VStack>
        </Container>
      </Box>
    </Wrapper>
  );
}
