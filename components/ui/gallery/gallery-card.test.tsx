import { render, screen } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import GalleryCard from './gallery-card';
import { GalleryProject } from "../types";

const renderWithProvider = (component: React.ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{component}</ChakraProvider>);
};

const mockProject: GalleryProject = {
  id: 1,
  before: {
    src: 'https://example.com/before.jpg',
    title: 'Sunken Driveway',
    description: 'Severe settlement causing trip hazards',
  },
  after: {
    src: 'https://example.com/after.jpg',
    title: 'Level & Safe',
    description: 'Professional mudjacking restoration',
  },
  service: 'Driveway Leveling',
  location: 'Residential Home',
  completionTime: '1 Day',
};

describe('GalleryCard', () => {
  it('renders project information correctly', () => {
    renderWithProvider(<GalleryCard project={mockProject} />);
    
    expect(screen.getByTestId('gallery-card')).toBeInTheDocument();
    expect(screen.getByTestId('gallery-card-service')).toHaveTextContent('Driveway Leveling');
    expect(screen.getByTestId('gallery-card-meta')).toHaveTextContent('Residential Home • Completed in 1 Day');
  });

  it('displays before and after images with correct badges', () => {
    renderWithProvider(<GalleryCard project={mockProject} />);
    
    const beforeImage = screen.getByAltText('Sunken Driveway');
    const afterImage = screen.getByAltText('Level & Safe');
    
    expect(beforeImage).toBeInTheDocument();
    expect(afterImage).toBeInTheDocument();
    expect(beforeImage).toHaveAttribute('src', 'https://example.com/before.jpg');
    expect(afterImage).toHaveAttribute('src', 'https://example.com/after.jpg');
    
    expect(screen.getByTestId('gallery-card-before-badge')).toHaveTextContent('BEFORE');
    expect(screen.getByTestId('gallery-card-after-badge')).toHaveTextContent('AFTER');
  });

  it('displays before and after descriptions', () => {
    renderWithProvider(<GalleryCard project={mockProject} />);
    
    expect(screen.getByTestId('gallery-card-before-title')).toHaveTextContent('Before: Sunken Driveway');
    expect(screen.getByTestId('gallery-card-before-description')).toHaveTextContent('Severe settlement causing trip hazards');
    expect(screen.getByTestId('gallery-card-after-title')).toHaveTextContent('After: Level & Safe');
    expect(screen.getByTestId('gallery-card-after-description')).toHaveTextContent('Professional mudjacking restoration');
  });

  it('uses custom test id when provided', () => {
    renderWithProvider(<GalleryCard project={mockProject} data-testid="custom-card" />);
    
    expect(screen.getByTestId('custom-card')).toBeInTheDocument();
    expect(screen.getByTestId('custom-card-service')).toBeInTheDocument();
    expect(screen.getByTestId('custom-card-before')).toBeInTheDocument();
    expect(screen.getByTestId('custom-card-after')).toBeInTheDocument();
  });

  it('renders with different project data', () => {
    const differentProject: GalleryProject = {
      id: 2,
      before: {
        src: 'https://example.com/patio-before.jpg',
        title: 'Uneven Patio',
        description: 'Pool deck with dangerous elevation changes',
      },
      after: {
        src: 'https://example.com/patio-after.jpg',
        title: 'Perfectly Level',
        description: 'Safe, level surface for family enjoyment',
      },
      service: 'Patio Leveling',
      location: 'Backyard Pool Area',
      completionTime: '2 Days',
    };

    renderWithProvider(<GalleryCard project={differentProject} />);
    
    expect(screen.getByTestId('gallery-card-service')).toHaveTextContent('Patio Leveling');
    expect(screen.getByTestId('gallery-card-meta')).toHaveTextContent('Backyard Pool Area • Completed in 2 Days');
    expect(screen.getByTestId('gallery-card-before-title')).toHaveTextContent('Before: Uneven Patio');
    expect(screen.getByTestId('gallery-card-after-title')).toHaveTextContent('After: Perfectly Level');
  });
}); 