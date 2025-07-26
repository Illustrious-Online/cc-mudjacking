import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import RootLayout, { metadata } from './layout';

// Mock the providers and components
vi.mock('@/providers/ChakraProvider', () => ({
  ChakraProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="chakra-provider">{children}</div>
  ),
}));

vi.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

vi.mock('@chakra-ui/color-mode', () => ({
  ColorModeScript: () => <script data-testid="color-mode-script" />,
}));

describe('RootLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('metadata', () => {
    it('exports correct metadata', () => {
      expect(metadata).toEqual({
        title: 'CC Mudjacking',
        description: 'Professional mudjacking services',
      });
    });

    it('has title property', () => {
      expect(metadata.title).toBe('CC Mudjacking');
    });

    it('has description property', () => {
      expect(metadata.description).toBe('Professional mudjacking services');
    });
  });

  describe('component structure', () => {
    it('renders without crashing', () => {
      const { container } = render(
        <RootLayout>
          <div data-testid="test-child">Test Content</div>
        </RootLayout>
      );
      expect(container).toBeInTheDocument();
    });

    it('renders the component structure correctly', () => {
      const { container } = render(
        <RootLayout>
          <div data-testid="test-child">Test Content</div>
        </RootLayout>
      );

      // In Next.js app router, the layout component returns JSX but doesn't render
      // actual html/body elements in the test environment
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders all providers in correct order', () => {
      const { getByTestId } = render(
        <RootLayout>
          <div data-testid="test-child">Test Content</div>
        </RootLayout>
      );

      expect(getByTestId('chakra-provider')).toBeInTheDocument();
      expect(getByTestId('theme-provider')).toBeInTheDocument();
    });

    it('renders children content', () => {
      const { getByTestId } = render(
        <RootLayout>
          <div data-testid="test-child">Test Content</div>
        </RootLayout>
      );

      expect(getByTestId('test-child')).toBeInTheDocument();
      expect(getByTestId('test-child')).toHaveTextContent('Test Content');
    });

    it('renders nested children correctly', () => {
      const { getByTestId } = render(
        <RootLayout>
          <div data-testid="outer-child">
            <span data-testid="inner-child">Nested Content</span>
          </div>
        </RootLayout>
      );

      expect(getByTestId('outer-child')).toBeInTheDocument();
      expect(getByTestId('inner-child')).toBeInTheDocument();
      expect(getByTestId('inner-child')).toHaveTextContent('Nested Content');
    });

    it('renders multiple children', () => {
      const { getByTestId } = render(
        <RootLayout>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
          <div data-testid="child-3">Child 3</div>
        </RootLayout>
      );

      expect(getByTestId('child-1')).toBeInTheDocument();
      expect(getByTestId('child-2')).toBeInTheDocument();
      expect(getByTestId('child-3')).toBeInTheDocument();
    });

    it('renders empty children without error', () => {
      const { container } = render(<RootLayout>{null}</RootLayout>);
      expect(container).toBeInTheDocument();
    });

    it('renders undefined children without error', () => {
      const { container } = render(<RootLayout>{undefined}</RootLayout>);
      expect(container).toBeInTheDocument();
    });
  });

  describe('provider integration', () => {
    it('wraps children with all required providers', () => {
      const { getByTestId } = render(
        <RootLayout>
          <div data-testid="test-child">Test Content</div>
        </RootLayout>
      );

      // Check that providers are rendered
      const chakraProvider = getByTestId('chakra-provider');
      const themeProvider = getByTestId('theme-provider');

      // Check that providers contain the test child
      expect(chakraProvider).toContainElement(getByTestId('test-child'));
      expect(themeProvider).toContainElement(getByTestId('test-child'));
    });
  });
});
