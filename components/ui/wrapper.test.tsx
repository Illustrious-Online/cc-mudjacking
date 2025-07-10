import Wrapper from "@/components/ui/wrapper";
import { useAuth } from "@/contexts/AuthContext";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("Wrapper Component", () => {
  const mockSignOut = vi.fn();
  const mockPush = vi.fn();

  const renderWrapper = () => {
    return render(
      <ChakraProvider value={defaultSystem}>
        <Wrapper>
          <p>Test Content</p>
        </Wrapper>
      </ChakraProvider>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as unknown as Mock).mockReturnValue({ push: mockPush });
  });

  it("renders children correctly", () => {
    (useAuth as unknown as Mock).mockReturnValue({ session: null, signOut: mockSignOut });
    renderWrapper();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders logout button when session exists", () => {
    (useAuth as unknown as Mock).mockReturnValue({ session: {}, signOut: mockSignOut });
    renderWrapper();
    expect(screen.getByText("Log Out")).toBeInTheDocument();
  });

  it("calls signOut and redirects on logout", async () => {
    (useAuth as unknown as Mock).mockReturnValue({ session: {}, signOut: mockSignOut });
    mockSignOut.mockResolvedValue(undefined);

    renderWrapper();

    fireEvent.click(screen.getByText("Log Out"));

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  it("handles signOut error gracefully", async () => {
    (useAuth as unknown as Mock).mockReturnValue({ session: {}, signOut: mockSignOut });
    mockSignOut.mockRejectedValue(new Error("Sign out error"));

    renderWrapper();

    fireEvent.click(screen.getByText("Log Out"));

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith("/auth/login");
    });
  });
});
