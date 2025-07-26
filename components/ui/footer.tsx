"use client";

import { Box, Container, Flex, Text, Link, VStack, HStack } from "@chakra-ui/react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import type { FC } from "react";
import { PHONE_NUMBER } from "@/app/constants";

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box as="footer" bg="gray.800" color="white" py={6} mt="auto" data-testid="footer">
      <Container maxW="7xl">
        <VStack gap={6} align="stretch">
          {/* Contact Information */}
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "center", md: "center" }}
            gap={4}
          >
            <VStack gap={2} align={{ base: "center", md: "start" }}>
              <Text fontSize="md" fontWeight="semibold" color="brand.200">
                Contact Us
              </Text>
              <VStack gap={1} align={{ base: "center", md: "start" }} fontSize="sm">
                <HStack gap={2}>
                  <FaPhone color="var(--chakra-colors-brand-300)" />
                  <Link href="tel:6416919999" _hover={{ color: "brand.200" }}>
                    {PHONE_NUMBER}
                  </Link>
                </HStack>
                <HStack gap={2}>
                  <FaEnvelope color="var(--chakra-colors-brand-300)" />
                  <Link href="mailto:ccmudjacking@gmail.com" _hover={{ color: "brand.200" }}>
                    ccmudjacking@gmail.com
                  </Link>
                </HStack>
              </VStack>
            </VStack>

            <VStack gap={2} align={{ base: "center", md: "end" }}>
              <Text fontSize="md" fontWeight="semibold" color="brand.200">
                Quick Links
              </Text>
              <VStack gap={2} align={{ base: "center", md: "end" }} fontSize="sm">
                <HStack gap={2} align={{ base: "center", md: "end" }}>
                  <Link href="/" _hover={{ color: "brand.200" }}>
                    Home
                  </Link>
                  <Link href="/gallery" _hover={{ color: "brand.200" }}>
                    Gallery
                  </Link>
                  <Link href="/contact" _hover={{ color: "brand.200" }}>
                    Contact
                  </Link>
                </HStack>
                <HStack gap={1} align={{ base: "center", md: "end" }}>
                  <Link href="/privacy" _hover={{ color: "brand.200" }}>
                    Privacy Policy
                  </Link>
                </HStack>
              </VStack>
            </VStack>
          </Flex>

          {/* Bottom Section */}
          <Box borderTop="1px solid" borderColor="gray.700" pt={4}>
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align={{ base: "center", md: "center" }}
              gap={4}
            >
              <VStack gap={2} align={{ base: "center", md: "start" }}>
                <Text fontSize="sm" textAlign={{ base: "center", md: "left" }}>
                  © {currentYear} CC Mudjacking. All rights reserved.
                </Text>
              </VStack>
              <Text fontSize="sm" textAlign={{ base: "center", md: "right" }}>
                Created by{" "}
                <Link
                  href="https://illustrious.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="brand.300"
                  _hover={{ color: "brand.200", textDecoration: "underline" }}
                >
                  Illustrious Online
                </Link>
              </Text>
            </Flex>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer; 