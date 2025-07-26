import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HomePage from './page';

vi.mock('@/components/wrapper', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const renderHome = () => {
  return render(
    <ChakraProvider value={defaultSystem}>
      <HomePage />
    </ChakraProvider>
  );
};

describe('Home Page', () => {
  it('renders the main headings', () => {
    renderHome();
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Professional Mudjacking Services/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Our Professional Services/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: /Before & After Results/i,
      })
    ).toBeInTheDocument();
  });

  it('renders service cards', () => {
    renderHome();
    expect(screen.getByText(/Residential/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Environmentally Friendly/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Foundation/i).length).toBeGreaterThan(0);
  });

  it('renders call-to-action buttons', () => {
    renderHome();
    expect(screen.getAllByText(/Get Your Free Estimate Today/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/\(641\) 691-9999/i).length).toBeGreaterThan(0);
  });

  it('renders trust indicators', () => {
    renderHome();
    expect(screen.getByText(/Fully Insured/i)).toBeInTheDocument();
    expect(screen.getByText(/Speedy Response/i)).toBeInTheDocument();
  });
});
