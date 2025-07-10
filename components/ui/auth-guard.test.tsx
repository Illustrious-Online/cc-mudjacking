import { useAuth } from "@/contexts/AuthContext";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";
import AuthGuard from "./auth-guard";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("@/components/ui/loader", () => ({
  FullPageSkeletonLoader: () => <div data-testid="skeleton-loader" />,
}));

describe("AuthGuard", () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as Mock).mockReturnValue({ push: mockPush });
  });

  it("renders the skeleton loader when isLoading is true", () => {
    (useAuth as Mock).mockReturnValue({ user: null, isLoading: true });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>,
    );

    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument();
  });

  it("renders children if user is authenticated and isLoading is false", () => {
    (useAuth as Mock).mockReturnValue({ user: { id: "123" }, isLoading: false });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>,
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("renders children if user is null but isLoading is false", () => {
    (useAuth as Mock).mockReturnValue({ user: null, isLoading: false });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>,
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
