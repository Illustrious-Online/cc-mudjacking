import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import NavLink from './nav-link';

describe('NavLink', () => {
  const renderNavLink = (props: React.ComponentProps<typeof NavLink>) => {
    return render(
      <ChakraProvider value={defaultSystem}>
        <NavLink {...props} />
      </ChakraProvider>,
    );
  };

  it('renders as a link when no buttonProps or asButton is provided', () => {
    renderNavLink({
      href: '/test',
      children: 'Test Link'
    });
    
    const link = screen.getByRole('link', { name: 'Test Link' });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
  });

  it('renders as an anchor styled as a button when buttonProps is provided', () => {
    renderNavLink({
      href: '/test',
      buttonProps: { variant: 'solid' },
      children: 'Test Button'
    });
    
    const link = screen.getByRole('link', { name: 'Test Button' });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
  });

  it('renders as an anchor styled as a button when asButton is true', () => {
    renderNavLink({
      href: '/test',
      asButton: true,
      children: 'Test Button'
    });
    
    const link = screen.getByRole('link', { name: 'Test Button' });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
  });

  it('renders as an anchor styled as a button when both asButton and buttonProps are provided', () => {
    renderNavLink({
      href: '/test',
      asButton: true,
      buttonProps: { variant: 'outline' },
      children: 'Test Button'
    });
    
    const link = screen.getByRole('link', { name: 'Test Button' });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
  });

  it('applies buttonProps correctly (still renders as anchor)', () => {
    renderNavLink({
      href: '/test',
      buttonProps: { 
        variant: 'solid', 
        colorScheme: 'blue',
        size: 'lg'
      },
      children: 'Test Button'
    });
    
    const link = screen.getByRole('link', { name: 'Test Button' });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
  });
}); 