import ContactInfoSection from "@/components/ui/contact-info-section";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("ContactInfoSection Component", () => {
  const renderContactInfoSection = () => {
    return render(
      <ChakraProvider value={defaultSystem}>
        <ContactInfoSection />
      </ChakraProvider>,
    );
  };

  it("renders all contact info cards", () => {
    renderContactInfoSection();

    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Service Area")).toBeInTheDocument();
  });

  it("renders contact information correctly", () => {
    renderContactInfoSection();

    expect(screen.getByText("ccmudjacking@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("Central Iowa")).toBeInTheDocument();
  });

  it("renders clickable phone and email links", () => {
    renderContactInfoSection();

    const phoneLink = screen.getByRole("link", { name: "(641) 691-9999" });
    const emailLink = screen.getByRole("link", { name: "ccmudjacking@gmail.com" });

    expect(phoneLink).toHaveAttribute("href", "tel:(641) 691-9999");
    expect(emailLink).toHaveAttribute("href", "mailto:ccmudjacking@gmail.com");
  });

  it("renders service area as text without link", () => {
    renderContactInfoSection();

    expect(screen.getByText("Service Area")).toBeInTheDocument();
    expect(screen.getByText("Central Iowa")).toBeInTheDocument();
  });
}); 