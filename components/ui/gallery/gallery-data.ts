import { GalleryData, Testimonial } from "../types";

export const galleryData: GalleryData = {
  residential: [
    {
      id: 1,
      before: {
        src: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        title: 'Sunken Driveway',
        description: 'Severe settlement causing trip hazards and drainage issues',
      },
      after: {
        src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        title: 'Level & Safe',
        description: 'Professional mudjacking restoration with proper drainage',
      },
      service: 'Driveway Leveling',
      location: 'Residential Home',
      completionTime: '1 Day',
    },
    {
      id: 2,
      before: {
        src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        title: 'Uneven Patio',
        description: 'Pool deck with dangerous elevation changes',
      },
      after: {
        src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        title: 'Perfectly Level',
        description: 'Safe, level surface for family enjoyment',
      },
      service: 'Patio Leveling',
      location: 'Backyard Pool Area',
      completionTime: '2 Days',
    },
    {
      id: 3,
      before: {
        src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        title: 'Sinking Garage Floor',
        description: 'Concrete floor with significant settlement',
      },
      after: {
        src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        title: 'Stable Foundation',
        description: 'Level garage floor ready for vehicle storage',
      },
      service: 'Garage Floor Leveling',
      location: 'Residential Garage',
      completionTime: '1 Day',
    },
  ],
  commercial: [
    {
      id: 4,
      before: {
        src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        title: 'Warehouse Floor',
        description: 'Industrial floor with multiple settlement areas',
      },
      after: {
        src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        title: 'Level Warehouse',
        description: 'Safe, level surface for equipment and operations',
      },
      service: 'Industrial Floor Leveling',
      location: 'Commercial Warehouse',
      completionTime: '3 Days',
    },
    {
      id: 5,
      before: {
        src: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        title: 'Parking Lot',
        description: 'Commercial parking with drainage issues',
      },
      after: {
        src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        title: 'Level Parking',
        description: 'Proper drainage and level surface restored',
      },
      service: 'Parking Lot Leveling',
      location: 'Commercial Property',
      completionTime: '2 Days',
    },
  ],
  foundation: [
    {
      id: 6,
      before: {
        src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        title: 'Foundation Settlement',
        description: 'Structural foundation with significant settlement',
      },
      after: {
        src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        title: 'Stabilized Foundation',
        description: 'Foundation properly leveled and stabilized',
      },
      service: 'Foundation Stabilization',
      location: 'Residential Foundation',
      completionTime: '3 Days',
    },
  ],
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'Residential Customer',
    rating: 5,
    text: 'Amazing work! Our sunken driveway was completely transformed in just one day. The team was professional, clean, and the results exceeded our expectations. Highly recommend!',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150',
    service: 'Driveway Leveling',
  },
  {
    id: 2,
    name: 'Mike Rodriguez',
    location: 'Commercial Property Owner',
    rating: 5,
    text: 'We had multiple settlement issues in our warehouse floor. The mudjacking team was efficient and professional. The floor is now perfectly level and safe for our operations.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150',
    service: 'Industrial Floor Leveling',
  },
  {
    id: 3,
    name: 'Jennifer Davis',
    location: 'Homeowner',
    rating: 5,
    text: 'Our patio was a safety hazard with uneven surfaces. The mudjacking process was quick, clean, and the results are beautiful. Our family can now enjoy our outdoor space safely.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150',
    service: 'Patio Leveling',
  },
  {
    id: 4,
    name: 'Robert Chen',
    location: 'Property Manager',
    rating: 5,
    text: 'Professional service from start to finish. The team handled our commercial parking lot leveling project efficiently. Great communication and excellent results.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150',
    service: 'Parking Lot Leveling',
  },
]; 