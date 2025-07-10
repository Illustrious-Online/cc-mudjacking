import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChakraProvider } from '@/providers/ChakraProvider';
import ResetPasswordPage from './page';

vi.mock('@/components/ui/wrapper', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="wrapper">{children}</div>
  ),
}));

vi.mock('./reset-password-form', () => ({
  default: () => <div data-testid="reset-password-form" />,
}));

const renderResetPasswordPage = () => {
  render(
    <ChakraProvider>
      <ResetPasswordPage />
    </ChakraProvider>
  );
};

describe('ResetPasswordPage', () => {
  it('renders the Wrapper component', () => {
    renderResetPasswordPage();
    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
  });

  it('renders the heading with correct text', () => {
    renderResetPasswordPage();
    expect(
      screen.getByRole('heading', { name: /enter your email to reset password/i })
    ).toBeInTheDocument();
  });

  it('renders the ResetPasswordForm component', () => {
    renderResetPasswordPage();
    expect(screen.getByTestId('reset-password-form')).toBeInTheDocument();
  });

  it('has proper layout structure', () => {
    renderResetPasswordPage();

    // Check that the page has the expected structure
    const wrapper = screen.getByTestId('wrapper');
    const heading = screen.getByRole('heading', { name: /enter your email to reset password/i });
    const form = screen.getByTestId('reset-password-form');

    expect(wrapper).toContainElement(heading);
    expect(wrapper).toContainElement(form);
  });

  it('applies correct styling to the container', () => {
    renderResetPasswordPage();

    // The page should have a flex container with proper alignment
    const container = screen.getByTestId('wrapper').firstChild;
    expect(container).toBeInTheDocument();
  });

  it('has proper spacing between elements', () => {
    renderResetPasswordPage();

    // The heading should have margin bottom
    const heading = screen.getByRole('heading', { name: /enter your email to reset password/i });
    expect(heading).toBeInTheDocument();

    // The form should be rendered after the heading
    const form = screen.getByTestId('reset-password-form');
    expect(form).toBeInTheDocument();
  });

  it('renders all required components', () => {
    renderResetPasswordPage();

    // Check that all expected elements are present
    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByTestId('reset-password-form')).toBeInTheDocument();
  });

  it('has accessible heading structure', () => {
    renderResetPasswordPage();

    const heading = screen.getByRole('heading', { name: /enter your email to reset password/i });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2'); // Chakra UI Heading defaults to h2
  });
});
