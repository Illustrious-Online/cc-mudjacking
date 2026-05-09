import type { Metadata } from 'next';

// Business information
export const BUSINESS_INFO = {
  name: 'CC Mudjacking',
  description: 'Professional mudjacking and concrete leveling services. Fast, affordable, and permanent solutions for sunken concrete. Serving residential and commercial properties with environmentally friendly methods.',
  phone: '(641) 691-9999',
  email: 'ccmudjacking@gmail.com',
  website: 'https://ccmudjacking.com',
  address: {
    street: '',
    city: 'Des Moines',
    state: 'IA',
    zipCode: '50309',
    country: 'US',
  },
  services: [
    'Mudjacking',
    'Concrete Leveling',
    'Driveway Repair',
    'Sidewalk Repair',
    'Void Filling',
  ],
  serviceAreas: [
    'Des Moines',
    'Ames',
    'Ankeny',
    'West Des Moines',
    'Urbandale',
    'Johnston',
    'Clive',
    'Windsor Heights',
    'Altoona',
    'Pleasant Hill',
    'Grimes',
    'Indianola',
    'Newton',
    'Marshalltown',
    'Grinnell',
  ],
};

// Default metadata for the site
export const defaultMetadata: Metadata = {
  title: {
    default: `${BUSINESS_INFO.name} - Professional Mudjacking & Concrete Leveling Services`,
    template: `%s | ${BUSINESS_INFO.name}`,
  },
  description: BUSINESS_INFO.description,
  keywords: [
    'mudjacking',
    'concrete leveling',
    'concrete repair',
    'sunken concrete',
    'driveway repair',
    'sidewalk repair',
    'concrete lifting',
    'void filling',
    'concrete leveling Iowa',
    'mudjacking Iowa',
    'concrete repair Iowa',
    ...BUSINESS_INFO.serviceAreas.map(area => `concrete repair ${area}`),
    ...BUSINESS_INFO.serviceAreas.map(area => `mudjacking ${area}`),
  ],
  authors: [{ name: BUSINESS_INFO.name }],
  creator: BUSINESS_INFO.name,
  publisher: BUSINESS_INFO.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(BUSINESS_INFO.website),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BUSINESS_INFO.website,
    title: `${BUSINESS_INFO.name} - Professional Mudjacking & Concrete Leveling Services`,
    description: BUSINESS_INFO.description,
    siteName: BUSINESS_INFO.name,
    images: [
      {
        url: '/main-hero.jpeg',
        width: 1200,
        height: 630,
        alt: 'Professional mudjacking equipment and team working on concrete',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BUSINESS_INFO.name} - Professional Mudjacking Services`,
    description: BUSINESS_INFO.description,
    images: ['/main-hero.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE || '',
  },
};

// Function to generate page-specific metadata
export function generatePageMetadata({
  title,
  description,
  path,
  images,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  images?: Array<{
    url: string;
    width: number;
    height: number;
    alt: string;
  }>;
  noIndex?: boolean;
}): Metadata {
  const url = `${BUSINESS_INFO.website}${path}`;
  
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      images: images || defaultMetadata.openGraph?.images,
    },
    twitter: {
      title,
      description,
      images: images?.map(img => img.url) || ['/main-hero.jpeg'],
    },
    robots: noIndex ? {
      index: false,
      follow: false,
    } : defaultMetadata.robots,
  };
}

// Structured data for local business
export const localBusinessStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: BUSINESS_INFO.name,
  description: BUSINESS_INFO.description,
  url: BUSINESS_INFO.website,
  telephone: BUSINESS_INFO.phone,
  email: BUSINESS_INFO.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS_INFO.address.street,
    addressLocality: BUSINESS_INFO.address.city,
    addressRegion: BUSINESS_INFO.address.state,
    postalCode: BUSINESS_INFO.address.zipCode,
    addressCountry: BUSINESS_INFO.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 0, // Update with actual coordinates
    longitude: 0, // Update with actual coordinates
  },
  areaServed: BUSINESS_INFO.serviceAreas.map(area => ({
    '@type': 'City',
    name: area,
  })),
  serviceType: BUSINESS_INFO.services,
  priceRange: '$$',
  openingHours: 'Mo-Fr 08:00-17:00', // Update with actual hours
  image: `${BUSINESS_INFO.website}/main-hero.jpeg`,
  logo: `${BUSINESS_INFO.website}/logo.png`,
  sameAs: [
    // Add social media URLs when available
  ],
};

// Structured data for services
export const servicesStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Mudjacking and Concrete Leveling Services',
  description: BUSINESS_INFO.description,
  provider: {
    '@type': 'LocalBusiness',
    name: BUSINESS_INFO.name,
    telephone: BUSINESS_INFO.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.zipCode,
      addressCountry: BUSINESS_INFO.address.country,
    },
  },
  areaServed: BUSINESS_INFO.serviceAreas.map(area => ({
    '@type': 'City',
    name: area,
  })),
  serviceType: BUSINESS_INFO.services,
  offers: {
    '@type': 'Offer',
    description: 'Professional mudjacking and concrete leveling services',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
};
