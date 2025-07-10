import { render, screen, waitFor } from '@testing-library/react';
import RegisterPage from './page';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { AuthProvider } from '@/contexts/AuthContext';
import { ChakraProvider } from '@/providers/ChakraProvider';

// Mock useRouter from next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    replace: vi.fn(),
  }),
}));

// Mock Supabase client
vi.mock('@/lib/supabase/client', () => ({
  createClientSupabaseClient: () => ({
    auth: {
      getSession: vi.fn().mockResolvedValue({
        data: { session: null },
        error: null,
      }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      }),
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      signInWithOauth: vi.fn(),
      signOut: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      updateUser: vi.fn(),
    },
  }),
}));

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    pathname: '/auth/register',
    origin: 'http://localhost:3000',
  },
  writable: true,
});

vi.mock('@/components/wrapper', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="wrapper">{children}</div>
  ),
}));

vi.mock('./registration-form', () => ({
  default: () => <div data-testid="registration-form" />,
}));

const renderRegisterPage = () => {
  return render(
    <ChakraProvider>
      <AuthProvider>
        <RegisterPage />
      </AuthProvider>
    </ChakraProvider>
  );
};

describe('RegisterPage', () => {
  it('renders the heading', async () => {
    renderRegisterPage();
    await waitFor(() => {
      const heading = screen.getByRole('heading', {
        name: /register a new account/i,
      });
      expect(heading).toBeInTheDocument();
    });
  });

  it('renders the RegistrationForm component', async () => {
    renderRegisterPage();
    await waitFor(() => {
      const registrationForm = screen.getByTestId('registration-form');
      expect(registrationForm).toBeInTheDocument();
    });
  });
});
