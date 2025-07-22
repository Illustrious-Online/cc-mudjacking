'use client';

import { FaHome } from 'react-icons/fa';
import { galleryData } from '@/components/ui/gallery/gallery-data';
import GalleryPage from '@/components/ui/gallery/gallery-page';
import { testimonials } from '@/components/ui/testimonials/testimonials';

export default function GalleryPageComponent() {
  const sections = [
    {
      title: 'Recent Projects',
      icon: FaHome,
      projects: galleryData.residential,
      bgColor: 'gray.50' as const,
    },
  ];

  return (
    <GalleryPage
      galleryData={galleryData}
      testimonials={testimonials}
      sections={sections}
    />
  );
}
