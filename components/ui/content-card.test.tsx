import ContentCard from "@/components/ui/content-card";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("ContentCard Component", () => {
  const renderContentCard = (props: React.ComponentProps<typeof ContentCard>) => {
    return render(
      <ChakraProvider value={defaultSystem}>
        <ContentCard {...props} />
      </ChakraProvider>,
    );
  };

  it("renders children content", () => {
    renderContentCard({
      children: <div data-testid="test-content">Test Content</div>,
    });

    expect(screen.getByTestId("test-content")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders with default props", () => {
    renderContentCard({
      children: <div>Test Content</div>,
    });

    // Check that the content is rendered
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders with custom variant", () => {
    renderContentCard({
      children: <div>Test Content</div>,
      variant: "gallery",
    });

    // Check that the content is rendered
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders with custom padding", () => {
    renderContentCard({
      children: <div>Test Content</div>,
      padding: 12,
    });

    // Check that the content is rendered
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders with custom alignment", () => {
    renderContentCard({
      children: <div>Test Content</div>,
      align: "center",
    });

    // Check that the content is rendered
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
}); 