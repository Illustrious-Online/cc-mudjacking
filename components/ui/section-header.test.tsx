import SectionHeader from "@/components/ui/section-header";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("SectionHeader Component", () => {
  const renderSectionHeader = (props: React.ComponentProps<typeof SectionHeader>) => {
    return render(
      <ChakraProvider value={defaultSystem}>
        <SectionHeader {...props} />
      </ChakraProvider>,
    );
  };

  it("renders the section header with title and description", () => {
    renderSectionHeader({
      title: "Test Title",
      description: "Test Description",
    });

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders with custom max width", () => {
    renderSectionHeader({
      title: "Test Title",
      description: "Test Description",
      maxWidth: "2xl",
    });

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders with default max width when not provided", () => {
    renderSectionHeader({
      title: "Test Title",
      description: "Test Description",
    });

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders heading as h2 element", () => {
    renderSectionHeader({
      title: "Test Title",
      description: "Test Description",
    });

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Test Title");
  });
}); 