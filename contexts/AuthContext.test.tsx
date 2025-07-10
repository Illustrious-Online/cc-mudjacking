import { createClientSupabaseClient } from "@/lib/supabase/client";
import type { Session, User } from "@supabase/supabase-js";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider, useAuth } from "./AuthContext";
import { useState } from "react";

vi.mock("@/lib/supabase/client", () => ({
  createClientSupabaseClient: vi.fn(),
}));

// Mock Next.js useRouter
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  })),
}));

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    origin: 'http://localhost:3000',
  },
  writable: true,
});

// Mock process.env
vi.stubEnv('NEXT_PUBLIC_APP_URL', 'http://localhost:3000');

const mockSession: Session = {
  access_token: "mock-access-token",
  refresh_token: "mock-refresh-token",
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  token_type: "bearer",
  user: {
    id: "mock-user-id",
    email: "user@example.com",
  } as User,
  expires_in: 0,
};

describe("AuthProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("provides a user session when available", async () => {
    const mockSupabase = {
      auth: {
        getSession: vi
          .fn()
          .mockResolvedValue({ data: { session: mockSession } }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: { subscription: { unsubscribe: vi.fn() } },
        }),
      },
    };
    (createClientSupabaseClient as unknown as Mock).mockReturnValue(mockSupabase);

    const TestComponent = () => {
      const { user, session, isLoading } = useAuth();
      return (
        <div>
          <p>Loading: {isLoading.toString()}</p>
          <p>User: {user?.email ?? "null"}</p>
          <p>Session: {session ? "active" : "null"}</p>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Loading: false")).toBeInTheDocument();
      expect(screen.getByText("User: user@example.com")).toBeInTheDocument();
      expect(screen.getByText("Session: active")).toBeInTheDocument();
    });
  });

  it("handles no session gracefully", async () => {
    const mockSupabase = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: { subscription: { unsubscribe: vi.fn() } },
        }),
      },
    };
    (createClientSupabaseClient as unknown as Mock).mockReturnValue(mockSupabase);

    const TestComponent = () => {
      const { user, session, isLoading } = useAuth();
      return (
        <div>
          <p>Loading: {isLoading.toString()}</p>
          <p>User: {user?.email ?? "null"}</p>
          <p>Session: {session ? "active" : "null"}</p>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Loading: false")).toBeInTheDocument();
      expect(screen.getByText("User: null")).toBeInTheDocument();
      expect(screen.getByText("Session: null")).toBeInTheDocument();
    });
  });

  it("provides authentication functions", async () => {
    const mockSupabase = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: { subscription: { unsubscribe: vi.fn() } },
        }),
        signUp: vi.fn(),
        signInWithPassword: vi.fn(),
        signInWithOAuth: vi.fn(),
        signOut: vi.fn(),
        resetPasswordForEmail: vi.fn(),
        updateUser: vi.fn(),
      },
    };
    (createClientSupabaseClient as unknown as Mock).mockReturnValue(mockSupabase);

    const TestComponent = () => {
      const { signUp, signIn, signInWithOauth, signOut, resetPassword, updatePassword } = useAuth();
      
      const handleSignUp = async () => {
        await signUp("test@example.com", "password", "1234567890");
      };
      
      const handleSignIn = async () => {
        await signIn("test@example.com", "password");
      };
      
      const handleOAuth = async () => {
        await signInWithOauth("google");
      };
      
      const handleSignOut = async () => {
        await signOut();
      };
      
      const handleResetPassword = async () => {
        await resetPassword("test@example.com");
      };
      
      const handleUpdatePassword = async () => {
        await updatePassword("newpassword");
      };

      return (
        <div>
          <button type="button" onClick={handleSignUp}>Sign Up</button>
          <button type="button" onClick={handleSignIn}>Sign In</button>
          <button type="button" onClick={handleOAuth}>OAuth</button>
          <button type="button" onClick={handleSignOut}>Sign Out</button>
          <button type="button" onClick={handleResetPassword}>Reset Password</button>
          <button type="button" onClick={handleUpdatePassword}>Update Password</button>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Sign Up")).toBeInTheDocument();
      expect(screen.getByText("Sign In")).toBeInTheDocument();
      expect(screen.getByText("OAuth")).toBeInTheDocument();
      expect(screen.getByText("Sign Out")).toBeInTheDocument();
      expect(screen.getByText("Reset Password")).toBeInTheDocument();
      expect(screen.getByText("Update Password")).toBeInTheDocument();
    });
  });

  it("handles auth state changes", async () => {
    const mockUnsubscribe = vi.fn();
    const mockOnAuthStateChange = vi.fn().mockReturnValue({
      data: { subscription: { unsubscribe: mockUnsubscribe } },
    });
    
    const mockSupabase = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: mockOnAuthStateChange,
      },
    };
    (createClientSupabaseClient as unknown as Mock).mockReturnValue(mockSupabase);

    const { unmount } = render(
      <AuthProvider>
        <div>Test</div>
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(mockOnAuthStateChange).toHaveBeenCalled();
    });

    unmount();
    expect(mockUnsubscribe).toHaveBeenCalled();
  });

  it("throws error when useAuth is used outside AuthProvider", () => {
    const TestComponent = () => {
      const auth = useAuth();
      return <div>{auth.user?.email}</div>;
    };

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useAuth must be used within an AuthProvider");
  });

  it("calls signUp with correct parameters", async () => {
    const mockSignUp = vi.fn().mockResolvedValue({ error: null });
    const mockSupabase = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: { subscription: { unsubscribe: vi.fn() } },
        }),
        signUp: mockSignUp,
      },
    };
    (createClientSupabaseClient as unknown as Mock).mockReturnValue(mockSupabase);

    const TestComponent = () => {
      const { signUp } = useAuth();
      
      const handleSignUp = async () => {
        const result = await signUp("test@example.com", "password", "1234567890");
        return result;
      };

      return (
        <button type="button" onClick={handleSignUp}>Sign Up</button>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Sign Up")).toBeInTheDocument();
    });
  });

  it("calls signIn with correct parameters", async () => {
    const mockSignInWithPassword = vi.fn().mockResolvedValue({ error: null });
    const mockSupabase = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: { subscription: { unsubscribe: vi.fn() } },
        }),
        signInWithPassword: mockSignInWithPassword,
      },
    };
    (createClientSupabaseClient as unknown as Mock).mockReturnValue(mockSupabase);

    const TestComponent = () => {
      const { signIn } = useAuth();
      
      const handleSignIn = async () => {
        const result = await signIn("test@example.com", "password");
        return result;
      };

      return (
        <button type="button" onClick={handleSignIn}>Sign In</button>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Sign In")).toBeInTheDocument();
    });
  });

  it("calls signInWithOauth with correct parameters", async () => {
    const mockSignInWithOauth = vi.fn().mockResolvedValue({ error: null });
    const mockSupabase = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: { subscription: { unsubscribe: vi.fn() } },
        }),
        signInWithOAuth: mockSignInWithOauth,
      },
    };
    (createClientSupabaseClient as unknown as Mock).mockReturnValue(mockSupabase);

    const TestComponent = () => {
      const { signInWithOauth } = useAuth();
      
      const handleOAuth = async () => {
        await signInWithOauth("google");
      };

      return (
        <button type="button" onClick={handleOAuth}>OAuth</button>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("OAuth")).toBeInTheDocument();
    });
  });

  it("calls signOut and redirects to login", async () => {
    const mockSignOut = vi.fn().mockResolvedValue({ error: null });
    const mockPush = vi.fn();
    const mockSupabase = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: { subscription: { unsubscribe: vi.fn() } },
        }),
        signOut: mockSignOut,
      },
    };
    (createClientSupabaseClient as unknown as Mock).mockReturnValue(mockSupabase);

    // Mock useRouter to capture the push call
    const { useRouter } = await import("next/navigation");
    (useRouter as Mock).mockReturnValue({
      push: mockPush,
      refresh: vi.fn(),
    });

    const TestComponent = () => {
      const { signOut } = useAuth();
      
      const handleSignOut = async () => {
        await signOut();
      };

      return (
        <button type="button" onClick={handleSignOut}>Sign Out</button>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByText("Sign Out"));

    expect(mockSignOut).toHaveBeenCalledWith({
      scope: "global",
    });
    expect(mockPush).toHaveBeenCalledWith("/auth/login");
  });

  it("executes resetPassword function and returns error", async () => {
    const mockError = new Error("Reset password failed");
    const mockResetPasswordForEmail = vi.fn().mockResolvedValue({ error: mockError });
    const mockSupabase = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: { subscription: { unsubscribe: vi.fn() } },
        }),
        resetPasswordForEmail: mockResetPasswordForEmail,
      },
    };
    (createClientSupabaseClient as unknown as Mock).mockReturnValue(mockSupabase);

    const TestComponent = () => {
      const { resetPassword } = useAuth();
      const [result, setResult] = useState<string>("");
      
      const handleResetPassword = async () => {
        const { error } = await resetPassword("test@example.com");
        setResult(error ? error.message : "success");
      };

      return (
        <div>
          <button type="button" onClick={handleResetPassword}>Reset Password</button>
          <p>Result: {result}</p>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByText("Reset Password"));

    await waitFor(() => {
      expect(screen.getByText("Result: Reset password failed")).toBeInTheDocument();
    });

    expect(mockResetPasswordForEmail).toHaveBeenCalledWith("test@example.com", {
      redirectTo: "http://localhost:3000/auth/update-password",
    });
  });

  it("executes updatePassword function and returns error", async () => {
    const mockError = new Error("Update password failed");
    const mockUpdateUser = vi.fn().mockResolvedValue({ error: mockError });
    const mockSupabase = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: { subscription: { unsubscribe: vi.fn() } },
        }),
        updateUser: mockUpdateUser,
      },
    };
    (createClientSupabaseClient as unknown as Mock).mockReturnValue(mockSupabase);

    const TestComponent = () => {
      const { updatePassword } = useAuth();
      const [result, setResult] = useState<string>("");
      
      const handleUpdatePassword = async () => {
        const { error } = await updatePassword("newpassword");
        setResult(error ? error.message : "success");
      };

      return (
        <div>
          <button type="button" onClick={handleUpdatePassword}>Update Password</button>
          <p>Result: {result}</p>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByText("Update Password"));

    await waitFor(() => {
      expect(screen.getByText("Result: Update password failed")).toBeInTheDocument();
    });

    expect(mockUpdateUser).toHaveBeenCalledWith({
      password: "newpassword",
    });
  });

  // New comprehensive tests for better coverage
  it("executes signUp function and returns error", async () => {
    const mockError = new Error("Sign up failed");
    const mockSignUp = vi.fn().mockResolvedValue({ error: mockError });
    const mockSupabase = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: { subscription: { unsubscribe: vi.fn() } },
        }),
        signUp: mockSignUp,
      },
    };
    (createClientSupabaseClient as unknown as Mock).mockReturnValue(mockSupabase);

    const TestComponent = () => {
      const { signUp } = useAuth();
      const [result, setResult] = useState<string>("");
      
      const handleSignUp = async () => {
        const { error } = await signUp("test@example.com", "password", "1234567890");
        setResult(error ? error.message : "success");
      };

      return (
        <div>
          <button type="button" onClick={handleSignUp}>Sign Up</button>
          <p>Result: {result}</p>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByText("Sign Up"));

    await waitFor(() => {
      expect(screen.getByText("Result: Sign up failed")).toBeInTheDocument();
    });

    expect(mockSignUp).toHaveBeenCalledWith({
      phone: "1234567890",
      email: "test@example.com",
      password: "password",
      options: {
        emailRedirectTo: "http://localhost:3000/api/auth/callback",
        data: {
          phone: "1234567890",
          email: "test@example.com",
          password: "password",
        },
      },
    });
  });

  it("executes signIn function and returns error", async () => {
    const mockError = new Error("Sign in failed");
    const mockSignInWithPassword = vi.fn().mockResolvedValue({ error: mockError });
    const mockSupabase = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: { subscription: { unsubscribe: vi.fn() } },
        }),
        signInWithPassword: mockSignInWithPassword,
      },
    };
    (createClientSupabaseClient as unknown as Mock).mockReturnValue(mockSupabase);

    const TestComponent = () => {
      const { signIn } = useAuth();
      const [result, setResult] = useState<string>("");
      
      const handleSignIn = async () => {
        const { error } = await signIn("test@example.com", "password");
        setResult(error ? error.message : "success");
      };

      return (
        <div>
          <button type="button" onClick={handleSignIn}>Sign In</button>
          <p>Result: {result}</p>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByText("Sign In"));

    await waitFor(() => {
      expect(screen.getByText("Result: Sign in failed")).toBeInTheDocument();
    });

    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password",
    });
  });

  it("executes signInWithOauth function", async () => {
    const mockSignInWithOauth = vi.fn().mockResolvedValue({ error: null });
    const mockSupabase = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: { subscription: { unsubscribe: vi.fn() } },
        }),
        signInWithOAuth: mockSignInWithOauth,
      },
    };
    (createClientSupabaseClient as unknown as Mock).mockReturnValue(mockSupabase);

    const TestComponent = () => {
      const { signInWithOauth } = useAuth();
      
      const handleOAuth = async () => {
        await signInWithOauth("github");
      };

      return (
        <button type="button" onClick={handleOAuth}>OAuth</button>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByText("OAuth"));

    expect(mockSignInWithOauth).toHaveBeenCalledWith({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  });

  it("executes signOut function and redirects", async () => {
    const mockSignOut = vi.fn().mockResolvedValue({ error: null });
    const mockPush = vi.fn();
    const mockSupabase = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: { subscription: { unsubscribe: vi.fn() } },
        }),
        signOut: mockSignOut,
      },
    };
    (createClientSupabaseClient as unknown as Mock).mockReturnValue(mockSupabase);

    // Mock useRouter to capture the push call
    const { useRouter } = await import("next/navigation");
    (useRouter as Mock).mockReturnValue({
      push: mockPush,
      refresh: vi.fn(),
    });

    const TestComponent = () => {
      const { signOut } = useAuth();
      
      const handleSignOut = async () => {
        await signOut();
      };

      return (
        <button type="button" onClick={handleSignOut}>Sign Out</button>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByText("Sign Out"));

    expect(mockSignOut).toHaveBeenCalledWith({
      scope: "global",
    });
    expect(mockPush).toHaveBeenCalledWith("/auth/login");
  });

  it("executes resetPassword function and returns error", async () => {
    const mockError = new Error("Reset password failed");
    const mockResetPasswordForEmail = vi.fn().mockResolvedValue({ error: mockError });
    const mockSupabase = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: { subscription: { unsubscribe: vi.fn() } },
        }),
        resetPasswordForEmail: mockResetPasswordForEmail,
      },
    };
    (createClientSupabaseClient as unknown as Mock).mockReturnValue(mockSupabase);

    const TestComponent = () => {
      const { resetPassword } = useAuth();
      const [result, setResult] = useState<string>("");
      
      const handleResetPassword = async () => {
        const { error } = await resetPassword("test@example.com");
        setResult(error ? error.message : "success");
      };

      return (
        <div>
          <button type="button" onClick={handleResetPassword}>Reset Password</button>
          <p>Result: {result}</p>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByText("Reset Password"));

    await waitFor(() => {
      expect(screen.getByText("Result: Reset password failed")).toBeInTheDocument();
    });

    expect(mockResetPasswordForEmail).toHaveBeenCalledWith("test@example.com", {
      redirectTo: "http://localhost:3000/auth/update-password",
    });
  });

  it("executes updatePassword function and returns error", async () => {
    const mockError = new Error("Update password failed");
    const mockUpdateUser = vi.fn().mockResolvedValue({ error: mockError });
    const mockSupabase = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: { subscription: { unsubscribe: vi.fn() } },
        }),
        updateUser: mockUpdateUser,
      },
    };
    (createClientSupabaseClient as unknown as Mock).mockReturnValue(mockSupabase);

    const TestComponent = () => {
      const { updatePassword } = useAuth();
      const [result, setResult] = useState<string>("");
      
      const handleUpdatePassword = async () => {
        const { error } = await updatePassword("newpassword");
        setResult(error ? error.message : "success");
      };

      return (
        <div>
          <button type="button" onClick={handleUpdatePassword}>Update Password</button>
          <p>Result: {result}</p>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByText("Update Password"));

    await waitFor(() => {
      expect(screen.getByText("Result: Update password failed")).toBeInTheDocument();
    });

    expect(mockUpdateUser).toHaveBeenCalledWith({
      password: "newpassword",
    });
  });

  it("handles signUp without phone parameter", async () => {
    const mockSignUp = vi.fn().mockResolvedValue({ error: null });
    const mockSupabase = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: { subscription: { unsubscribe: vi.fn() } },
        }),
        signUp: mockSignUp,
      },
    };
    (createClientSupabaseClient as unknown as Mock).mockReturnValue(mockSupabase);

    const TestComponent = () => {
      const { signUp } = useAuth();
      
      const handleSignUp = async () => {
        await signUp("test@example.com", "password");
      };

      return (
        <button type="button" onClick={handleSignUp}>Sign Up No Phone</button>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByText("Sign Up No Phone"));

    expect(mockSignUp).toHaveBeenCalledWith({
      phone: undefined,
      email: "test@example.com",
      password: "password",
      options: {
        emailRedirectTo: "http://localhost:3000/api/auth/callback",
        data: {
          phone: undefined,
          email: "test@example.com",
          password: "password",
        },
      },
    });
  });

  it("tests all OAuth providers", async () => {
    const mockSignInWithOauth = vi.fn().mockResolvedValue({ error: null });
    const mockSupabase = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: { subscription: { unsubscribe: vi.fn() } },
        }),
        signInWithOAuth: mockSignInWithOauth,
      },
    };
    (createClientSupabaseClient as unknown as Mock).mockReturnValue(mockSupabase);

    const TestComponent = () => {
      const { signInWithOauth } = useAuth();
      
      const handleGoogle = async () => await signInWithOauth("google");
      const handleGithub = async () => await signInWithOauth("github");
      const handleFacebook = async () => await signInWithOauth("facebook");
      const handleDiscord = async () => await signInWithOauth("discord");

      return (
        <div>
          <button type="button" onClick={handleGoogle}>Google</button>
          <button type="button" onClick={handleGithub}>Github</button>
          <button type="button" onClick={handleFacebook}>Facebook</button>
          <button type="button" onClick={handleDiscord}>Discord</button>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByText("Google"));
    await user.click(screen.getByText("Github"));
    await user.click(screen.getByText("Facebook"));
    await user.click(screen.getByText("Discord"));

    expect(mockSignInWithOauth).toHaveBeenCalledTimes(4);
    expect(mockSignInWithOauth).toHaveBeenCalledWith({
      provider: "google",
      options: { redirectTo: "http://localhost:3000/auth/callback" },
    });
    expect(mockSignInWithOauth).toHaveBeenCalledWith({
      provider: "github",
      options: { redirectTo: "http://localhost:3000/auth/callback" },
    });
    expect(mockSignInWithOauth).toHaveBeenCalledWith({
      provider: "facebook",
      options: { redirectTo: "http://localhost:3000/auth/callback" },
    });
    expect(mockSignInWithOauth).toHaveBeenCalledWith({
      provider: "discord",
      options: { redirectTo: "http://localhost:3000/auth/callback" },
    });
  });

  it("handles auth state change events", async () => {
    let authStateChangeCallback: ((event: string, session: Session | null) => void) | null = null;
    const mockOnAuthStateChange = vi.fn().mockImplementation((callback) => {
      authStateChangeCallback = callback;
      return {
        data: { subscription: { unsubscribe: vi.fn() } },
      };
    });

    const mockSupabase = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: mockOnAuthStateChange,
      },
    };
    (createClientSupabaseClient as unknown as Mock).mockReturnValue(mockSupabase);

    const TestComponent = () => {
      const { user, session } = useAuth();
      return (
        <div>
          <p>User: {user?.email ?? "null"}</p>
          <p>Session: {session ? "active" : "null"}</p>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("User: null")).toBeInTheDocument();
      expect(screen.getByText("Session: null")).toBeInTheDocument();
    });

    // Simulate auth state change
    if (authStateChangeCallback) {
      authStateChangeCallback("SIGNED_IN", mockSession);
    }

    await waitFor(() => {
      expect(screen.getByText("User: user@example.com")).toBeInTheDocument();
      expect(screen.getByText("Session: active")).toBeInTheDocument();
    });
  });

  it("handles successful authentication operations", async () => {
    const mockSignUp = vi.fn().mockResolvedValue({ error: null });
    const mockSignInWithPassword = vi.fn().mockResolvedValue({ error: null });
    const mockResetPasswordForEmail = vi.fn().mockResolvedValue({ error: null });
    const mockUpdateUser = vi.fn().mockResolvedValue({ error: null });
    
    const mockSupabase = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: { subscription: { unsubscribe: vi.fn() } },
        }),
        signUp: mockSignUp,
        signInWithPassword: mockSignInWithPassword,
        resetPasswordForEmail: mockResetPasswordForEmail,
        updateUser: mockUpdateUser,
      },
    };
    (createClientSupabaseClient as unknown as Mock).mockReturnValue(mockSupabase);

    const TestComponent = () => {
      const { signUp, signIn, resetPassword, updatePassword } = useAuth();
      const [results, setResults] = useState<string[]>([]);
      
      const handleAllOperations = async () => {
        const signUpResult = await signUp("test@example.com", "password");
        const signInResult = await signIn("test@example.com", "password");
        const resetResult = await resetPassword("test@example.com");
        const updateResult = await updatePassword("newpassword");
        
        setResults([
          signUpResult.error ? "signup-error" : "signup-success",
          signInResult.error ? "signin-error" : "signin-success",
          resetResult.error ? "reset-error" : "reset-success",
          updateResult.error ? "update-error" : "update-success",
        ]);
      };

      return (
        <div>
          <button type="button" onClick={handleAllOperations}>Test All</button>
          <p>Results: {results.join(", ")}</p>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByText("Test All"));

    await waitFor(() => {
      expect(screen.getByText("Results: signup-success, signin-success, reset-success, update-success")).toBeInTheDocument();
    });
  });
});
