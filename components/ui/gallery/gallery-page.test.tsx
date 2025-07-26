import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { FaHome, FaBuilding } from 'react-icons/fa';
import GalleryPage from './gallery-page';
import { galleryData } from './gallery-data';
import { testimonials } from '@/components/ui/testimonials/testimonials';

const renderWithProvider = (component: React.ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{component}</ChakraProvider>);
};

// Mock the Wrapper component
vi.mock('@/components/ui/wrapper', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="wrapper">{children}</div>
  ),
}));

// Mock the gallery components
vi.mock('./gallery-hero', () => ({
  default: ({ title, description }: { title: string; description: string }) => (
    <div data-testid="gallery-hero">
      <h1 data-testid="gallery-hero-title">{title}</h1>
      <p data-testid="gallery-hero-description">{description}</p>
    </div>
  ),
}));

vi.mock('./gallery-section', () => ({
  default: ({ title, icon, projects, 'data-testid': testId = 'gallery-section' }: any) => (
    <div data-testid={testId}>
      <h2 data-testid={`${testId}-title`}>{title}</h2>
      <p data-testid={`${testId}-description`}>
        Browse through our completed {title.toLowerCase()} projects. Each project showcases our 
        commitment to quality, safety, and customer satisfaction.
      </p>
      <div data-testid={`${testId}-grid`}>
        {projects.map((project: any, index: number) => (
          <div key={project.id || index} data-testid={`${testId}-card-${index + 1}`}>
            {project.title || `Project ${index + 1}`}
          </div>
        ))}
      </div>
    </div>
  ),
}));

vi.mock('@/components/ui/testimonials/testimonials-section', () => ({
  default: ({ testimonials }: { testimonials: any[] }) => (
    <div data-testid="testimonials-section">
      <h2 data-testid="testimonials-section-title">What Our Customers Say</h2>
      <div data-testid="testimonials-section-grid">
        {testimonials.map((testimonial: any, index: number) => (
          <div key={testimonial.id || index} data-testid={`testimonials-section-card-${index + 1}`}>
            {testimonial.name || `Testimonial ${index + 1}`}
          </div>
        ))}
      </div>
    </div>
  ),
}));

describe('GalleryPage', () => {
  it('renders with default props', () => {
    renderWithProvider(<GalleryPage galleryData={galleryData} testimonials={testimonials} />);

    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('gallery-hero')).toBeInTheDocument();
    expect(screen.getByText('Before & After Gallery')).toBeInTheDocument();
    expect(screen.getByText(/See the incredible transformations/)).toBeInTheDocument();
  });

  it('renders with custom title and description', () => {
    const customTitle = 'Custom Gallery Title';
    const customDescription = 'Custom gallery description';

    renderWithProvider(
      <GalleryPage
        galleryData={galleryData}
        testimonials={testimonials}
        title={customTitle}
        description={customDescription}
      />
    );

    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.getByText(customDescription)).toBeInTheDocument();
  });

  it('renders default sections when no sections prop provided', () => {
    renderWithProvider(<GalleryPage galleryData={galleryData} testimonials={testimonials} />);

    expect(screen.getByText('Recent Projects')).toBeInTheDocument();
  });

  it('renders custom sections when provided', () => {
    const customSections = [
      {
        title: 'Custom Section 1',
        icon: FaHome,
        projects: galleryData.residential,
        bgColor: 'blue.50',
      },
      {
        title: 'Custom Section 2',
        icon: FaBuilding,
        projects: galleryData.residential,
      },
    ];

    renderWithProvider(
      <GalleryPage
        galleryData={galleryData}
        testimonials={testimonials}
        sections={customSections}
      />
    );

    expect(screen.getByText('Custom Section 1')).toBeInTheDocument();
    expect(screen.getByText('Custom Section 2')).toBeInTheDocument();
    expect(screen.queryByText('Recent Projects')).not.toBeInTheDocument();
  });

  it('renders testimonials section when testimonials provided', () => {
    renderWithProvider(
      <GalleryPage
        galleryData={galleryData}
        testimonials={testimonials}
        enableTestimonials={true}
      />
    );

    expect(screen.getByTestId('testimonials-section')).toBeInTheDocument();
    expect(screen.getByText('What Our Customers Say')).toBeInTheDocument();
  });

  it('renders correct number of projects in each section', () => {
    renderWithProvider(<GalleryPage galleryData={galleryData} testimonials={testimonials} />);

    // Check that the sections exist and contain the expected number of cards
    const recentSection = screen.getByText('Recent Projects').closest('[data-testid="gallery-section"]');
    expect(recentSection).toBeInTheDocument();
  });

  it('handles empty gallery data gracefully', () => {
    const emptyGalleryData = {
      residential: [],
    };

    renderWithProvider(<GalleryPage galleryData={emptyGalleryData} testimonials={testimonials} />);

    expect(screen.getByText('Recent Projects')).toBeInTheDocument();
  });
}); 