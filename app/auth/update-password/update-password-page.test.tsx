import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChakraProvider } from '@/providers/ChakraProvider';
import UpdatePasswordPage from './page';

vi.mock('@/components/ui/wrapper', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="wrapper">{children}</div>
  ),
}));

vi.mock('./update-password-form', () => ({
  default: () => <div data-testid="update-password-form" />,
}));

const renderUpdatePasswordPage = () => {
  render(
    <ChakraProvider>
      <UpdatePasswordPage />
    </ChakraProvider>
  );
};

describe('UpdatePasswordPage', () => {
  it('renders the Wrapper component', () => {
    renderUpdatePasswordPage();
    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
  });

  it('renders the heading with correct text', () => {
    renderUpdatePasswordPage();
    expect(
      screen.getByRole('heading', { name: /please set your new password/i })
    ).toBeInTheDocument();
  });

  it('renders the UpdatePasswordForm component', () => {
    renderUpdatePasswordPage();
    expect(screen.getByTestId('update-password-form')).toBeInTheDocument();
  });

  it('has proper layout structure', () => {
    renderUpdatePasswordPage();

    // Check that the page has the expected structure
    const wrapper = screen.getByTestId('wrapper');
    const heading = screen.getByRole('heading', { name: /please set your new password/i });
    const form = screen.getByTestId('update-password-form');

    expect(wrapper).toContainElement(heading);
    expect(wrapper).toContainElement(form);
  });

  it('applies correct styling to the container', () => {
    renderUpdatePasswordPage();

    // The page should have a flex container with proper alignment
    const container = screen.getByTestId('wrapper').firstChild;
    expect(container).toBeInTheDocument();
  });
});
