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

  it("submits form with valid data", async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
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

  it("handles form submission error", async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

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
      expect(mockFetch).toHaveBeenCalled();
    });
  });
}); 