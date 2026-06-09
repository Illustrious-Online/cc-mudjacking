import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { submitInquiry } from '../../../lib/inquiry-client';
import { POST } from './route';

// The platform does field validation + reCAPTCHA; the route just forwards.
vi.mock('../../../lib/inquiry-client', () => ({ submitInquiry: vi.fn() }));
vi.spyOn(console, 'error').mockImplementation(() => undefined);

function postRequest(body: unknown) {
  return new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST',
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

const valid = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '5551234567',
  service: 'residential',
  message: 'I need help with my sunken driveway.',
  recaptchaToken: 'valid-token',
};

describe('Contact API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('forwards a valid submission and returns 200', async () => {
    vi.mocked(submitInquiry).mockResolvedValue({ ok: true, id: 'inq-1' });

    const response = await POST(postRequest(valid));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data.id).toBe('inq-1');
    expect(submitInquiry).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'John Doe',
        email: 'john@example.com',
        service: 'residential',
        recaptchaToken: 'valid-token',
      })
    );
  });

  it('forwards a submission without a phone number', async () => {
    vi.mocked(submitInquiry).mockResolvedValue({ ok: true, id: 'inq-2' });
    const response = await POST(
      postRequest({
        name: valid.name,
        email: valid.email,
        service: valid.service,
        message: valid.message,
        recaptchaToken: valid.recaptchaToken,
      })
    );
    expect(response.status).toBe(200);
  });

  it('returns 400 (and does not forward) when fields are missing', async () => {
    const response = await POST(postRequest({ name: 'John Doe' }));
    expect(response.status).toBe(400);
    expect(submitInquiry).not.toHaveBeenCalled();
  });

  it('returns 400 (and does not forward) when the reCAPTCHA token is missing', async () => {
    const response = await POST(
      postRequest({
        name: valid.name,
        email: valid.email,
        phone: valid.phone,
        service: valid.service,
        message: valid.message,
      })
    );
    expect(response.status).toBe(400);
    expect(submitInquiry).not.toHaveBeenCalled();
  });

  it('propagates the platform error status (e.g. reCAPTCHA rejected → 400)', async () => {
    vi.mocked(submitInquiry).mockResolvedValue({
      ok: false,
      status: 400,
      message: 'reCAPTCHA verification failed',
    });
    const response = await POST(postRequest(valid));
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.message).toContain('reCAPTCHA');
  });

  it('propagates a service-unavailable status (503)', async () => {
    vi.mocked(submitInquiry).mockResolvedValue({
      ok: false,
      status: 503,
      message: 'Unable to reach the inquiry service',
    });
    const response = await POST(postRequest(valid));
    expect(response.status).toBe(503);
  });

  it('returns 500 on malformed JSON', async () => {
    const response = await POST(postRequest('not json'));
    expect(response.status).toBe(500);
  });
});
