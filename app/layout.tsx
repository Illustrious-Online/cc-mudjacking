import { ColorModeScript } from '@chakra-ui/color-mode';
// app/layout.tsx
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { GoogleAnalytics, GoogleSearchConsole } from '@/components/seo/google-analytics';
import { StructuredData } from '@/components/seo/structured-data';
import { WebVitals } from '@/components/seo/web-vitals';
import { defaultMetadata } from '@/lib/seo';
import { ChakraProvider } from '@/providers/ChakraProvider';

export const metadata: Metadata = defaultMetadata;

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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#e12f01" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <StructuredData type="localBusiness" />
        <StructuredData type="services" />
        <GoogleSearchConsole />
        <GoogleAnalytics />
      </head>
      <body suppressHydrationWarning>
        <ChakraProvider>
          <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            {children}
            <WebVitals />
          </ThemeProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
