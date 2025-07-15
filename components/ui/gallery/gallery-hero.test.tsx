import { render, screen } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import GalleryHero from './gallery-hero';

const renderWithProvider = (component: React.ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{component}</ChakraProvider>);
};

describe('GalleryHero', () => {
  it('renders title and description correctly', () => {
    const title = 'Before & After Gallery';
    const description = 'See the incredible transformations we\'ve achieved through professional mudjacking services.';
    
    renderWithProvider(
      <GalleryHero
        title={title}
        description={description}
      />
    );
    
    expect(screen.getByTestId('gallery-hero')).toBeInTheDocument();
    expect(screen.getByTestId('gallery-hero-title')).toHaveTextContent(title);
    expect(screen.getByTestId('gallery-hero-description')).toHaveTextContent(description);
  });

  it('uses custom test id when provided', () => {
    renderWithProvider(
      <GalleryHero
        title="Custom Title"
        description="Custom description"
        data-testid="custom-hero"
      />
    );
    
    expect(screen.getByTestId('custom-hero')).toBeInTheDocument();
    expect(screen.getByTestId('custom-hero-title')).toBeInTheDocument();
    expect(screen.getByTestId('custom-hero-description')).toBeInTheDocument();
  });

  it('renders with different content', () => {
    const differentTitle = 'Project Showcase';
    const differentDescription = 'Explore our portfolio of successful projects.';
    
    renderWithProvider(
      <GalleryHero
        title={differentTitle}
        description={differentDescription}
      />
    );
    
    expect(screen.getByTestId('gallery-hero-title')).toHaveTextContent(differentTitle);
    expect(screen.getByTestId('gallery-hero-description')).toHaveTextContent(differentDescription);
  });

  it('applies correct styling classes', () => {
    renderWithProvider(
      <GalleryHero
        title="Test Title"
        description="Test description"
      />
    );
    
    const hero = screen.getByTestId('gallery-hero');
    const title = screen.getByTestId('gallery-hero-title');
    const description = screen.getByTestId('gallery-hero-description');
    
    // Check that the elements exist and have the expected content
    expect(hero).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    
    // Check that the elements have some styling applied (without checking specific class names)
    expect(hero).toHaveAttribute('class');
    expect(title).toHaveAttribute('class');
    expect(description).toHaveAttribute('class');
  });
}); 