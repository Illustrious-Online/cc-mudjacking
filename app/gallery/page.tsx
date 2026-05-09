import type { Metadata } from 'next';
import { FaHome } from 'react-icons/fa';
import { galleryData } from '@/components/ui/gallery/gallery-data';
import GalleryPage from '@/components/ui/gallery/gallery-page';
import { testimonials } from '@/components/ui/testimonials/testimonials';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Mudjacking Gallery - Before & After Photos | CC Mudjacking',
  description:
    'View our mudjacking gallery showcasing before and after photos of concrete leveling projects. See the quality of our work on driveways, patios, sidewalks, and more.',
  path: '/gallery',
  images: [
    {
      url: '/projects/1/after-1.jpg',
      width: 1200,
      height: 630,
      alt: 'Mudjacking before and after results gallery',
    },
  ],
});

export default function GalleryPageComponent() {
  const sections = [
    {
      title: 'Recent Projects',
      icon: FaHome,
      projects: galleryData.residential,
      bgColor: 'gray.50' as const,
    },
  ];

  return <GalleryPage galleryData={galleryData} testimonials={testimonials} sections={sections} />;
}
