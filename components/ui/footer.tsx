"use client";

import { Box, Container, Flex, Text, Link, VStack, HStack } from "@chakra-ui/react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import type { FC } from "react";
import { PHONE_NUMBER } from "@/app/constants";

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      as="footer" 
      bg="neutral.10" 
      color="neutral.100" 
      py={16} 
      mt="auto" 
      data-testid="footer"
      borderTop="1px solid"
      borderColor="outlineVariant"
      position="relative"
      overflow="hidden"
    >
      {/* Brand accent line */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h={1}
        bgGradient="linear(to-r, #e12f01, #ff6b3d, #e12f01)"
        opacity={0.8}
      />
      
      <Container maxW="7xl">
        <VStack gap={12} align="stretch">
          {/* Contact Information */}
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "center", md: "center" }}
            gap={8}
          >
            <VStack gap={6} align={{ base: "center", md: "start" }}>
              <VStack gap={2} align={{ base: "center", md: "start" }}>
                <Text 
                  fontSize="titleLarge" 
                  fontWeight="bold" 
                  color="primary"
                  lineHeight="titleLarge"
                  letterSpacing="titleLarge"
                >
                  Contact Us
                </Text>
                <Box w={12} h={1} bg="primary" borderRadius="full" opacity={0.8} />
              </VStack>
              <VStack gap={4} align={{ base: "center", md: "start" }} fontSize="bodyLarge">
                <HStack gap={4}>
                  <Box 
                    w={10} 
                    h={10} 
                    bgGradient="linear(to-br, #e12f01, #ff6b3d)"
                    borderRadius="full" 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center"
                    boxShadow="elevation2"
                    _hover={{
                      transform: "scale(1.1)",
                      boxShadow: "elevation3",
                    }}
                    transition="all 0.2s ease-in-out"
                  >
                    <FaPhone color="var(--chakra-colors-brand-500)" size={16} />
                  </Box>
                  <Link 
                    href="tel:6416919999" 
                    color="onSurface" 
                    _hover={{ color: "#e12f01" }}
                    transition="color 0.2s ease-in-out"
                    fontSize="bodyLarge"
                    lineHeight="bodyLarge"
                    letterSpacing="bodyLarge"
                    fontWeight="medium"
                  >
                    {PHONE_NUMBER}
                  </Link>
                </HStack>
                <HStack gap={4}>
                  <Box 
                    w={10} 
                    h={10} 
                    bgGradient="linear(to-br, #e12f01, #ff6b3d)"
                    borderRadius="full" 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center"
                    boxShadow="elevation2"
                    _hover={{
                      transform: "scale(1.1)",
                      boxShadow: "elevation3",
                    }}
                    transition="all 0.2s ease-in-out"
                  >
                    <FaEnvelope color="var(--chakra-colors-brand-500)" size={16} />
                  </Box>
                  <Link 
                    href="mailto:ccmudjacking@gmail.com" 
                    color="onSurface" 
                    _hover={{ color: "#e12f01" }}
                    transition="color 0.2s ease-in-out"
                    fontSize="bodyLarge"
                    lineHeight="bodyLarge"
                    letterSpacing="bodyLarge"
                    fontWeight="medium"
                  >
                    ccmudjacking@gmail.com
                  </Link>
                </HStack>
              </VStack>
            </VStack>

            <VStack gap={6} align={{ base: "center", md: "end" }}>
              <VStack gap={2} align={{ base: "center", md: "end" }}>
                <Text 
                  fontSize="titleLarge" 
                  fontWeight="bold" 
                  color="primary"
                  lineHeight="titleLarge"
                  letterSpacing="titleLarge"
                >
                  Quick Links
                </Text>
                <Box w={12} h={1} bg="primary" borderRadius="full" opacity={0.8} />
              </VStack>
              <VStack gap={4} align={{ base: "center", md: "end" }} fontSize="bodyLarge">
                <HStack gap={6} align={{ base: "center", md: "end" }}>
                  <Link 
                    href="/" 
                    color="onSurface" 
                    transition="color 0.2s ease-in-out"
                    fontSize="bodyLarge"
                    lineHeight="bodyLarge"
                    letterSpacing="bodyLarge"
                    fontWeight="medium"
                    position="relative"
                    _after={{
                      content: '""',
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      bg: '#e12f01',
                      transform: 'scaleX(0)',
                      transition: 'transform 0.2s ease-in-out',
                    }}
                    _hover={{ 
                      color: "#e12f01",
                      _after: {
                        transform: 'scaleX(1)',
                      },
                    }}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/gallery" 
                    color="onSurface" 
                    transition="color 0.2s ease-in-out"
                    fontSize="bodyLarge"
                    lineHeight="bodyLarge"
                    letterSpacing="bodyLarge"
                    fontWeight="medium"
                    position="relative"
                    _after={{
                      content: '""',
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      bg: '#e12f01',
                      transform: 'scaleX(0)',
                      transition: 'transform 0.2s ease-in-out',
                    }}
                    _hover={{ 
                      color: "#e12f01",
                      _after: {
                        transform: 'scaleX(1)',
                      },
                    }}
                  >
                    Gallery
                  </Link>
                  <Link 
                    href="/contact" 
                    color="onSurface" 
                    transition="color 0.2s ease-in-out"
                    fontSize="bodyLarge"
                    lineHeight="bodyLarge"
                    letterSpacing="bodyLarge"
                    fontWeight="medium"
                    position="relative"
                    _after={{
                      content: '""',
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      bg: '#e12f01',
                      transform: 'scaleX(0)',
                      transition: 'transform 0.2s ease-in-out',
                    }}
                    _hover={{ 
                      color: "#e12f01",
                      _after: {
                        transform: 'scaleX(1)',
                      },
                    }}
                  >
                    Contact
                  </Link>
                </HStack>
                <Link 
                  href="/privacy" 
                  color="onSurface" 
                  transition="color 0.2s ease-in-out"
                  fontSize="bodyLarge"
                  lineHeight="bodyLarge"
                  letterSpacing="bodyLarge"
                  fontWeight="medium"
                  position="relative"
                  _after={{
                    content: '""',
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    bg: '#e12f01',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                  _hover={{ 
                    color: "#e12f01",
                    _after: {
                      transform: 'scaleX(1)',
                    },
                  }}
                >
                  Privacy Policy
                </Link>
              </VStack>
            </VStack>
          </Flex>

          {/* Bottom Section */}
          <Box borderTop="1px solid" borderColor="outlineVariant" pt={8}>
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align={{ base: "center", md: "center" }}
              gap={6}
            >
              <VStack gap={2} align={{ base: "center", md: "start" }}>
                <Text 
                  fontSize="bodyMedium" 
                  textAlign={{ base: "center", md: "left" }}
                  color="onSurfaceVariant"
                  lineHeight="bodyMedium"
                  letterSpacing="bodyMedium"
                >
                  © {currentYear} CC Mudjacking. All rights reserved.
                </Text>
              </VStack>
              <Text 
                fontSize="bodyMedium" 
                textAlign={{ base: "center", md: "right" }}
                color="onSurfaceVariant"
                lineHeight="bodyMedium"
                letterSpacing="bodyMedium"
              >
                Created by{" "}
                <Link
                  href="https://illustrious.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  _hover={{ 
                    color: "primaryContainer", 
                    textDecoration: "underline" 
                  }}
                  transition="color 0.2s ease-in-out"
                  fontWeight="medium"
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