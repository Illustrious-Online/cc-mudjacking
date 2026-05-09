import type { MetadataRoute } from 'next';
import { BUSINESS_INFO } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/admin/'],
    },
    sitemap: `${BUSINESS_INFO.website}/sitemap.xml`,
  };
}
