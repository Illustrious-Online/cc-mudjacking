import IconBox from "@/components/ui/icon-box";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FaPhone } from "react-icons/fa";

describe("IconBox Component", () => {
  const renderIconBox = (props: React.ComponentProps<typeof IconBox>) => {
    return render(
      <ChakraProvider value={defaultSystem}>
        <IconBox {...props} />
      </ChakraProvider>,
    );
  };

  it("renders the icon", () => {
    renderIconBox({
      icon: FaPhone,
    });

    // The icon should be present in the DOM as an SVG
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it("renders with default props", () => {
    renderIconBox({
      icon: FaPhone,
    });

    // Check that the icon container is rendered
    const iconContainer = document.querySelector('div[class*="css-"]');
    expect(iconContainer).toBeInTheDocument();
  });

  it("renders with custom size", () => {
    renderIconBox({
      icon: FaPhone,
      size: 12,
    });

    // Check that the icon is rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it("renders with custom color", () => {
    renderIconBox({
      icon: FaPhone,
      color: "red.500",
    });

    // Check that the icon is rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
}); 