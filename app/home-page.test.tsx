import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { useAuth } from '@/contexts/AuthContext';
import HomePage from './page';

vi.mock('@/components/wrapper', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    refresh: vi.fn(),
  })),
}));

const renderHome = () => {
  return render(
    <ChakraProvider value={defaultSystem}>
      <HomePage />
    </ChakraProvider>
  );
};

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as unknown as Mock).mockReturnValue({ session: null });
  });

  it('renders the main headings', () => {
    renderHome();
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Professional Mudjacking & Concrete Lifting Services/i,
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
    expect(screen.getByText(/Residential Mudjacking/i)).toBeInTheDocument();
    expect(screen.getByText(/Commercial Services/i)).toBeInTheDocument();
    // 'Foundation Repair' appears in both a heading and a paragraph, so use getAllByText
    const foundationRepairMatches = screen.getAllByText(/Foundation Repair/i);
    expect(foundationRepairMatches.length).toBeGreaterThan(0);
  });

  it('renders call-to-action buttons', () => {
    renderHome();
    expect(screen.getByText(/Get Free Estimate/i)).toBeInTheDocument();
    expect(screen.getByText(/Call \(555\) 123-4567/i)).toBeInTheDocument();
  });

  it('renders trust indicators', () => {
    renderHome();
    expect(screen.getByText(/Fully Licensed & Insured/i)).toBeInTheDocument();
    expect(screen.getByText(/Same Day Service/i)).toBeInTheDocument();
  });
});
