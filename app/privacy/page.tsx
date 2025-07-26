'use client';

import { Box, Card, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaShieldAlt } from 'react-icons/fa';
import Wrapper from '@/components/ui/wrapper';
import { PHONE_NUMBER } from '../constants';

export default function PrivacyPage() {
  const currentYear = new Date().getFullYear();

  return (
    <Wrapper>
      <Box py={12} px={6}>
        <Container maxW="4xl">
          <VStack gap={8} align="stretch">
            {/* Header */}
            <VStack textAlign="center" gap={4}>
              <Heading as="h1" size="2xl" color="brand.500">
                Privacy Policy
              </Heading>
              <Text fontSize="lg" color="gray.500">
                Last updated: {currentYear}
              </Text>
            </VStack>

            {/* Privacy Policy Content */}
            <Card.Root shadow="lg">
              <Card.Body p={8}>
                <VStack gap={6} align="stretch">
                  <Box>
                    <Heading as="h2" size="lg" color="brand.500" mb={4}>
                      Introduction
                    </Heading>
                    <Text color="gray.600" lineHeight="tall">
                      CC Mudjacking ("we," "our," or "us") is committed to protecting your privacy.
                      This Privacy Policy explains how we collect, use, disclose, and safeguard your
                      information when you visit our website or use our services.
                    </Text>
                  </Box>

                  <Box>
                    <Heading as="h2" size="lg" color="brand.500" mb={4}>
                      Information We Collect
                    </Heading>
                    <VStack gap={4} align="stretch">
                      <Box>
                        <Heading as="h3" size="md" color="gray.700" mb={2}>
                          Personal Information
                        </Heading>
                        <Text color="gray.600" lineHeight="tall">
                          We may collect personal information that you voluntarily provide to us
                          when you:
                        </Text>
                        <VStack gap={2} mt={2} align="start">
                          <Box display="flex" alignItems="center" gap={2}>
                            <FaEnvelope color="var(--chakra-colors-brand-500)" />
                            <Text color="gray.600">Fill out our contact form</Text>
                          </Box>
                          <Box display="flex" alignItems="center" gap={2}>
                            <FaPhone color="var(--chakra-colors-brand-500)" />
                            <Text color="gray.600">Call us for estimates or services</Text>
                          </Box>
                          <Box display="flex" alignItems="center" gap={2}>
                            <FaMapMarkerAlt color="var(--chakra-colors-brand-500)" />
                            <Text color="gray.600">Request on-site consultations</Text>
                          </Box>
                        </VStack>
                        <Text color="gray.600" mt={3} lineHeight="tall">
                          This information may include your name, email address, phone number,
                          address, and details about your project or service needs.
                        </Text>
                      </Box>

                      <Box>
                        <Heading as="h3" size="md" color="gray.700" mb={2}>
                          Automatically Collected Information
                        </Heading>
                        <Text color="gray.600" lineHeight="tall">
                          When you visit our website, we may automatically collect certain
                          information about your device, including information about your web
                          browser, IP address, time zone, and some of the cookies that are installed
                          on your device.
                        </Text>
                      </Box>
                    </VStack>
                  </Box>

                  <Box>
                    <Heading as="h2" size="lg" color="brand.500" mb={4}>
                      How We Use Your Information
                    </Heading>
                    <Text color="gray.600" lineHeight="tall" mb={3}>
                      We use the information we collect to:
                    </Text>
                    <VStack gap={2} align="start">
                      <Box display="flex" alignItems="center" gap={2}>
                        <FaShieldAlt color="var(--chakra-colors-brand-500)" />
                        <Text color="gray.600">Provide and maintain our services</Text>
                      </Box>
                      <Box display="flex" alignItems="center" gap={2}>
                        <FaShieldAlt color="var(--chakra-colors-brand-500)" />
                        <Text color="gray.600">
                          Respond to your inquiries and provide customer support
                        </Text>
                      </Box>
                      <Box display="flex" alignItems="center" gap={2}>
                        <FaShieldAlt color="var(--chakra-colors-brand-500)" />
                        <Text color="gray.600">Send you estimates and project updates</Text>
                      </Box>
                      <Box display="flex" alignItems="center" gap={2}>
                        <FaShieldAlt color="var(--chakra-colors-brand-500)" />
                        <Text color="gray.600">Improve our website and services</Text>
                      </Box>
                      <Box display="flex" alignItems="center" gap={2}>
                        <FaShieldAlt color="var(--chakra-colors-brand-500)" />
                        <Text color="gray.600">Comply with legal obligations</Text>
                      </Box>
                    </VStack>
                  </Box>

                  <Box>
                    <Heading as="h2" size="lg" color="brand.500" mb={4}>
                      Information Sharing and Disclosure
                    </Heading>
                    <Text color="gray.600" lineHeight="tall" mb={3}>
                      We do not sell, trade, or otherwise transfer your personal information to
                      third parties without your consent, except in the following circumstances:
                    </Text>
                    <VStack gap={2} align="start">
                      <Box display="flex" alignItems="center" gap={2}>
                        <FaShieldAlt color="var(--chakra-colors-brand-500)" />
                        <Text color="gray.600">
                          To comply with legal requirements or protect our rights
                        </Text>
                      </Box>
                      <Box display="flex" alignItems="center" gap={2}>
                        <FaShieldAlt color="var(--chakra-colors-brand-500)" />
                        <Text color="gray.600">
                          With trusted service providers who assist us in operating our business
                        </Text>
                      </Box>
                      <Box display="flex" alignItems="center" gap={2}>
                        <FaShieldAlt color="var(--chakra-colors-brand-500)" />
                        <Text color="gray.600">
                          In connection with a business transfer or merger
                        </Text>
                      </Box>
                    </VStack>
                  </Box>

                  <Box>
                    <Heading as="h2" size="lg" color="brand.500" mb={4}>
                      Data Security
                    </Heading>
                    <Text color="gray.600" lineHeight="tall">
                      We implement appropriate security measures to protect your personal
                      information against unauthorized access, alteration, disclosure, or
                      destruction. However, no method of transmission over the internet or
                      electronic storage is 100% secure, and we cannot guarantee absolute security.
                    </Text>
                  </Box>

                  <Box>
                    <Heading as="h2" size="lg" color="brand.500" mb={4}>
                      Your Rights
                    </Heading>
                    <Text color="gray.600" lineHeight="tall" mb={3}>
                      You have the right to:
                    </Text>
                    <VStack gap={2} align="start">
                      <Box display="flex" alignItems="center" gap={2}>
                        <FaShieldAlt color="var(--chakra-colors-brand-500)" />
                        <Text color="gray.600">
                          Access the personal information we hold about you
                        </Text>
                      </Box>
                      <Box display="flex" alignItems="center" gap={2}>
                        <FaShieldAlt color="var(--chakra-colors-brand-500)" />
                        <Text color="gray.600">Request correction of inaccurate information</Text>
                      </Box>
                      <Box display="flex" alignItems="center" gap={2}>
                        <FaShieldAlt color="var(--chakra-colors-brand-500)" />
                        <Text color="gray.600">Request deletion of your personal information</Text>
                      </Box>
                      <Box display="flex" alignItems="center" gap={2}>
                        <FaShieldAlt color="var(--chakra-colors-brand-500)" />
                        <Text color="gray.600">Opt out of marketing communications</Text>
                      </Box>
                    </VStack>
                  </Box>

                  <Box>
                    <Heading as="h2" size="lg" color="brand.500" mb={4}>
                      Cookies and Tracking Technologies
                    </Heading>
                    <Text color="gray.600" lineHeight="tall">
                      We may use cookies and similar tracking technologies to enhance your
                      experience on our website. You can control cookie settings through your
                      browser preferences. Please note that disabling cookies may affect the
                      functionality of our website.
                    </Text>
                  </Box>

                  <Box>
                    <Heading as="h2" size="lg" color="brand.500" mb={4}>
                      Third-Party Links
                    </Heading>
                    <Text color="gray.600" lineHeight="tall">
                      Our website may contain links to third-party websites. We are not responsible
                      for the privacy practices or content of these external sites. We encourage you
                      to review the privacy policies of any third-party sites you visit.
                    </Text>
                  </Box>

                  <Box>
                    <Heading as="h2" size="lg" color="brand.500" mb={4}>
                      Children's Privacy
                    </Heading>
                    <Text color="gray.600" lineHeight="tall">
                      Our services are not intended for children under the age of 13. We do not
                      knowingly collect personal information from children under 13. If you believe
                      we have collected information from a child under 13, please contact us
                      immediately.
                    </Text>
                  </Box>

                  <Box>
                    <Heading as="h2" size="lg" color="brand.500" mb={4}>
                      Changes to This Privacy Policy
                    </Heading>
                    <Text color="gray.600" lineHeight="tall">
                      We may update this Privacy Policy from time to time. We will notify you of any
                      changes by posting the new Privacy Policy on this page and updating the "Last
                      updated" date. We encourage you to review this Privacy Policy periodically.
                    </Text>
                  </Box>

                  <Box>
                    <Heading as="h2" size="lg" color="brand.500" mb={4}>
                      Contact Us
                    </Heading>
                    <Text color="gray.600" lineHeight="tall">
                      If you have any questions about this Privacy Policy or our privacy practices,
                      please contact us:
                    </Text>
                    <VStack gap={2} mt={3} align="start">
                      <Text color="gray.600">
                        <strong>Email:</strong> ccmudjacking@gmail.com
                      </Text>
                      <Text color="gray.600">
                        <strong>Phone:</strong> {PHONE_NUMBER}
                      </Text>
                      <Text color="gray.600">
                        <strong>Service Area:</strong> Greater Metro Area
                      </Text>
                    </VStack>
                  </Box>
                </VStack>
              </Card.Body>
            </Card.Root>
          </VStack>
        </Container>
      </Box>
    </Wrapper>
  );
}
