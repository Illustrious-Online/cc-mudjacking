import { describe, it, expect } from 'vitest';
import { galleryData, testimonials } from './gallery-data';
import { GalleryData, Testimonial } from "../types";

describe('GalleryData', () => {
  it('should have the correct structure', () => {
    expect(galleryData).toHaveProperty('residential');
    expect(galleryData).toHaveProperty('commercial');
    expect(galleryData).toHaveProperty('foundation');
  });

  it('should have residential projects', () => {
    expect(Array.isArray(galleryData.residential)).toBe(true);
    expect(galleryData.residential.length).toBeGreaterThan(0);
  });

  it('should have commercial projects', () => {
    expect(Array.isArray(galleryData.commercial)).toBe(true);
    expect(galleryData.commercial.length).toBeGreaterThan(0);
  });

  it('should have foundation projects', () => {
    expect(Array.isArray(galleryData.foundation)).toBe(true);
    expect(galleryData.foundation.length).toBeGreaterThan(0);
  });

  it('should have valid project structure for all projects', () => {
    const allProjects = [
      ...galleryData.residential,
      ...galleryData.commercial,
      ...galleryData.foundation,
    ];

    allProjects.forEach((project) => {
      expect(project).toHaveProperty('id');
      expect(project).toHaveProperty('before');
      expect(project).toHaveProperty('after');
      expect(project).toHaveProperty('service');
      expect(project).toHaveProperty('location');
      expect(project).toHaveProperty('completionTime');

      expect(project.before).toHaveProperty('src');
      expect(project.before).toHaveProperty('title');
      expect(project.before).toHaveProperty('description');

      expect(project.after).toHaveProperty('src');
      expect(project.after).toHaveProperty('title');
      expect(project.after).toHaveProperty('description');
    });
  });

  it('should have unique IDs for all projects', () => {
    const allProjects = [
      ...galleryData.residential,
      ...galleryData.commercial,
      ...galleryData.foundation,
    ];

    const ids = allProjects.map((project) => project.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have valid image URLs', () => {
    const allProjects = [
      ...galleryData.residential,
      ...galleryData.commercial,
      ...galleryData.foundation,
    ];

    allProjects.forEach((project) => {
      expect(project.before.src).toMatch(/^https:\/\/images\.unsplash\.com/);
      expect(project.after.src).toMatch(/^https:\/\/images\.unsplash\.com/);
    });
  });
});

describe('Testimonials', () => {
  it('should be an array', () => {
    expect(Array.isArray(testimonials)).toBe(true);
  });

  it('should have testimonials', () => {
    expect(testimonials.length).toBeGreaterThan(0);
  });

  it('should have valid testimonial structure', () => {
    testimonials.forEach((testimonial) => {
      expect(testimonial).toHaveProperty('id');
      expect(testimonial).toHaveProperty('name');
      expect(testimonial).toHaveProperty('location');
      expect(testimonial).toHaveProperty('rating');
      expect(testimonial).toHaveProperty('text');
      expect(testimonial).toHaveProperty('avatar');
      expect(testimonial).toHaveProperty('service');
    });
  });

  it('should have unique IDs for all testimonials', () => {
    const ids = testimonials.map((testimonial) => testimonial.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have valid ratings', () => {
    testimonials.forEach((testimonial) => {
      expect(testimonial.rating).toBeGreaterThanOrEqual(1);
      expect(testimonial.rating).toBeLessThanOrEqual(5);
    });
  });

  it('should have valid avatar URLs', () => {
    testimonials.forEach((testimonial) => {
      expect(testimonial.avatar).toMatch(/^https:\/\/images\.unsplash\.com/);
    });
  });

  it('should have non-empty text content', () => {
    testimonials.forEach((testimonial) => {
      expect(testimonial.text.trim()).toBeTruthy();
      expect(testimonial.name.trim()).toBeTruthy();
      expect(testimonial.location.trim()).toBeTruthy();
      expect(testimonial.service.trim()).toBeTruthy();
    });
  });
}); 