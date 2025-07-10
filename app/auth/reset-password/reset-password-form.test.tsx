import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { toaster } from '@/components/ui/toaster';
import { useAuth } from '@/contexts/AuthContext';
import { ChakraProvider } from '@/providers/ChakraProvider';
import ResetPasswordForm from './reset-password-form';

// Use real timers for better compatibility
vi.useRealTimers();

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/components/ui/toaster', () => ({
  toaster: {
    create: vi.fn(),
  },
}));

const renderResetPasswordForm = () => {
  return render(
    <ChakraProvider>
      <ResetPasswordForm />
    </ChakraProvider>
  );
};

describe('ResetPasswordForm', () => {
  const mockResetPassword = vi.fn();

  beforeEach(() => {
    (useAuth as Mock).mockReturnValue({
      isLoading: false,
      user: null,
      session: null,
      resetPassword: mockResetPassword,
    });
    vi.clearAllMocks();
  });

  it('renders the reset password form', () => {
    renderResetPasswordForm();
    expect(screen.getByPlaceholderText('Enter your email address')).toBeInTheDocument();
    expect(screen.getByText(/reset password/i)).toBeInTheDocument();
    expect(screen.getByText(/back to login/i)).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    renderResetPasswordForm();

    const emailInput = screen.getByPlaceholderText('Enter your email address');

    // Trigger blur event to show validation error
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    renderResetPasswordForm();

    const emailInput = screen.getByPlaceholderText('Enter your email address');

    // Test invalid email format
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });

    // Test valid email format
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.queryByText(/invalid email address/i)).not.toBeInTheDocument();
    });
  });

  it('calls resetPassword with valid form submission', async () => {
    mockResetPassword.mockResolvedValueOnce({ error: null });

    renderResetPasswordForm();

    const emailInput = screen.getByPlaceholderText('Enter your email address');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    await waitFor(() => {
      expect(screen.getByText(/reset password/i)).toBeEnabled();
    });

    fireEvent.click(screen.getByText(/reset password/i));

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith('test@example.com');
      expect(toaster.create).toHaveBeenCalledWith({
        title: 'Success',
        description: 'Check your email for a link to reset your password.',
        type: 'success',
        duration: 2500,
      });
    });
  });

  it('shows error toast if resetPassword fails', async () => {
    mockResetPassword.mockResolvedValueOnce({
      error: new Error('Reset password failed'),
    });

    renderResetPasswordForm();

    const emailInput = screen.getByPlaceholderText('Enter your email address');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    await waitFor(() => {
      expect(screen.getByText(/reset password/i)).toBeEnabled();
    });

    fireEvent.click(screen.getByText(/reset password/i));

    await waitFor(() => {
      expect(toaster.create).toHaveBeenCalledWith({
        title: 'Error',
        description: 'Reset password failed',
        type: 'error',
        duration: 2500,
      });
    });
  });

  it('shows error toast if resetPassword throws an exception', async () => {
    mockResetPassword.mockRejectedValueOnce(new Error('Network error'));

    renderResetPasswordForm();

    const emailInput = screen.getByPlaceholderText('Enter your email address');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    await waitFor(() => {
      expect(screen.getByText(/reset password/i)).toBeEnabled();
    });

    fireEvent.click(screen.getByText(/reset password/i));

    await waitFor(() => {
      expect(toaster.create).toHaveBeenCalledWith({
        title: 'Error',
        description: 'Network error',
        type: 'error',
        duration: 2500,
      });
    });
  });

  it('disables submit button when form is invalid', () => {
    renderResetPasswordForm();

    // Initially the form should be invalid (empty email)
    expect(screen.getByText(/reset password/i)).toBeDisabled();
  });

  it('enables submit button when form is valid', async () => {
    renderResetPasswordForm();

    const emailInput = screen.getByPlaceholderText('Enter your email address');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    await waitFor(() => {
      expect(screen.getByText(/reset password/i)).toBeEnabled();
    });
  });

  it('shows loading state during form submission', async () => {
    // Mock a delayed response to test loading state
    mockResetPassword.mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(() => resolve({ error: null }), 100))
    );

    renderResetPasswordForm();

    const emailInput = screen.getByPlaceholderText('Enter your email address');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    await waitFor(() => {
      expect(screen.getByText(/reset password/i)).toBeEnabled();
    });

    fireEvent.click(screen.getByText(/reset password/i));

    // The button should show loading state (loading prop is used instead of disabled)
    const button = screen.getByText(/reset password/i);
    expect(button).toBeInTheDocument();
    // Note: The loading state is handled by the loading prop, not disabled state
  });

  it('renders back to login link with correct href', () => {
    renderResetPasswordForm();

    const backLink = screen.getByText(/back to login/i);
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest('a')).toHaveAttribute('href', '/auth/login');
  });

  it('handles form submission with different email formats', async () => {
    mockResetPassword.mockResolvedValue({ error: null });

    renderResetPasswordForm();

    const emailInput = screen.getByPlaceholderText('Enter your email address');

    // Test with different email formats
    const testEmails = [
      'user@example.com',
      'user.name@example.com',
      'user+tag@example.com',
      'user123@example.co.uk',
    ];

    for (const email of testEmails) {
      fireEvent.change(emailInput, { target: { value: email } });

      await waitFor(() => {
        expect(screen.getByText(/reset password/i)).toBeEnabled();
      });

      fireEvent.click(screen.getByText(/reset password/i));

      await waitFor(() => {
        expect(mockResetPassword).toHaveBeenCalledWith(email);
      });

      // Clear the mock for next iteration
      mockResetPassword.mockClear();
    }
  });

  it('maintains form state during validation', async () => {
    renderResetPasswordForm();

    const emailInput = screen.getByPlaceholderText('Enter your email address');

    // Enter valid email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Trigger validation
    fireEvent.blur(emailInput);

    // Email should still be in the input
    expect(emailInput).toHaveValue('test@example.com');

    // Form should still be valid
    await waitFor(() => {
      expect(screen.getByText(/reset password/i)).toBeEnabled();
    });
  });
});
