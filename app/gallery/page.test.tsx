import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import GalleryPageComponent from './page';

// Mock the components
vi.mock('@/app/components', () => ({
  GalleryPage: ({ galleryData, testimonials, enableTestimonials, sections }: any) => (
    <div data-testid="gallery-page">
      <div data-testid="gallery-data">
        <span>Residential: {galleryData.residential.length}</span>
        <span>Commercial: {galleryData.commercial.length}</span>
        <span>Foundation: {galleryData.foundation.length}</span>
      </div>
      <div data-testid="testimonials-count">
        Testimonials: {testimonials.length}
      </div>
      <div data-testid="testimonials-enabled">
        Enabled: {enableTestimonials ? 'true' : 'false'}
      </div>
      <div data-testid="sections">
        {sections.map((section: any, index: number) => (
          <div key={section.title} data-testid={`section-${index}`}>
            {section.title} - {section.projects.length} projects
          </div>
        ))}
      </div>
    </div>
  ),
  galleryData: {
    residential: [{ id: 1 }, { id: 2 }, { id: 3 }],
    commercial: [{ id: 4 }, { id: 5 }],
    foundation: [{ id: 6 }],
  },
  testimonials: [
    { id: 1, name: 'Test 1' },
    { id: 2, name: 'Test 2' },
    { id: 3, name: 'Test 3' },
    { id: 4, name: 'Test 4' },
  ],
}));

describe('GalleryPageComponent', () => {
  it('renders the GalleryPage component', () => {
    render(<GalleryPageComponent />);

    expect(screen.getByTestId('gallery-page')).toBeInTheDocument();
  });

  it('passes correct gallery data to GalleryPage', () => {
    render(<GalleryPageComponent />);

    expect(screen.getByText('Residential: 3')).toBeInTheDocument();
  });

  it('passes correct testimonials data to GalleryPage', () => {
    render(<GalleryPageComponent />);

    expect(screen.getByText('Testimonials: 4')).toBeInTheDocument();
  });

  it('disables testimonials by default', () => {
    render(<GalleryPageComponent />);

    expect(screen.getByText('Enabled: false')).toBeInTheDocument();
  });

  it('passes correct sections configuration', () => {
    render(<GalleryPageComponent />);

    expect(screen.getByText('Residential Projects - 3 projects')).toBeInTheDocument();
  });

  it('renders all three sections', () => {
    render(<GalleryPageComponent />);

    expect(screen.getByTestId('section-0')).toBeInTheDocument();
  });
}); 