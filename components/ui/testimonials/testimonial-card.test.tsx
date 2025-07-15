import { render, screen } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import TestimonialCard from './testimonial-card';
import { Testimonial } from "../types";

const renderWithProvider = (component: React.ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{component}</ChakraProvider>);
};

const mockTestimonial: Testimonial = {
  id: 1,
  name: 'Sarah Johnson',
  location: 'Residential Customer',
  rating: 5,
  text: 'Amazing work! Our sunken driveway was completely transformed in just one day. The team was professional, clean, and the results exceeded our expectations. Highly recommend!',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150',
  service: 'Driveway Leveling',
};

describe('TestimonialCard', () => {
  it('renders testimonial information correctly', () => {
    renderWithProvider(<TestimonialCard testimonial={mockTestimonial} />);
    
    expect(screen.getByTestId('testimonial-card')).toBeInTheDocument();
    expect(screen.getByTestId('testimonial-card-name')).toHaveTextContent('Sarah Johnson');
    expect(screen.getByTestId('testimonial-card-location')).toHaveTextContent('Residential Customer');
    expect(screen.getByTestId('testimonial-card-text')).toHaveTextContent(mockTestimonial.text);
    expect(screen.getByTestId('testimonial-card-service')).toHaveTextContent('Driveway Leveling');
  });

  it('displays avatar image correctly', () => {
    renderWithProvider(<TestimonialCard testimonial={mockTestimonial} />);
    
    const avatar = screen.getByAltText('Sarah Johnson');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', mockTestimonial.avatar);
  });

  it('renders star rating component', () => {
    renderWithProvider(<TestimonialCard testimonial={mockTestimonial} />);
    
    expect(screen.getByTestId('testimonial-card-rating')).toBeInTheDocument();
    expect(screen.getByTestId('testimonial-card-rating-star-1')).toBeInTheDocument();
    expect(screen.getByTestId('testimonial-card-rating-star-5')).toBeInTheDocument();
  });

  it('displays quote icon', () => {
    renderWithProvider(<TestimonialCard testimonial={mockTestimonial} />);
    
    expect(screen.getByTestId('testimonial-card-quote-icon')).toBeInTheDocument();
  });

  it('uses custom test id when provided', () => {
    renderWithProvider(
      <TestimonialCard 
        testimonial={mockTestimonial} 
        data-testid="custom-testimonial" 
      />
    );
    
    expect(screen.getByTestId('custom-testimonial')).toBeInTheDocument();
    expect(screen.getByTestId('custom-testimonial-name')).toBeInTheDocument();
    expect(screen.getByTestId('custom-testimonial-rating')).toBeInTheDocument();
  });

  it('renders with different testimonial data', () => {
    const differentTestimonial: Testimonial = {
      id: 2,
      name: 'Mike Rodriguez',
      location: 'Commercial Property Owner',
      rating: 4,
      text: 'We had multiple settlement issues in our warehouse floor. The mudjacking team was efficient and professional.',
      avatar: 'https://example.com/avatar2.jpg',
      service: 'Industrial Floor Leveling',
    };

    renderWithProvider(<TestimonialCard testimonial={differentTestimonial} />);
    
    expect(screen.getByTestId('testimonial-card-name')).toHaveTextContent('Mike Rodriguez');
    expect(screen.getByTestId('testimonial-card-location')).toHaveTextContent('Commercial Property Owner');
    expect(screen.getByTestId('testimonial-card-text')).toHaveTextContent(differentTestimonial.text);
    expect(screen.getByTestId('testimonial-card-service')).toHaveTextContent('Industrial Floor Leveling');
  });

  it('handles different rating values', () => {
    const lowRatingTestimonial: Testimonial = {
      ...mockTestimonial,
      rating: 3,
    };

    renderWithProvider(<TestimonialCard testimonial={lowRatingTestimonial} />);
    
    expect(screen.getByTestId('testimonial-card-rating')).toBeInTheDocument();
    // Should still render 5 stars but only 3 should be active
    expect(screen.getByTestId('testimonial-card-rating-star-1')).toBeInTheDocument();
    expect(screen.getByTestId('testimonial-card-rating-star-5')).toBeInTheDocument();
  });
}); 