import { IconType } from 'react-icons';
import Wrapper from '@/components/ui/wrapper';
import GalleryHero from './gallery-hero';
import GallerySection from './gallery-section';
import TestimonialsSection from '@/components/ui/testimonials/testimonials-section';
import type { GalleryData, GalleryProject, Testimonial } from '../types';

export interface GalleryPageProps {
  title?: string;
  description?: string;
  galleryData: GalleryData;
  testimonials?: Testimonial[];
  enableTestimonials?: boolean;
  sections?: {
    title: string;
    icon: IconType;
    projects: GalleryProject[];
    bgColor?: string;
  }[];
}

export default function GalleryPage({
  title = "Before & After Gallery",
  description = "See the incredible transformations we've achieved through professional mudjacking services. From sunken driveways to commercial floors, our work speaks for itself.",
  galleryData,
  testimonials = [],
  enableTestimonials = false,
  sections,
}: GalleryPageProps) {
  // Default sections if none provided
  const defaultSections = [
    {
      title: "Residential Projects",
      icon: () => null, // Will be overridden by the page
      projects: galleryData.residential,
      bgColor: "gray.50" as const,
    },
    {
      title: "Commercial Projects",
      icon: () => null, // Will be overridden by the page
      projects: galleryData.commercial,
      bgColor: "gray.50" as const,
    },
    {
      title: "Foundation Projects",
      icon: () => null, // Will be overridden by the page
      projects: galleryData.foundation,
      bgColor: "gray.50" as const,
    },
  ];

  const displaySections = sections || defaultSections;

  return (
    <Wrapper>
      <GalleryHero title={title} description={description} />

      {displaySections.map((section) => (
        <GallerySection
          key={section.title}
          title={section.title}
          icon={section.icon}
          projects={section.projects}
        />
      ))}

      {enableTestimonials && testimonials.length > 0 && (
        <TestimonialsSection testimonials={testimonials} />
      )}
    </Wrapper>
  );
} 