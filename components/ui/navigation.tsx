"use client";

import { Box, Flex, IconButton, useDisclosure, VStack } from "@chakra-ui/react";
import { FaBars, FaTimes } from "react-icons/fa";
import type { FC } from "react";
import NavLink from "./nav-link";
import { buttonStyles } from "./shared-styles";

const Navigation: FC = () => {
  const { open, onToggle } = useDisclosure();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
    { href: "/gallery", label: "Gallery" },
  ];

  return (
    <>
      {/* Mobile hamburger button */}
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onToggle}
        variant="ghost"
        aria-label="Toggle navigation menu"
        color="white"
        _hover={{ 
          bg: "primaryContainer", 
          color: "#e12f01",
          transform: "scale(1.05)",
        }}
        _active={{
          transform: "scale(0.95)",
        }}
        transition="all 0.2s ease-in-out"
        borderRadius="full"
        size="lg"
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
        {navItems.map((item) => (
          <NavLink 
            key={item.href}
            href={item.href}
            buttonProps={{
              ...buttonStyles.nav,
              color: "white",
            }}
          >
            {item.label}
          </NavLink>
        ))}
      </Flex>

      {/* Mobile navigation menu */}
      {open && (
        <Box
          position="fixed"
          top={{ base: "4.5rem", md: "auto" }}
          left={0}
          right={0}
          bg="neutral.10"
          color="onSurface"
          borderTop="1px solid"
          borderColor="outlineVariant"
          zIndex={999}
          display={{ base: "block", md: "none" }}
          boxShadow="elevation3"
          borderRadius="0 0 large large"
        >
          <VStack gap={0} align="stretch">
            {navItems.map((item, index) => (
              <Box
                key={item.href}
                py={4}
                px={6}
                borderBottom={index < navItems.length - 1 ? "1px solid" : "none"}
                borderColor="outlineVariant"
                _hover={{ bg: "surfaceVariant" }}
                transition="background 0.2s ease-in-out"
              >
                <NavLink 
                  href={item.href}
                  buttonProps={{
                    ...buttonStyles.nav,
                    w: "full",
                    justifyContent: "start",
                    borderRadius: "medium",
                    color: "onSurface",
                  }}
                >
                  {item.label}
                </NavLink>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </>
  );
};

export default Navigation; 