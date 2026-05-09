import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ReCaptchaProvider from './recaptcha-provider';

// Mock the GoogleReCaptchaProvider
vi.mock('react-google-recaptcha-v3', () => ({
  GoogleReCaptchaProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="recaptcha-provider">{children}</div>
  ),
}));

describe('ReCaptchaProvider', () => {
  it('renders children when site key is available', () => {
    const originalEnv = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = 'test-site-key';

    render(
      <ReCaptchaProvider>
        <div data-testid="child">Test Child</div>
      </ReCaptchaProvider>
    );

    expect(screen.getByTestId('recaptcha-provider')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();

    // Restore original env
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = originalEnv;
  });

  it('renders children without reCAPTCHA when site key is missing', () => {
    const originalEnv = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    delete process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <ReCaptchaProvider>
        <div data-testid="child">Test Child</div>
      </ReCaptchaProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.queryByTestId('recaptcha-provider')).not.toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith(
      'reCAPTCHA site key not found. reCAPTCHA protection is disabled.'
    );

    consoleSpy.mockRestore();
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = originalEnv;
  });
});
