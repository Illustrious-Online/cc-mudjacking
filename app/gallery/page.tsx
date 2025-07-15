'use client';

import { FaHome } from 'react-icons/fa';
import { GalleryPage, galleryData, testimonials } from '@/app/components';

export default function GalleryPageComponent() {
  const sections = [
    {
      title: 'Residential Projects',
      icon: FaHome,
      projects: galleryData.residential,
      bgColor: 'gray.50' as const,
    },
  ];

  return (
    <GalleryPage
      galleryData={galleryData}
      testimonials={testimonials}
      enableTestimonials={false}
      sections={sections}
    />
  );
}
