import { render, screen } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import TestimonialsSection from './testimonials-section';
import { Testimonial } from "../types";

const renderWithProvider = (component: React.ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{component}</ChakraProvider>);
};

const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'Residential Customer',
    rating: 5,
    text: 'Amazing work! Our sunken driveway was completely transformed in just one day.',
    avatar: 'https://example.com/avatar1.jpg',
    service: 'Driveway Leveling',
  },
  {
    id: 2,
    name: 'Mike Rodriguez',
    location: 'Commercial Property Owner',
    rating: 4,
    text: 'We had multiple settlement issues in our warehouse floor. The mudjacking team was efficient and professional.',
    avatar: 'https://example.com/avatar2.jpg',
    service: 'Industrial Floor Leveling',
  },
];

describe('TestimonialsSection', () => {
  it('renders section header correctly', () => {
    renderWithProvider(<TestimonialsSection testimonials={mockTestimonials} />);
    
    expect(screen.getByTestId('testimonials-section')).toBeInTheDocument();
    expect(screen.getByTestId('testimonials-section-title')).toHaveTextContent('What Our Customers Say');
    expect(screen.getByTestId('testimonials-section-description')).toHaveTextContent(
      'Don\'t just take our word for it. Here\'s what our satisfied customers have to say about their experience with our mudjacking services.'
    );
  });

  it('renders the correct number of testimonial cards', () => {
    renderWithProvider(<TestimonialsSection testimonials={mockTestimonials} />);
    
    expect(screen.getByTestId('testimonials-section-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('testimonials-section-card-2')).toBeInTheDocument();
  });

  it('displays testimonial information in cards', () => {
    renderWithProvider(<TestimonialsSection testimonials={mockTestimonials} />);
    
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText('Mike Rodriguez')).toBeInTheDocument();
    expect(screen.getByText('Residential Customer')).toBeInTheDocument();
    expect(screen.getByText('Commercial Property Owner')).toBeInTheDocument();
  });

  it('renders CTA section', () => {
    renderWithProvider(<TestimonialsSection testimonials={mockTestimonials} />);
    
    expect(screen.getByTestId('testimonials-section-cta-text')).toHaveTextContent(
      'Ready to see similar results on your property?'
    );
    expect(screen.getByTestId('testimonials-section-cta-button')).toHaveTextContent('Get Your Free Estimate');
  });

  it('uses custom title and description', () => {
    const customTitle = 'Customer Reviews';
    const customDescription = 'Read what our customers have to say.';
    
    renderWithProvider(
      <TestimonialsSection
        testimonials={mockTestimonials}
        title={customTitle}
        description={customDescription}
      />
    );
    
    expect(screen.getByTestId('testimonials-section-title')).toHaveTextContent(customTitle);
    expect(screen.getByTestId('testimonials-section-description')).toHaveTextContent(customDescription);
  });

  it('uses custom CTA text and href', () => {
    const customCtaText = 'Contact Us Today';
    const customCtaHref = '/get-quote';
    
    renderWithProvider(
      <TestimonialsSection
        testimonials={mockTestimonials}
        ctaText={customCtaText}
        ctaHref={customCtaHref}
      />
    );
    
    expect(screen.getByTestId('testimonials-section-cta-button')).toHaveTextContent(customCtaText);
    const ctaButton = screen.getByTestId('testimonials-section-cta-button');
    expect(ctaButton.closest('a')).toHaveAttribute('href', customCtaHref);
  });

  it('uses custom test id when provided', () => {
    renderWithProvider(
      <TestimonialsSection
        testimonials={mockTestimonials}
        data-testid="custom-testimonials"
      />
    );
    
    expect(screen.getByTestId('custom-testimonials')).toBeInTheDocument();
    expect(screen.getByTestId('custom-testimonials-title')).toBeInTheDocument();
    expect(screen.getByTestId('custom-testimonials-card-1')).toBeInTheDocument();
  });

  it('renders with empty testimonials array', () => {
    renderWithProvider(<TestimonialsSection testimonials={[]} />);
    
    expect(screen.getByTestId('testimonials-section')).toBeInTheDocument();
    expect(screen.getByTestId('testimonials-section-title')).toBeInTheDocument();
    expect(screen.getByTestId('testimonials-section-grid')).toBeInTheDocument();
    expect(screen.getByTestId('testimonials-section-cta')).toBeInTheDocument();
  });
}); 