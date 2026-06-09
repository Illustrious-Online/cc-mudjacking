// Submits contact-form inquiries to the Illustrious platform API
// (POST {API_BASE_URL}/inquiries). The platform creates the inquiry, verifies
// the reCAPTCHA token, and emails the organization's contact address.
//
// Config (server-side env, read per call so runtime values apply):
//   API_BASE_URL     — e.g. https://api.illustrious.cloud
//   ORGANIZATION_ID  — this site's org id (where inquiries are routed)

export interface InquiryInput {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  recaptchaToken: string;
}

export type InquiryResult =
  | { ok: true; id?: string }
  | { ok: false; status: number; message: string };

/**
 * Forward an inquiry to the platform. The reCAPTCHA token is passed through and
 * verified by the platform (single-use — we never verify it here), and the
 * selected service is folded into the comment (the platform has no service field).
 */
export async function submitInquiry(input: InquiryInput): Promise<InquiryResult> {
  const apiBaseUrl =
    process.env.API_BASE_URL || process.env.ELYSIA_API_URL || 'http://localhost:3000';
  const organizationId = process.env.ORGANIZATION_ID || '';

  if (!organizationId) {
    return { ok: false, status: 500, message: 'ORGANIZATION_ID is not configured' };
  }

  const comment = `Service requested: ${input.service}\n\n${input.message}`;

  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orgId: organizationId,
        name: input.name,
        email: input.email,
        phone: input.phone || undefined,
        comment,
        recaptchaToken: input.recaptchaToken,
      }),
    });
  } catch {
    return { ok: false, status: 503, message: 'Unable to reach the inquiry service' };
  }

  if (response.ok) {
    const data = (await response.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: data.id };
  }

  const error = (await response.json().catch(() => ({}))) as {
    message?: string;
    error?: { message?: string };
  };
  const message = error.error?.message || error.message || 'Inquiry submission failed';
  return { ok: false, status: response.status, message };
}
