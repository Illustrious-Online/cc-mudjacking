export interface GalleryImage {
  src: string;
  title: string;
  description: string;
}

export interface GalleryProject {
  id: number;
  before: GalleryImage;
  after: GalleryImage;
  service: string;
  location: string;
  completionTime: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
  service: string;
}

export interface GalleryData {
  residential: GalleryProject[];
} 