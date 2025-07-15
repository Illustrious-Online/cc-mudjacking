import { describe, it, expect } from 'vitest';
import { testimonials } from './testimonials';
import { Testimonial } from "../types";

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

  it('should have diverse service types', () => {
    const services = testimonials.map((testimonial) => testimonial.service);
    const uniqueServices = new Set(services);
    expect(uniqueServices.size).toBeGreaterThan(1);
  });

  it('should have diverse customer types', () => {
    const locations = testimonials.map((testimonial) => testimonial.location);
    const uniqueLocations = new Set(locations);
    expect(uniqueLocations.size).toBeGreaterThan(1);
  });

  it('should have realistic testimonial lengths', () => {
    testimonials.forEach((testimonial) => {
      expect(testimonial.text.length).toBeGreaterThan(50);
      expect(testimonial.text.length).toBeLessThan(500);
    });
  });

  it('should have all 5-star ratings (as per sample data)', () => {
    testimonials.forEach((testimonial) => {
      expect(testimonial.rating).toBe(5);
    });
  });

  it('should have testimonials for various mudjacking services', () => {
    const expectedServices = [
      'Driveway Leveling',
      'Industrial Floor Leveling',
      'Patio Leveling',
      'Parking Lot Leveling',
      'Garage Floor Leveling',
      'Foundation Stabilization',
      'Sidewalk Leveling',
      'Commercial Foundation Repair',
      'Pool Deck Leveling',
      'Multi-Property Repair',
      'Basement Floor Leveling',
      'Warehouse Floor Leveling',
    ];

    const actualServices = testimonials.map((testimonial) => testimonial.service);
    expectedServices.forEach((service) => {
      expect(actualServices).toContain(service);
    });
  });
}); 