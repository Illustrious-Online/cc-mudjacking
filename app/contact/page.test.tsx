import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PHONE_NUMBER } from '../constants';
import ContactPage from './page';

// Mock the fetch function
global.fetch = vi.fn();

// Mock the toaster
vi.mock('@/components/ui/toaster', () => ({
  toaster: {
    create: vi.fn(),
  },
}));

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
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the contact page with form', () => {
    renderContactPage();

    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText(/Get your free estimate today!/)).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Service Needed')).toBeInTheDocument();
    expect(screen.getByLabelText('Project Details')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();
  });

  it('displays contact information cards with correct information', () => {
    renderContactPage();

    expect(screen.getByText('Get In Touch')).toBeInTheDocument();

    // Email card
    expect(screen.getByText('Email Us')).toBeInTheDocument();
    expect(screen.getByText('ccmudjacking@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('Reach out to us 24/7')).toBeInTheDocument();

    // Service area card
    expect(screen.getByText('Service Area')).toBeInTheDocument();
    expect(screen.getByText('Greater Metro Area')).toBeInTheDocument();
    expect(screen.getByText('Free Estimates')).toBeInTheDocument();

    // Phone card
    expect(screen.getByText('Call Us')).toBeInTheDocument();
    expect(screen.getByText(PHONE_NUMBER)).toBeInTheDocument();
    expect(screen.getByText('Speedy Response Time')).toBeInTheDocument();
  });

  it('displays the correct phone number from constants', () => {
    renderContactPage();

    expect(screen.getByText(PHONE_NUMBER)).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    renderContactPage();

    // Trigger validation by clicking and blurring each field
    const nameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email Address');
    const phoneInput = screen.getByLabelText('Phone Number');
    const serviceInput = screen.getByLabelText('Service Needed');
    const messageInput = screen.getByLabelText('Project Details');

    fireEvent.click(nameInput);
    fireEvent.blur(nameInput);
    fireEvent.click(emailInput);
    fireEvent.blur(emailInput);
    fireEvent.click(phoneInput);
    fireEvent.blur(phoneInput);
    fireEvent.click(serviceInput);
    fireEvent.blur(serviceInput);
    fireEvent.click(messageInput);
    fireEvent.blur(messageInput);

    await waitFor(() => {
      expect(screen.getByText(/Name must be at least 2 characters/)).toBeInTheDocument();
      expect(screen.getByText(/Please enter a valid email address/)).toBeInTheDocument();
      expect(screen.getByText(/Please enter a valid phone number/)).toBeInTheDocument();
      expect(screen.getByText(/Please select a service/)).toBeInTheDocument();
      expect(screen.getByText(/Message must be at least 10 characters/)).toBeInTheDocument();
    });
  });

  it('submits form successfully with valid data', async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Contact form submitted successfully' }),
    } as Response);

    const { toaster } = await import('@/components/ui/toaster');
    const mockToaster = vi.mocked(toaster);

    renderContactPage();

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Phone Number'), {
      target: { value: '5551234567' },
    });
    fireEvent.change(screen.getByLabelText('Service Needed'), {
      target: { value: 'residential' },
    });
    fireEvent.change(screen.getByLabelText('Project Details'), {
      target: {
        value: 'I need help with my sunken driveway. It has been causing issues for months.',
      },
    });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Send Message' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          phone: '5551234567',
          service: 'residential',
          message: 'I need help with my sunken driveway. It has been causing issues for months.',
        }),
      });
    });

    await waitFor(() => {
      expect(mockToaster.create).toHaveBeenCalledWith({
        title: 'Message sent successfully!',
        description: 'We will get back to you within 24 hours.',
        type: 'success',
        duration: 5000,
      });
    });
  });

  it('handles form submission error', async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { toaster } = await import('@/components/ui/toaster');
    const mockToaster = vi.mocked(toaster);

    renderContactPage();

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Phone Number'), {
      target: { value: '5551234567' },
    });
    fireEvent.change(screen.getByLabelText('Service Needed'), {
      target: { value: 'residential' },
    });
    fireEvent.change(screen.getByLabelText('Project Details'), {
      target: { value: 'I need help with my sunken driveway.' },
    });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Send Message' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockToaster.create).toHaveBeenCalledWith({
        title: 'Error sending message',
        description: 'Please try again or contact us directly.',
        type: 'error',
        duration: 5000,
      });
    });
  });

  it('handles non-ok response from API', async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    const { toaster } = await import('@/components/ui/toaster');
    const mockToaster = vi.mocked(toaster);

    renderContactPage();

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Phone Number'), {
      target: { value: '5551234567' },
    });
    fireEvent.change(screen.getByLabelText('Service Needed'), {
      target: { value: 'residential' },
    });
    fireEvent.change(screen.getByLabelText('Project Details'), {
      target: { value: 'I need help with my sunken driveway.' },
    });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Send Message' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToaster.create).toHaveBeenCalledWith({
        title: 'Error sending message',
        description: 'Please try again or contact us directly.',
        type: 'error',
        duration: 5000,
      });
    });
  });

  it('validates email format', async () => {
    renderContactPage();

    const emailInput = screen.getByLabelText('Email Address');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  it('validates minimum message length', async () => {
    renderContactPage();

    const messageInput = screen.getByLabelText('Project Details');
    fireEvent.change(messageInput, { target: { value: 'Short' } });
    fireEvent.blur(messageInput);

    await waitFor(() => {
      expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument();
    });
  });

  it('validates minimum name length', async () => {
    renderContactPage();

    const nameInput = screen.getByLabelText('Full Name');
    fireEvent.change(nameInput, { target: { value: 'A' } });
    fireEvent.blur(nameInput);

    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
    });
  });

  it('validates minimum phone number length', async () => {
    renderContactPage();

    const phoneInput = screen.getByLabelText('Phone Number');
    fireEvent.change(phoneInput, { target: { value: '123' } });
    fireEvent.blur(phoneInput);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid phone number')).toBeInTheDocument();
    });
  });

  it('disables submit button when form is invalid', async () => {
    renderContactPage();

    const submitButton = screen.getByRole('button', { name: 'Send Message' });

    // Initially the form is invalid (empty), so button should be disabled
    // But Formik might not immediately set isValid to false, so we need to trigger validation
    const nameInput = screen.getByLabelText('Full Name');
    fireEvent.click(nameInput);
    fireEvent.blur(nameInput);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    // Fill out the form with valid data
    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Phone Number'), {
      target: { value: '5551234567' },
    });
    fireEvent.change(screen.getByLabelText('Service Needed'), {
      target: { value: 'residential' },
    });
    fireEvent.change(screen.getByLabelText('Project Details'), {
      target: { value: 'I need help with my sunken driveway.' },
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('shows loading state during form submission', async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockImplementation(
      () =>
        new Promise(() => {
          // Intentionally never resolves to test loading state
        })
    );

    renderContactPage();

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Phone Number'), {
      target: { value: '5551234567' },
    });
    fireEvent.change(screen.getByLabelText('Service Needed'), {
      target: { value: 'residential' },
    });
    fireEvent.change(screen.getByLabelText('Project Details'), {
      target: { value: 'I need help with my sunken driveway.' },
    });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Send Message' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Chakra UI Button with loading prop should be disabled during loading
      expect(submitButton).toBeDisabled();
    });
  });
});
