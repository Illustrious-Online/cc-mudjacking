"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Box, Button, Flex, Image, Spacer } from "@chakra-ui/react";
import type { FC, ReactNode } from "react";
import { ColorModeButton, useColorMode } from "./color-mode";
import { Toaster, toaster } from "./toaster";
import { useRouter } from "next/navigation";
import AuthGuard from "./auth-guard";
import Navigation from "./navigation";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
}

const Wrapper: FC<LayoutProps> = ({ children }) => {
  const { session, signOut } = useAuth();
  const { colorMode } = useColorMode();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log('Error signing out:', error);
      toaster.success({
        description: "Successfully signed out",
        duration: 2500,
      });
      router.push("/auth/login");
    }
  };

  return (
    <AuthGuard>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Toaster />
        <Flex 
          as="header" 
          padding={4} 
          color="white" 
          align="center" 
          position={{ base: "sticky", md: "relative" }}
          top={0}
          zIndex={1000}
          bg="brand.600"
          borderBottom={{ base: "1px solid", md: "none" }}
          borderColor="whiteAlpha.200"
        >
          {/* Desktop: Logo on left */}
          <Image 
            borderRadius="md" 
            src={colorMode === "dark" ? "/logo-white.jpg" : '/logo.png'} 
            alt="Logo" 
            width={"6rem"} 
            mr={6}
            display={{ base: "none", md: "block" }}
          />
          
          {/* Mobile: Centered logo */}
          <Image 
            borderRadius="md" 
            src={colorMode === "dark" ? "/logo-white.jpg" : '/logo.png'} 
            alt="Logo" 
            width={"6rem"} 
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
            display={{ base: "block", md: "none" }}
          />
          
          {/* Navigation */}
          <Navigation />
          
          <Spacer />
          
          {/* Right side - Action buttons */}
          <Flex gap={4} align="center">
            {session && (
              <Button variant={"ghost"} onClick={handleSignOut}>
                Log Out
              </Button>
            )}
            <ColorModeButton />
          </Flex>
        </Flex>

        <Box as="main" flex="1">
          {children}
        </Box>
        <Footer />
      </Box>
    </AuthGuard>
  );
};

export default Wrapper;
