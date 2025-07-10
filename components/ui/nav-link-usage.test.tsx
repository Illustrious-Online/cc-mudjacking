import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import NavLink from './nav-link';
import { describe, it, expect } from 'vitest';

describe('NavLink usage in a component', () => {
  const renderWithProvider = (ui: React.ReactNode) =>
    render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>);

  it('renders NavLink as a link inside a component', () => {
    renderWithProvider(
      <div>
        <NavLink href="/about">About Us</NavLink>
      </div>
    );
    const link = screen.getByRole('link', { name: 'About Us' });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/about');
  });

  it('renders NavLink as an anchor styled as a button inside a component', () => {
    renderWithProvider(
      <div>
        <NavLink href="/contact" buttonProps={{ colorScheme: 'blue' }}>
          Contact
        </NavLink>
      </div>
    );
    const link = screen.getByRole('link', { name: 'Contact' });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/contact');
  });
}); 