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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
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
