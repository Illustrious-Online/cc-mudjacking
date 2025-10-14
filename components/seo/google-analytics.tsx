'use client';

import Script from 'next/script';

interface GoogleAnalyticsProps {
  measurementId?: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  // Get measurement ID from environment variable if not provided as prop
  const gaMeasurementId = measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Don't render anything if no measurement ID is available
  if (!gaMeasurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaMeasurementId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

// Google Search Console verification component
interface GoogleSearchConsoleProps {
  verificationCode?: string;
}

export function GoogleSearchConsole({ verificationCode }: GoogleSearchConsoleProps) {
  // Get verification code from environment variable if not provided as prop
  const googleVerificationCode = verificationCode || process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE;

  // Don't render anything if no verification code is available
  if (!googleVerificationCode) {
    return null;
  }

  return (
    <meta name="google-site-verification" content={googleVerificationCode} />
  );
}
