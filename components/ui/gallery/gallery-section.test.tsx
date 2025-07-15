import { render, screen } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';
import GallerySection from './gallery-section';
import { GalleryProject } from "../types";

const renderWithProvider = (component: React.ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{component}</ChakraProvider>);
};

const mockProjects: GalleryProject[] = [
  {
    id: 1,
    before: {
      src: 'https://example.com/before1.jpg',
      title: 'Sunken Driveway',
      description: 'Severe settlement causing trip hazards',
    },
    after: {
      src: 'https://example.com/after1.jpg',
      title: 'Level & Safe',
      description: 'Professional mudjacking restoration',
    },
    service: 'Driveway Leveling',
    location: 'Residential Home',
    completionTime: '1 Day',
  },
  {
    id: 2,
    before: {
      src: 'https://example.com/before2.jpg',
      title: 'Uneven Patio',
      description: 'Pool deck with dangerous elevation changes',
    },
    after: {
      src: 'https://example.com/after2.jpg',
      title: 'Perfectly Level',
      description: 'Safe, level surface for family enjoyment',
    },
    service: 'Patio Leveling',
    location: 'Backyard Pool Area',
    completionTime: '2 Days',
  },
];

describe('GallerySection', () => {
  it('renders section header correctly', () => {
    renderWithProvider(
      <GallerySection
        title="Residential Projects"
        icon={FaHome}
        projects={mockProjects}
      />
    );
    
    expect(screen.getByTestId('gallery-section')).toBeInTheDocument();
    expect(screen.getByTestId('gallery-section-title')).toHaveTextContent('Residential Projects');
    expect(screen.getByTestId('gallery-section-description')).toHaveTextContent(
      'Browse through our completed residential projects projects'
    );
  });

  it('renders the correct number of gallery cards', () => {
    renderWithProvider(
      <GallerySection
        title="Residential Projects"
        icon={FaHome}
        projects={mockProjects}
      />
    );
    
    expect(screen.getByTestId('gallery-section-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('gallery-section-card-2')).toBeInTheDocument();
  });

  it('displays project information in cards', () => {
    renderWithProvider(
      <GallerySection
        title="Residential Projects"
        icon={FaHome}
        projects={mockProjects}
      />
    );
    
    expect(screen.getByText('Driveway Leveling')).toBeInTheDocument();
    expect(screen.getByText('Patio Leveling')).toBeInTheDocument();
    expect(screen.getByText('Residential Home • Completed in 1 Day')).toBeInTheDocument();
    expect(screen.getByText('Backyard Pool Area • Completed in 2 Days')).toBeInTheDocument();
  });

  it('renders with custom background color', () => {
    renderWithProvider(
      <GallerySection
        title="Residential Projects"
        icon={FaHome}
        projects={mockProjects}
        bgColor="gray.50"
      />
    );
    
    const section = screen.getByTestId('gallery-section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('data-testid', 'gallery-section');
    expect(section).toHaveAttribute('class');
  });

  it('uses custom test id when provided', () => {
    renderWithProvider(
      <GallerySection
        title="Residential Projects"
        icon={FaHome}
        projects={mockProjects}
        data-testid="custom-section"
      />
    );
    
    expect(screen.getByTestId('custom-section')).toBeInTheDocument();
    expect(screen.getByTestId('custom-section-title')).toBeInTheDocument();
    expect(screen.getByTestId('custom-section-card-1')).toBeInTheDocument();
  });

  it('renders with empty projects array', () => {
    renderWithProvider(
      <GallerySection
        title="Empty Section"
        icon={FaHome}
        projects={[]}
      />
    );
    
    expect(screen.getByTestId('gallery-section')).toBeInTheDocument();
    expect(screen.getByTestId('gallery-section-title')).toHaveTextContent('Empty Section');
    expect(screen.getByTestId('gallery-section-grid')).toBeInTheDocument();
  });

  it('renders with different title and icon', () => {
    renderWithProvider(
      <GallerySection
        title="Commercial Projects"
        icon={FaHome}
        projects={mockProjects}
      />
    );
    
    expect(screen.getByTestId('gallery-section-title')).toHaveTextContent('Commercial Projects');
    expect(screen.getByTestId('gallery-section-description')).toHaveTextContent(
      'Browse through our completed commercial projects projects'
    );
  });
}); 