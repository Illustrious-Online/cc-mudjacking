import { ColorModeScript } from '@chakra-ui/color-mode';
// app/layout.tsx
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { ChakraProvider } from '@/providers/ChakraProvider';

export const metadata: Metadata = {
  title: 'CC Mudjacking',
  description: 'Professional mudjacking services',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorModeScript initialColorMode="system" />
      </head>
      <body suppressHydrationWarning>
        <ChakraProvider>
          <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            {children}
          </ThemeProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
