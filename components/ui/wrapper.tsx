"use client";

import { Box, Flex, Image, Spacer } from "@chakra-ui/react";
import type { FC, ReactNode } from "react";
import { ColorModeButton, useColorMode } from "./color-mode";
import { Toaster } from "./toaster";
import Navigation from "./navigation";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
}

const Wrapper: FC<LayoutProps> = ({ children }) => {
  const { colorMode } = useColorMode();

  // Reusable styles
  const logoStyles = {
    borderRadius: "medium" as const,
    src: "/logo-white.jpg",
    alt: "Logo" as const,
    width: "6rem" as const,
    transition: "transform 0.2s ease-in-out",
    _hover: { transform: "scale(1.05)" },
  };

  const headerStyles = {
    padding: 4,
    color: "white" as const,
    align: "center" as const,
    position: { base: "sticky", md: "relative" } as const,
    top: 0,
    zIndex: 1000,
    bg: "neutral.0",
    borderBottom: { base: "1px solid", md: "none" } as const,
    borderColor: "outlineVariant",
    boxShadow: "elevation1",
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" bg="background">
      <Toaster />
      <Flex as="header" {...headerStyles}>
        {/* Desktop: Logo on left */}
        <Image 
          {...logoStyles}
          mr={6}
          display={{ base: "none", md: "block" }}
        />
        
        {/* Mobile: Centered logo */}
        <Image 
          {...logoStyles}
          position="absolute"
          left="50%"
          transform="translateX(-50%)"
          display={{ base: "block", md: "none" }}
          _hover={{ transform: "translateX(-50%) scale(1.05)" }}
        />
        
        {/* Navigation */}
        <Navigation />
        
        <Spacer />
        
        {/* Right side - Action buttons */}
        <Flex gap={4} align="center">
          <ColorModeButton />
        </Flex>
      </Flex>

      <Box as="main" flex="1">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Wrapper;
