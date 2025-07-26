import Wrapper from "@/components/ui/wrapper";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Wrapper Component", () => {
  const renderWrapper = () => {
    return render(
      <ChakraProvider value={defaultSystem}>
        <Wrapper>
          <p>Test Content</p>
        </Wrapper>
      </ChakraProvider>,
    );
  };

  it("renders children correctly", () => {
    renderWrapper();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders navigation elements", () => {
    renderWrapper();
    expect(screen.getAllByText("Home").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Contact").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Gallery").length).toBeGreaterThan(0);
  });
});
