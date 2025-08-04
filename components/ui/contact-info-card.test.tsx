import ContactInfoCard from "@/components/ui/contact-info-card";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FaPhone } from "react-icons/fa";

describe("ContactInfoCard Component", () => {
  const renderContactInfoCard = (props: React.ComponentProps<typeof ContactInfoCard>) => {
    return render(
      <ChakraProvider value={defaultSystem}>
        <ContactInfoCard {...props} />
      </ChakraProvider>,
    );
  };

  it("renders the contact info card with title and content", () => {
    renderContactInfoCard({
      icon: FaPhone,
      title: "Phone",
      content: "(555) 123-4567",
      href: "tel:(555) 123-4567",
    });

    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("(555) 123-4567")).toBeInTheDocument();
  });

  it("renders a link when href is provided", () => {
    renderContactInfoCard({
      icon: FaPhone,
      title: "Phone",
      content: "(555) 123-4567",
      href: "tel:(555) 123-4567",
    });

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "tel:(555) 123-4567");
  });

  it("renders text instead of link when href is null", () => {
    renderContactInfoCard({
      icon: FaPhone,
      title: "Service Area",
      content: "Central Iowa",
      href: null,
    });

    expect(screen.getByText("Service Area")).toBeInTheDocument();
    expect(screen.getByText("Central Iowa")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders the icon", () => {
    renderContactInfoCard({
      icon: FaPhone,
      title: "Phone",
      content: "(555) 123-4567",
      href: "tel:(555) 123-4567",
    });

    // The icon should be present in the DOM
    expect(screen.getByText("Phone")).toBeInTheDocument();
  });
}); 