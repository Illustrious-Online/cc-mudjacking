import { beforeEach, describe, expect, it, vi } from 'vitest';
import { submitInquiry } from './inquiry-client';

const mockFetch = vi.fn();
global.fetch = mockFetch;

const input = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '5551234567',
  service: 'residential',
  message: 'I need mudjacking for my driveway',
  recaptchaToken: 'tok',
};

describe('submitInquiry', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.API_BASE_URL = 'https://api.test.com';
    process.env.ORGANIZATION_ID = 'org-123';
  });

  it('POSTs to /inquiries with the mapped body', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ id: 'inq-1' }) });

    const result = await submitInquiry(input);

    expect(result).toEqual({ ok: true, id: 'inq-1' });
    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe('https://api.test.com/inquiries');
    const sent = JSON.parse(init.body);
    expect(sent.orgId).toBe('org-123');
    expect(sent.name).toBe('John Doe');
    expect(sent.comment).toContain('residential');
    expect(sent.comment).toContain('driveway');
    expect(sent.recaptchaToken).toBe('tok');
  });

  it('returns the platform error status + message on a non-ok response', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ error: { message: 'reCAPTCHA verification failed' } }),
    });

    const result = await submitInquiry(input);
    expect(result).toEqual({
      ok: false,
      status: 400,
      message: 'reCAPTCHA verification failed',
    });
  });

  it('returns 503 on a network error', async () => {
    mockFetch.mockRejectedValue(new Error('network down'));
    const result = await submitInquiry(input);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.status).toBe(503);
  });

  it('returns 500 when ORGANIZATION_ID is not configured', async () => {
    process.env.ORGANIZATION_ID = '';
    const result = await submitInquiry(input);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.status).toBe(500);
    expect(mockFetch).not.toHaveBeenCalled();
  });
});
