import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ContactPage from './page';

// Mock the wrapper component
vi.mock('@/components/ui/wrapper', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const renderContactPage = () => {
  return render(
    <ChakraProvider value={defaultSystem}>
      <ContactPage />
    </ChakraProvider>
  );
};

describe('ContactPage', () => {
  it('renders the contact page with hero section', () => {
    renderContactPage();

    // Check hero section
    expect(screen.getByTestId('contact-hero')).toBeInTheDocument();
    expect(screen.getByTestId('contact-hero-title')).toHaveTextContent('Contact Us');
    expect(screen.getByTestId('contact-hero-description')).toHaveTextContent(
      'Get your free estimate today! Our team is ready to help you with all your concrete lifting and mudjacking needs.'
    );
  });

  it('renders section headers', () => {
    renderContactPage();

    // Check section headings
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByText('Request Your Free Estimate')).toBeInTheDocument();
  });

  it('renders contact info section', () => {
    renderContactPage();

    // Check that contact info cards are rendered
    // Check for form labels and contact info headings separately
    expect(screen.getByText('Email Address')).toBeInTheDocument(); // Form label
    expect(screen.getByRole('heading', { name: 'Phone' })).toBeInTheDocument(); // Contact info heading
    expect(screen.getByRole('heading', { name: 'Email' })).toBeInTheDocument(); // Contact info heading
    expect(screen.getByRole('heading', { name: 'Service Area' })).toBeInTheDocument(); // Contact info heading
  });

  it('renders contact form component', () => {
    renderContactPage();

    // Check that the form is rendered (button should be present)
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('renders contact information with correct content', () => {
    renderContactPage();

    // Check contact information content
    expect(screen.getByText('ccmudjacking@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('Central Iowa')).toBeInTheDocument();
  });

  it('renders clickable contact links', () => {
    renderContactPage();

    // Check that phone and email are clickable links
    const emailLink = screen.getByRole('link', { name: 'ccmudjacking@gmail.com' });
    expect(emailLink).toHaveAttribute('href', 'mailto:ccmudjacking@gmail.com');
  });
});
