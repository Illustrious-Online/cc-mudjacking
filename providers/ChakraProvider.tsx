'use client'

import {
  ChakraProvider as ChakraProviderBase,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Primary brand colors
        primary: {
          0: { value: "#000000" },
          10: { value: "#2d0a00" },
          20: { value: "#4a1500" },
          30: { value: "#672000" },
          40: { value: "#842b00" },
          50: { value: "#a13600" },
          60: { value: "#be4100" },
          70: { value: "#db4c00" },
          80: { value: "#e12f01" }, // Main brand color
          90: { value: "#ff6b3d" },
          95: { value: "#ff8a6b" },
          99: { value: "#fff8f6" },
          100: { value: "#ffffff" },
        },
        // Neutral grays
        neutral: {
          0: { value: "#000000" },
          10: { value: "#1a1a1a" },
          20: { value: "#2d2d2d" },
          30: { value: "#404040" },
          40: { value: "#525252" },
          50: { value: "#666666" },
          60: { value: "#808080" },
          70: { value: "#999999" },
          80: { value: "#b3b3b3" },
          90: { value: "#cccccc" },
          95: { value: "#e6e6e6" },
          99: { value: "#fafafa" },
          100: { value: "#ffffff" },
        },
        // Legacy brand colors for backward compatibility
        brand: {
          50: { value: "#fff8f6" },
          100: { value: "#ff8a6b" },
          200: { value: "#ff6b3d" },
          300: { value: "#e12f01" },
          400: { value: "#db4c00" },
          500: { value: "#e12f01" },
          600: { value: "#be4100" },
          700: { value: "#a13600" },
          800: { value: "#842b00" },
          900: { value: "#672000" },
        },
      },
      // Typography
      fonts: {
        display: { value: "Roboto, system-ui, sans-serif" },
        headline: { value: "Roboto, system-ui, sans-serif" },
        title: { value: "Roboto, system-ui, sans-serif" },
        label: { value: "Roboto, system-ui, sans-serif" },
        body: { value: "Roboto, system-ui, sans-serif" },
      },
      fontSizes: {
        displayLarge: { value: "57px" },
        displayMedium: { value: "45px" },
        displaySmall: { value: "36px" },
        headlineLarge: { value: "32px" },
        headlineMedium: { value: "28px" },
        headlineSmall: { value: "24px" },
        titleLarge: { value: "22px" },
        titleMedium: { value: "16px" },
        titleSmall: { value: "14px" },
        labelLarge: { value: "14px" },
        labelMedium: { value: "12px" },
        labelSmall: { value: "11px" },
        bodyLarge: { value: "16px" },
        bodyMedium: { value: "14px" },
        bodySmall: { value: "12px" },
      },
      fontWeights: {
        regular: { value: "400" },
        medium: { value: "500" },
        semibold: { value: "600" },
        bold: { value: "700" },
      },
      lineHeights: {
        displayLarge: { value: "64px" },
        displayMedium: { value: "52px" },
        displaySmall: { value: "44px" },
        headlineLarge: { value: "40px" },
        headlineMedium: { value: "36px" },
        headlineSmall: { value: "32px" },
        titleLarge: { value: "28px" },
        titleMedium: { value: "24px" },
        titleSmall: { value: "20px" },
        labelLarge: { value: "20px" },
        labelMedium: { value: "16px" },
        labelSmall: { value: "16px" },
        bodyLarge: { value: "24px" },
        bodyMedium: { value: "20px" },
        bodySmall: { value: "16px" },
      },
      letterSpacings: {
        displayLarge: { value: "-0.25px" },
        displayMedium: { value: "0px" },
        displaySmall: { value: "0px" },
        headlineLarge: { value: "0px" },
        headlineMedium: { value: "0px" },
        headlineSmall: { value: "0px" },
        titleLarge: { value: "0px" },
        titleMedium: { value: "0.15px" },
        titleSmall: { value: "0.1px" },
        labelLarge: { value: "0.1px" },
        labelMedium: { value: "0.5px" },
        labelSmall: { value: "0.5px" },
        bodyLarge: { value: "0.5px" },
        bodyMedium: { value: "0.25px" },
        bodySmall: { value: "0.4px" },
      },

      // Border Radius
      radii: {
        none: { value: "0px" },
        extraSmall: { value: "4px" },
        small: { value: "8px" },
        medium: { value: "12px" },
        large: { value: "16px" },
        extraLarge: { value: "28px" },
        full: { value: "9999px" },
      },
      // Shadows
      shadows: {
        elevation0: { value: "none" },
        elevation1: { value: "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)" },
        elevation2: { value: "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)" },
        elevation3: { value: "0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.30)" },
        elevation4: { value: "0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 4px 0px rgba(0, 0, 0, 0.30)" },
        elevation5: { value: "0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 6px 0px rgba(0, 0, 0, 0.30)" },
      },
    },
    semanticTokens: {
      colors: {
        // Surface colors
        surface: {
          value: { _light: "neutral.99", _dark: "neutral.10" }
        },
        surfaceVariant: {
          value: { _light: "neutral.95", _dark: "neutral.20" }
        },
        background: {
          value: { _light: "neutral.99", _dark: "neutral.10" }
        },
        onSurface: {
          value: { _light: "neutral.10", _dark: "neutral.90" }
        },
        onSurfaceVariant: {
          value: { _light: "neutral.40", _dark: "neutral.70" }
        },
        // Primary colors
        primary: {
          value: { _light: "primary.80", _dark: "primary.90" }
        },
        onPrimary: {
          value: { _light: "neutral.99", _dark: "neutral.10" }
        },
        primaryContainer: {
          value: { _light: "primary.95", _dark: "primary.20" }
        },
        onPrimaryContainer: {
          value: { _light: "primary.10", _dark: "primary.90" }
        },
        // Secondary colors
        secondary: {
          value: { _light: "neutral.40", _dark: "neutral.70" }
        },
        onSecondary: {
          value: { _light: "neutral.99", _dark: "neutral.10" }
        },
        secondaryContainer: {
          value: { _light: "neutral.95", _dark: "neutral.30" }
        },
        onSecondaryContainer: {
          value: { _light: "neutral.10", _dark: "neutral.90" }
        },
        // Outline colors
        outline: {
          value: { _light: "neutral.50", _dark: "neutral.60" }
        },
        outlineVariant: {
          value: { _light: "neutral.80", _dark: "neutral.30" }
        },
        // Shadow colors
        shadow: {
          value: { _light: "neutral.0", _dark: "neutral.0" }
        },
        scrim: {
          value: { _light: "neutral.0", _dark: "neutral.0" }
        },
      },
    },
  },
});

const system = createSystem(defaultConfig, customConfig);

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return <ChakraProviderBase value={system}>{children}</ChakraProviderBase>
}
