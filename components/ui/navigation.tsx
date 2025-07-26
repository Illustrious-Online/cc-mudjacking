"use client";

import { Box, Flex, IconButton, useDisclosure, VStack } from "@chakra-ui/react";
import { FaBars, FaTimes } from "react-icons/fa";
import type { FC } from "react";
import NavLink from "./nav-link";

const Navigation: FC = () => {
  const { open, onToggle } = useDisclosure();

  return (
    <>
      {/* Mobile hamburger button */}
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onToggle}
        variant="ghost"
        aria-label="Toggle navigation menu"
        color="white"
        _hover={{ bg: "whiteAlpha.200" }}
      >
        {open ? <FaTimes /> : <FaBars />}
      </IconButton>

      {/* Desktop navigation */}
      <Flex 
        gap={8} 
        align="center" 
        ml={{ base: 0, md: 4 }}
        display={{ base: "none", md: "flex" }}
      >
        <NavLink href="/">
          Home
        </NavLink>
        <NavLink href="/contact">
          Contact
        </NavLink>
        <NavLink href="/gallery">
          Gallery
        </NavLink>
      </Flex>

      {/* Mobile navigation menu */}
      {open && (
        <Box
          position="fixed"
          top={{ base: "4.5rem", md: "auto" }}
          left={0}
          right={0}
          bg="brand.600"
          borderTop="1px solid"
          borderColor="whiteAlpha.200"
          zIndex={999}
          display={{ base: "block", md: "none" }}
          boxShadow="lg"
        >
          <VStack gap={0} align="stretch">
            <Box
              py={4}
              px={6}
              borderBottom="1px solid"
              borderColor="whiteAlpha.200"
              _hover={{ bg: "whiteAlpha.100" }}
            >
              <NavLink href="/">
                Home
              </NavLink>
            </Box>
            <Box
              py={4}
              px={6}
              borderBottom="1px solid"
              borderColor="whiteAlpha.200"
              _hover={{ bg: "whiteAlpha.100" }}
            >
              <NavLink href="/contact">
                Contact
              </NavLink>
            </Box>
            <Box
              py={4}
              px={6}
              _hover={{ bg: "whiteAlpha.100" }}
            >
              <NavLink href="/gallery">
                Gallery
              </NavLink>
            </Box>
          </VStack>
        </Box>
      )}
    </>
  );
};

export default Navigation; 