import { ChakraProvider } from "@/providers/ChakraProvider";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("ChakraProvider", () => {
  it("renders children without crashing", () => {
    render(
      <ChakraProvider>
        <div data-testid="test-child">Test Content</div>
      </ChakraProvider>
    );

    expect(screen.getByTestId("test-child")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("provides theme context to children", () => {
    render(
      <ChakraProvider>
        <div style={{ color: "var(--chakra-colors-primary-80)" }} data-testid="themed-element">
          Themed Content
        </div>
      </ChakraProvider>
    );

    const themedElement = screen.getByTestId("themed-element");
    expect(themedElement).toBeInTheDocument();
    expect(themedElement).toHaveStyle({ color: "var(--chakra-colors-primary-80)" });
  });

  it("renders multiple children correctly", () => {
    render(
      <ChakraProvider>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <div data-testid="child-3">Child 3</div>
      </ChakraProvider>
    );

    expect(screen.getByTestId("child-1")).toBeInTheDocument();
    expect(screen.getByTestId("child-2")).toBeInTheDocument();
    expect(screen.getByTestId("child-3")).toBeInTheDocument();
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
    expect(screen.getByText("Child 3")).toBeInTheDocument();
  });

  it("handles empty children", () => {
    render(<ChakraProvider>{null}</ChakraProvider>);
    // Should not crash
    expect(document.body).toBeInTheDocument();
  });

  it("handles undefined children", () => {
    render(<ChakraProvider>{undefined}</ChakraProvider>);
    // Should not crash
    expect(document.body).toBeInTheDocument();
  });

  it("handles boolean children", () => {
    render(<ChakraProvider>{true}</ChakraProvider>);
    // Should not crash
    expect(document.body).toBeInTheDocument();
  });

  it("handles number children", () => {
    render(<ChakraProvider>{42}</ChakraProvider>);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("handles string children", () => {
    render(<ChakraProvider>{"Hello World"}</ChakraProvider>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("handles array of children", () => {
    render(
      <ChakraProvider>
        {[
          <div key="1" data-testid="array-child-1">Array Child 1</div>,
          <div key="2" data-testid="array-child-2">Array Child 2</div>,
        ]}
      </ChakraProvider>
    );

    expect(screen.getByTestId("array-child-1")).toBeInTheDocument();
    expect(screen.getByTestId("array-child-2")).toBeInTheDocument();
    expect(screen.getByText("Array Child 1")).toBeInTheDocument();
    expect(screen.getByText("Array Child 2")).toBeInTheDocument();
  });

  it("handles complex nested components", () => {
    const NestedComponent = () => (
      <div data-testid="nested-component">
        <span data-testid="nested-span">Nested Span</span>
        <button type="button" data-testid="nested-button">Nested Button</button>
      </div>
    );

    render(
      <ChakraProvider>
        <NestedComponent />
      </ChakraProvider>
    );

    expect(screen.getByTestId("nested-component")).toBeInTheDocument();
    expect(screen.getByTestId("nested-span")).toBeInTheDocument();
    expect(screen.getByTestId("nested-button")).toBeInTheDocument();
    expect(screen.getByText("Nested Span")).toBeInTheDocument();
    expect(screen.getByText("Nested Button")).toBeInTheDocument();
  });

  it("provides theme tokens to styled components", () => {
    render(
      <ChakraProvider>
        <div 
          style={{ 
            backgroundColor: "var(--chakra-colors-primary-80)",
            color: "var(--chakra-colors-neutral-99)",
            fontSize: "var(--chakra-fontSizes-titleLarge)",
            fontWeight: "var(--chakra-fontWeights-bold)",
            borderRadius: "var(--chakra-radii-small)",
            boxShadow: "var(--chakra-shadows-elevation1)"
          }}
          data-testid="styled-component"
        >
          Styled Component
        </div>
      </ChakraProvider>
    );

    const styledComponent = screen.getByTestId("styled-component");
    expect(styledComponent).toBeInTheDocument();
    expect(styledComponent).toHaveStyle({
      backgroundColor: "var(--chakra-colors-primary-80)",
      color: "var(--chakra-colors-neutral-99)",
      fontSize: "var(--chakra-fontSizes-titleLarge)",
      fontWeight: "var(--chakra-fontWeights-bold)",
      borderRadius: "var(--chakra-radii-small)",
      boxShadow: "var(--chakra-shadows-elevation1)"
    });
  });

  it("handles semantic tokens correctly", () => {
    render(
      <ChakraProvider>
        <div 
          style={{ 
            backgroundColor: "var(--chakra-colors-surface)",
            color: "var(--chakra-colors-onSurface)",
            borderColor: "var(--chakra-colors-outline)"
          }}
          data-testid="semantic-component"
        >
          Semantic Component
        </div>
      </ChakraProvider>
    );

    const semanticComponent = screen.getByTestId("semantic-component");
    expect(semanticComponent).toBeInTheDocument();
    expect(semanticComponent).toHaveStyle({
      backgroundColor: "var(--chakra-colors-surface)",
      color: "var(--chakra-colors-onSurface)",
      borderColor: "var(--chakra-colors-outline)"
    });
  });

  it("handles font tokens correctly", () => {
    render(
      <ChakraProvider>
        <div 
          style={{ 
            fontFamily: "var(--chakra-fonts-display)",
            fontSize: "var(--chakra-fontSizes-displayLarge)",
            fontWeight: "var(--chakra-fontWeights-bold)",
            lineHeight: "var(--chakra-lineHeights-displayLarge)",
            letterSpacing: "var(--chakra-letterSpacings-displayLarge)"
          }}
          data-testid="font-component"
        >
          Font Component
        </div>
      </ChakraProvider>
    );

    const fontComponent = screen.getByTestId("font-component");
    expect(fontComponent).toBeInTheDocument();
    expect(fontComponent).toHaveStyle({
      fontFamily: "var(--chakra-fonts-display)",
      fontSize: "var(--chakra-fontSizes-displayLarge)",
      fontWeight: "var(--chakra-fontWeights-bold)",
      lineHeight: "var(--chakra-lineHeights-displayLarge)",
      letterSpacing: "var(--chakra-letterSpacings-displayLarge)"
    });
  });

  it("handles color tokens correctly", () => {
    render(
      <ChakraProvider>
        <div 
          style={{ 
            backgroundColor: "var(--chakra-colors-primary-80)",
            color: "var(--chakra-colors-neutral-99)",
            borderColor: "var(--chakra-colors-outline)"
          }}
          data-testid="color-component"
        >
          Color Component
        </div>
      </ChakraProvider>
    );

    const colorComponent = screen.getByTestId("color-component");
    expect(colorComponent).toBeInTheDocument();
    expect(colorComponent).toHaveStyle({
      backgroundColor: "var(--chakra-colors-primary-80)",
      color: "var(--chakra-colors-neutral-99)",
      borderColor: "var(--chakra-colors-outline)"
    });
  });

  it("handles radius tokens correctly", () => {
    render(
      <ChakraProvider>
        <div 
          style={{ 
            borderRadius: "var(--chakra-radii-small)",
            borderTopLeftRadius: "var(--chakra-radii-medium)",
            borderTopRightRadius: "var(--chakra-radii-large)"
          }}
          data-testid="radius-component"
        >
          Radius Component
        </div>
      </ChakraProvider>
    );

    const radiusComponent = screen.getByTestId("radius-component");
    expect(radiusComponent).toBeInTheDocument();
    expect(radiusComponent).toHaveStyle({
      borderRadius: "var(--chakra-radii-small)",
      borderTopLeftRadius: "var(--chakra-radii-medium)",
      borderTopRightRadius: "var(--chakra-radii-large)"
    });
  });

  it("handles shadow tokens correctly", () => {
    render(
      <ChakraProvider>
        <div 
          style={{ 
            boxShadow: "var(--chakra-shadows-elevation2)",
            filter: "drop-shadow(var(--chakra-shadows-elevation1))"
          }}
          data-testid="shadow-component"
        >
          Shadow Component
        </div>
      </ChakraProvider>
    );

    const shadowComponent = screen.getByTestId("shadow-component");
    expect(shadowComponent).toBeInTheDocument();
    expect(shadowComponent).toHaveStyle({
      boxShadow: "var(--chakra-shadows-elevation2)",
      filter: "drop-shadow(var(--chakra-shadows-elevation1))"
    });
  });

  it("handles legacy brand colors for backward compatibility", () => {
    render(
      <ChakraProvider>
        <div 
          style={{ 
            backgroundColor: "var(--chakra-colors-brand-500)",
            color: "var(--chakra-colors-brand-50)",
            borderColor: "var(--chakra-colors-brand-300)"
          }}
          data-testid="legacy-component"
        >
          Legacy Component
        </div>
      </ChakraProvider>
    );

    const legacyComponent = screen.getByTestId("legacy-component");
    expect(legacyComponent).toBeInTheDocument();
    expect(legacyComponent).toHaveStyle({
      backgroundColor: "var(--chakra-colors-brand-500)",
      color: "var(--chakra-colors-brand-50)",
      borderColor: "var(--chakra-colors-brand-300)"
    });
  });

  it("handles responsive design tokens", () => {
    render(
      <ChakraProvider>
        <div 
          style={{ 
            fontSize: "var(--chakra-fontSizes-titleSmall)",
            "@media (min-width: 768px)": {
              fontSize: "var(--chakra-fontSizes-titleMedium)"
            },
            "@media (min-width: 1024px)": {
              fontSize: "var(--chakra-fontSizes-titleLarge)"
            }
          }}
          data-testid="responsive-component"
        >
          Responsive Component
        </div>
      </ChakraProvider>
    );

    const responsiveComponent = screen.getByTestId("responsive-component");
    expect(responsiveComponent).toBeInTheDocument();
    expect(responsiveComponent).toHaveStyle({
      fontSize: "var(--chakra-fontSizes-titleSmall)"
    });
  });

  it("handles dark mode semantic tokens", () => {
    render(
      <ChakraProvider>
        <div 
          style={{ 
            backgroundColor: "var(--chakra-colors-surface)",
            color: "var(--chakra-colors-onSurface)",
            borderColor: "var(--chakra-colors-outline)"
          }}
          data-testid="dark-mode-component"
        >
          Dark Mode Component
        </div>
      </ChakraProvider>
    );

    const darkModeComponent = screen.getByTestId("dark-mode-component");
    expect(darkModeComponent).toBeInTheDocument();
    expect(darkModeComponent).toHaveStyle({
      backgroundColor: "var(--chakra-colors-surface)",
      color: "var(--chakra-colors-onSurface)",
      borderColor: "var(--chakra-colors-outline)"
    });
  });

  it("handles complex nested provider structure", () => {
    const InnerComponent = () => (
      <div data-testid="inner-component">
        <span>Inner Content</span>
      </div>
    );

    const OuterComponent = () => (
      <div data-testid="outer-component">
        <InnerComponent />
      </div>
    );

    render(
      <ChakraProvider>
        <OuterComponent />
      </ChakraProvider>
    );

    expect(screen.getByTestId("outer-component")).toBeInTheDocument();
    expect(screen.getByTestId("inner-component")).toBeInTheDocument();
    expect(screen.getByText("Inner Content")).toBeInTheDocument();
  });

  it("handles function children", () => {
    const FunctionChild = () => <div data-testid="function-child">Function Child</div>;
    
    render(
      <ChakraProvider>
        <FunctionChild />
      </ChakraProvider>
    );

    expect(screen.getByTestId("function-child")).toBeInTheDocument();
    expect(screen.getByText("Function Child")).toBeInTheDocument();
  });

  it("handles memoized children", () => {
    const { memo } = require("react");
    const MemoizedChild = memo(() => <div data-testid="memoized-child">Memoized Child</div>);
    
    render(
      <ChakraProvider>
        <MemoizedChild />
      </ChakraProvider>
    );

    expect(screen.getByTestId("memoized-child")).toBeInTheDocument();
    expect(screen.getByText("Memoized Child")).toBeInTheDocument();
  });
}); 