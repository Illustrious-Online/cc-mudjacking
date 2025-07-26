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
      <Box height="100vh" display="flex" flexDirection="column">
        <Toaster />
        <Flex as="header" padding={4} color="white" align="center">
          <Image borderRadius="md" src={colorMode === "dark" ? "/logo-white.jpg" : '/logo.png'} alt="Logo" width={"6rem"} mr={6} />
          <Navigation />
          <Spacer />
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
