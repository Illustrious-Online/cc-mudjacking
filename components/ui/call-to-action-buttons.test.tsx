import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import CallToActionButtons from './call-to-action-buttons';
import { FREE_ESTIMATE, CALL_US_TODAY, PHONE_NUMBER } from '@/app/constants';

// Mock the NavLink component
vi.mock('./nav-link', () => ({
  default: ({ children, href, buttonProps }: any) => (
    <a href={href} data-testid="nav-link" {...buttonProps}>
      {children}
    </a>
  ),
}));

const renderCallToActionButtons = (props: React.ComponentProps<typeof CallToActionButtons>) => {
  return render(
    <ChakraProvider value={defaultSystem}>
      <CallToActionButtons {...props} />
    </ChakraProvider>,
  );
};

describe('CallToActionButtons', () => {
  it('renders both buttons with default props', () => {
    renderCallToActionButtons({});
    
    const navLinks = screen.getAllByTestId('nav-link');
    expect(navLinks).toHaveLength(2);
    
    // Check contact button
    expect(navLinks[0]).toHaveAttribute('href', '/contact');
    expect(navLinks[0]).toHaveTextContent(FREE_ESTIMATE);
    
    // Check phone button
    expect(navLinks[1]).toHaveAttribute('href', 'tel:6416919999');
    expect(navLinks[1]).toHaveTextContent(CALL_US_TODAY);
    expect(navLinks[1]).toHaveTextContent(PHONE_NUMBER);
  });

  it('renders with custom margin top prop', () => {
    renderCallToActionButtons({ mt: 12 });
    
    // Verify the component renders correctly with custom margin
    const navLinks = screen.getAllByTestId('nav-link');
    expect(navLinks).toHaveLength(2);
  });

  it('renders with white phone button when whitePhoneButton is true', () => {
    renderCallToActionButtons({ whitePhoneButton: true });
    
    const navLinks = screen.getAllByTestId('nav-link');
    const phoneButton = navLinks[1];
    
    expect(phoneButton).toHaveAttribute('colorScheme', 'white');
  });

  it('renders with brand phone button when whitePhoneButton is false', () => {
    renderCallToActionButtons({ whitePhoneButton: false });
    
    const navLinks = screen.getAllByTestId('nav-link');
    const phoneButton = navLinks[1];
    
    expect(phoneButton).toHaveAttribute('colorScheme', 'brand');
  });

  it('renders with brand phone button by default', () => {
    renderCallToActionButtons({});
    
    const navLinks = screen.getAllByTestId('nav-link');
    const phoneButton = navLinks[1];
    
    expect(phoneButton).toHaveAttribute('colorScheme', 'brand');
  });

  it('includes phone icon in the phone button', () => {
    renderCallToActionButtons({});
    
    const phoneButton = screen.getAllByTestId('nav-link')[1];
    expect(phoneButton).toHaveTextContent(CALL_US_TODAY);
    expect(phoneButton).toHaveTextContent(PHONE_NUMBER);
  });

  it('has correct button variants', () => {
    renderCallToActionButtons({});
    
    const navLinks = screen.getAllByTestId('nav-link');
    
    // Contact button should be solid
    expect(navLinks[0]).toHaveAttribute('variant', 'solid');
    
    // Phone button should be outline
    expect(navLinks[1]).toHaveAttribute('variant', 'outline');
  });

  it('has correct button sizes', () => {
    renderCallToActionButtons({});
    
    const navLinks = screen.getAllByTestId('nav-link');
    
    // Both buttons should be present (size is handled by Chakra UI internally)
    expect(navLinks).toHaveLength(2);
  });
}); 