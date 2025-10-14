// SEO Configuration for CC Mudjacking
export const SEO_CONFIG = {
  // Google Analytics
  googleAnalytics: {
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
  },
  
  // Google Search Console
  googleSearchConsole: {
    verificationCode: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE || '',
  },
  
  // Social Media
  social: {
    facebook: {
      appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '',
    },
    twitter: {
      handle: '@ccmudjacking',
    },
  },
  
  // Business Information
  business: {
    name: 'CC Mudjacking',
    phone: '(641) 691-9999',
    email: 'ccmudjacking@gmail.com',
    website: process.env.NEXT_PUBLIC_SITE_URL || 'https://ccmudjacking.com',
    address: {
      street: '',
      city: 'Des Moines',
      state: 'IA',
      zipCode: '50309',
      country: 'US',
    },
    coordinates: {
      latitude: 41.6764,
      longitude: -93.6083,
    },
    hours: {
      monday: '8:00 AM - 5:00 PM',
      tuesday: '8:00 AM - 5:00 PM',
      wednesday: '8:00 AM - 5:00 PM',
      thursday: '8:00 AM - 5:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: '9:00 AM - 3:00 PM',
      sunday: 'Closed',
    },
  },
  
  // SEO Settings
  seo: {
    defaultTitle: 'CC Mudjacking - Professional Concrete Leveling & Mudjacking Services',
    titleTemplate: '%s | CC Mudjacking',
    defaultDescription: 'Professional mudjacking and concrete leveling services. Fast, affordable, and permanent solutions for sunken concrete. Serving residential and commercial properties.',
    defaultKeywords: [
      'mudjacking',
      'concrete leveling',
      'concrete repair',
      'sunken concrete',
      'driveway repair',
      'sidewalk repair',
      'patio leveling',
      'garage floor repair',
      'pool deck repair',
      'concrete lifting',
      'void filling',
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
  },
  
  // Image Optimization
  images: {
    defaultOpenGraph: '/main-hero.jpeg',
    defaultTwitter: '/main-hero.jpeg',
    logo: '/logo.png',
    favicon: '/favicon.ico',
  },
  
  // Performance
  performance: {
    enableWebVitals: true,
    enableCoreWebVitals: true,
  },
};
