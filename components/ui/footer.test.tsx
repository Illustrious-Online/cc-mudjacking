import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import Footer from './footer';

describe('Footer', () => {
  beforeEach(() => {
    render(
      <ChakraProvider value={defaultSystem}>
        <Footer />
      </ChakraProvider>
    );
  });

  it('renders the footer component', () => {
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('displays the correct copyright text', () => {
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} CC Mudjacking\\. All rights reserved\\.`))).toBeInTheDocument();
  });

  it('displays the "Created by" text', () => {
    expect(screen.getByText(/Created by/)).toBeInTheDocument();
  });

  it('renders the Illustrious Online link with correct href', () => {
    const link = screen.getByText('Illustrious Online');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', 'https://illustrious.online');
    expect(link.closest('a')).toHaveAttribute('target', '_blank');
    expect(link.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has proper semantic structure', () => {
    const footer = screen.getByRole('contentinfo');
    expect(footer.tagName).toBe('FOOTER');
  });

  it('has proper styling attributes', () => {
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveAttribute('data-testid', 'footer');
  });

  it('renders privacy policy link', () => {
    const privacyLink = screen.getByText('Privacy Policy');
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink.closest('a')).toHaveAttribute('href', '/privacy');
  });

  it('displays contact information', () => {
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('(641) 691-9999')).toBeInTheDocument();
    expect(screen.getByText('ccmudjacking@gmail.com')).toBeInTheDocument();
  });

  it('displays quick links section', () => {
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Gallery')).toBeInTheDocument();
  });

  it('has clickable contact links', () => {
    const phoneLink = screen.getByText('(641) 691-9999');
    const emailLink = screen.getByText('ccmudjacking@gmail.com');
    
    expect(phoneLink.closest('a')).toHaveAttribute('href', 'tel:6416919999');
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:ccmudjacking@gmail.com');
  });
}); 