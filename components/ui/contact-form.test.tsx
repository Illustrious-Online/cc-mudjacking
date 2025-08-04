import ContactForm from "@/components/ui/contact-form";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mock the toaster
vi.mock("@/components/ui/toaster", () => ({
  toaster: {
    create: vi.fn(),
  },
}));

// Mock fetch
global.fetch = vi.fn();

describe("ContactForm Component", () => {
  const renderContactForm = () => {
    return render(
      <ChakraProvider value={defaultSystem}>
        <ContactForm />
      </ChakraProvider>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the contact form with all required fields", () => {
    renderContactForm();

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/service needed/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project details/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("renders form with proper structure", () => {
    renderContactForm();

    // Check that all form fields are present
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/service needed/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project details/i)).toBeInTheDocument();
    
    // Check that submit button is present and initially disabled
    const submitButton = screen.getByRole("button", { name: /send message/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("enables submit button when form is valid and dirty", async () => {
    renderContactForm();

    // Fill in the form with valid data
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: "5551234567" },
    });
    fireEvent.change(screen.getByLabelText(/service needed/i), {
      target: { value: "residential" },
    });
    fireEvent.change(screen.getByLabelText(/project details/i), {
      target: { value: "This is a test message with enough characters to pass validation." },
    });

    const submitButton = screen.getByRole("button", { name: /send message/i });
    expect(submitButton).not.toBeDisabled();
  });

  it("submits form with valid data", async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Success" }),
    } as Response);

    renderContactForm();

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: "5551234567" },
    });
    fireEvent.change(screen.getByLabelText(/service needed/i), {
      target: { value: "residential" },
    });
    fireEvent.change(screen.getByLabelText(/project details/i), {
      target: { value: "This is a test message with enough characters to pass validation." },
    });

    const submitButton = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "John Doe",
          email: "john@example.com",
          phone: "5551234567",
          service: "residential",
          message: "This is a test message with enough characters to pass validation.",
        }),
      });
    });
  });

  it("shows success toast on successful submission", async () => {
    const { toaster } = await import("@/components/ui/toaster");
    const mockToaster = vi.mocked(toaster);
    
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Success" }),
    } as Response);

    renderContactForm();

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: "5551234567" },
    });
    fireEvent.change(screen.getByLabelText(/service needed/i), {
      target: { value: "residential" },
    });
    fireEvent.change(screen.getByLabelText(/project details/i), {
      target: { value: "This is a test message with enough characters to pass validation." },
    });

    const submitButton = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToaster.create).toHaveBeenCalledWith({
        title: "Message sent successfully!",
        description: "We will get back to you within 24 hours.",
        type: "success",
        duration: 5000,
      });
    });
  });

  it("handles 502 error (external service unavailable)", async () => {
    const { toaster } = await import("@/components/ui/toaster");
    const mockToaster = vi.mocked(toaster);
    
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 502,
      json: async () => ({ 
        message: "Failed to submit inquiry to external service",
        error: "External service unavailable"
      }),
    } as Response);

    renderContactForm();

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: "5551234567" },
    });
    fireEvent.change(screen.getByLabelText(/service needed/i), {
      target: { value: "residential" },
    });
    fireEvent.change(screen.getByLabelText(/project details/i), {
      target: { value: "This is a test message with enough characters to pass validation." },
    });

    const submitButton = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToaster.create).toHaveBeenCalledWith({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        type: "error",
        duration: 5000,
      });
    });
  });

  it("handles 503 error (network error)", async () => {
    const { toaster } = await import("@/components/ui/toaster");
    const mockToaster = vi.mocked(toaster);
    
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 503,
      json: async () => ({ 
        message: "Network error - unable to reach external service",
        error: "Network error"
      }),
    } as Response);

    renderContactForm();

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: "5551234567" },
    });
    fireEvent.change(screen.getByLabelText(/service needed/i), {
      target: { value: "residential" },
    });
    fireEvent.change(screen.getByLabelText(/project details/i), {
      target: { value: "This is a test message with enough characters to pass validation." },
    });

    const submitButton = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToaster.create).toHaveBeenCalledWith({
        title: "Connection Error",
        description: "Unable to reach our servers. Please try again.",
        type: "error",
        duration: 5000,
      });
    });
  });

  it("handles 400 error (validation error)", async () => {
    const { toaster } = await import("@/components/ui/toaster");
    const mockToaster = vi.mocked(toaster);
    
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ 
        message: "Validation error",
        errors: ["Invalid email format"]
      }),
    } as Response);

    renderContactForm();

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: "5551234567" },
    });
    fireEvent.change(screen.getByLabelText(/service needed/i), {
      target: { value: "residential" },
    });
    fireEvent.change(screen.getByLabelText(/project details/i), {
      target: { value: "This is a test message with enough characters to pass validation." },
    });

    const submitButton = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToaster.create).toHaveBeenCalledWith({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        type: "error",
        duration: 5000,
      });
    });
  });

  it("handles network fetch error", async () => {
    const { toaster } = await import("@/components/ui/toaster");
    const mockToaster = vi.mocked(toaster);
    
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockRejectedValueOnce(new Error("Failed to fetch"));

    renderContactForm();

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: "5551234567" },
    });
    fireEvent.change(screen.getByLabelText(/service needed/i), {
      target: { value: "residential" },
    });
    fireEvent.change(screen.getByLabelText(/project details/i), {
      target: { value: "This is a test message with enough characters to pass validation." },
    });

    const submitButton = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToaster.create).toHaveBeenCalledWith({
        title: "Network Error",
        description: "Please check your internet connection and try again.",
        type: "error",
        duration: 5000,
      });
    });
  });

  it("handles generic error", async () => {
    const { toaster } = await import("@/components/ui/toaster");
    const mockToaster = vi.mocked(toaster);
    
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockRejectedValueOnce(new Error("Generic error"));

    renderContactForm();

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: "5551234567" },
    });
    fireEvent.change(screen.getByLabelText(/service needed/i), {
      target: { value: "residential" },
    });
    fireEvent.change(screen.getByLabelText(/project details/i), {
      target: { value: "This is a test message with enough characters to pass validation." },
    });

    const submitButton = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToaster.create).toHaveBeenCalledWith({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        type: "error",
        duration: 5000,
      });
    });
  });

  it("shows loading state during submission", async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    renderContactForm();

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: "5551234567" },
    });
    fireEvent.change(screen.getByLabelText(/service needed/i), {
      target: { value: "residential" },
    });
    fireEvent.change(screen.getByLabelText(/project details/i), {
      target: { value: "This is a test message with enough characters to pass validation." },
    });

    const submitButton = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitButton);

    // Check that button shows loading state
    expect(submitButton).toHaveTextContent("Sending...");
    expect(submitButton).toBeDisabled();
  });

  it("validates form fields and shows errors", async () => {
    renderContactForm();

    // Try to submit empty form
    const submitButton = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitButton);

    // Form should remain disabled due to validation errors
    expect(submitButton).toBeDisabled();
  });


}); 