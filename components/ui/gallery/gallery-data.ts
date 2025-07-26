import { GalleryData, Testimonial } from "../types";

export const galleryData: GalleryData = {
  residential: [
    {
      id: 1,
      before: {
        src: '/projects/1/before-1.jpg',
        title: 'Sunken Patio',
        description: 'Severe settlement causing trip hazards and drainage issues',
      },
      after: {
        src: '/projects/1/after-1.jpg',
        title: 'Level & Safe',
        description: 'Professional mudjacking restoration with proper drainage',
      },
      service: 'Patio Leveling',
      location: 'Residential Home',
      completionTime: '1 Day',
    },
    {
      id: 2,
      before: {
        src: '/projects/2/before-2.jpg',
        title: 'Sunken/Cracked Driveway',
        description: 'Sunken driveway with cracks and uneven surface',
      },
      after: {
        src: '/projects/2/after-1.jpg',
        title: 'Perfectly Level',
        description: 'Leveled driveway with proper drainage',
      },
      service: 'Driveway Leveling',
      location: 'Residential Home',
      completionTime: '2 Days',
    },
    {
      id: 3,
      before: {
        src: '/projects/3/before-3.jpg',
        title: 'Sunken Landing',
        description: 'Concrete floor with significant settlement',
      },
      after: {
        src: '/projects/3/after-1.jpg',
        title: 'Stable Foundation',
        description: 'Level garage floor ready for vehicle storage',
      },
      service: 'Landing Leveling',
      location: 'Residential Home',
      completionTime: '1 Day',
    },
  ],
};