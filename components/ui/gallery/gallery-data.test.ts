import { describe, it, expect } from 'vitest';
import { galleryData } from './gallery-data';
import { GalleryData } from "../types";

describe('GalleryData', () => {
  it('should have the correct structure', () => {
    expect(galleryData).toHaveProperty('residential');
  });

  it('should have residential projects', () => {
    expect(Array.isArray(galleryData.residential)).toBe(true);
    expect(galleryData.residential.length).toBeGreaterThan(0);
  });

  it('should have valid project structure for all projects', () => {
    const allProjects = [
      ...galleryData.residential,
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
    ];

    const ids = allProjects.map((project) => project.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have valid image URLs', () => {
    const allProjects = [
      ...galleryData.residential,
    ];

    allProjects.forEach((project) => {
      expect(project.before.src).toMatch(/^\/projects\//);
      expect(project.after.src).toMatch(/^\/projects\//);
    });
  });
}); 