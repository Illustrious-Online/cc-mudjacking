import { render, screen } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import StarRating from './star-rating';

const renderWithProvider = (component: React.ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{component}</ChakraProvider>);
};

describe('StarRating', () => {
  it('renders the correct number of stars', () => {
    renderWithProvider(<StarRating rating={3} />);
    
    const starRating = screen.getByTestId('star-rating');
    expect(starRating).toBeInTheDocument();
    
    // Should render 5 stars by default
    expect(screen.getByTestId('star-rating-star-1')).toBeInTheDocument();
    expect(screen.getByTestId('star-rating-star-2')).toBeInTheDocument();
    expect(screen.getByTestId('star-rating-star-3')).toBeInTheDocument();
    expect(screen.getByTestId('star-rating-star-4')).toBeInTheDocument();
    expect(screen.getByTestId('star-rating-star-5')).toBeInTheDocument();
  });

  it('renders custom number of stars', () => {
    renderWithProvider(<StarRating rating={2} maxRating={3} />);
    
    expect(screen.getByTestId('star-rating-star-1')).toBeInTheDocument();
    expect(screen.getByTestId('star-rating-star-2')).toBeInTheDocument();
    expect(screen.getByTestId('star-rating-star-3')).toBeInTheDocument();
    
    // Should not render more than maxRating
    expect(screen.queryByTestId('star-rating-star-4')).not.toBeInTheDocument();
  });

  it('applies correct colors based on rating', () => {
    renderWithProvider(<StarRating rating={3} />);
    
    const star1 = screen.getByTestId('star-rating-star-1');
    const star2 = screen.getByTestId('star-rating-star-2');
    const star3 = screen.getByTestId('star-rating-star-3');
    const star4 = screen.getByTestId('star-rating-star-4');
    const star5 = screen.getByTestId('star-rating-star-5');
    
    // First 3 stars should be active (yellow)
    expect(star1).toHaveStyle({ color: 'var(--chakra-colors-yellow-400)' });
    expect(star2).toHaveStyle({ color: 'var(--chakra-colors-yellow-400)' });
    expect(star3).toHaveStyle({ color: 'var(--chakra-colors-yellow-400)' });
    
    // Last 2 stars should be inactive (gray)
    expect(star4).toHaveStyle({ color: 'var(--chakra-colors-gray-300)' });
    expect(star5).toHaveStyle({ color: 'var(--chakra-colors-gray-300)' });
  });

  it('uses custom colors when provided', () => {
    renderWithProvider(
      <StarRating 
        rating={2} 
        activeColor="blue.500" 
        inactiveColor="red.300" 
      />
    );
    
    const star1 = screen.getByTestId('star-rating-star-1');
    const star2 = screen.getByTestId('star-rating-star-2');
    const star3 = screen.getByTestId('star-rating-star-3');
    
    expect(star1).toHaveStyle({ color: 'var(--chakra-colors-blue-500)' });
    expect(star2).toHaveStyle({ color: 'var(--chakra-colors-blue-500)' });
    expect(star3).toHaveStyle({ color: 'var(--chakra-colors-red-300)' });
  });

  it('uses custom test id when provided', () => {
    renderWithProvider(<StarRating rating={1} data-testid="custom-rating" />);
    
    expect(screen.getByTestId('custom-rating')).toBeInTheDocument();
    expect(screen.getByTestId('custom-rating-star-1')).toBeInTheDocument();
  });

  it('handles zero rating', () => {
    renderWithProvider(<StarRating rating={0} />);
    
    // All stars should be inactive
    for (let i = 1; i <= 5; i++) {
      const star = screen.getByTestId(`star-rating-star-${i}`);
      expect(star).toHaveStyle({ color: 'var(--chakra-colors-gray-300)' });
    }
  });

  it('handles rating equal to maxRating', () => {
    renderWithProvider(<StarRating rating={5} maxRating={5} />);
    
    // All stars should be active
    for (let i = 1; i <= 5; i++) {
      const star = screen.getByTestId(`star-rating-star-${i}`);
      expect(star).toHaveStyle({ color: 'var(--chakra-colors-yellow-400)' });
    }
  });
}); 